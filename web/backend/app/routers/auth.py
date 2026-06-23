# web/backend/app/routers/auth.py

import secrets
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, Depends, HTTPException, status, BackgroundTasks
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dependencies import get_db
from app.models import User
from app.auth import hash_password, verify_password, create_access_token
from app.schemas import (
    RegisterRequest,
    LoginRequest,
    TokenResponse,
    VerifyEmailRequest,
    ForgotPasswordRequest,
    ResetPasswordRequest,
    ResendVerificationRequest,
    MessageResponse,
)
from app.email import send_verification_email, send_reset_password_email

router = APIRouter()


def _ensure_device_key(user: User) -> str:
    """Generate and assign a device_key if the user doesn't have one yet."""
    if not user.device_key:
        user.device_key = secrets.token_hex(32)  # 64 char hex
    return user.device_key


@router.post("/register", response_model=MessageResponse, status_code=status.HTTP_201_CREATED)
async def register(
    body: RegisterRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(
        select(User).where((User.email == body.email) | (User.username == body.username))
    )
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email or username already registered",
        )

    verification_token = secrets.token_urlsafe(32)
    user = User(
        email=body.email,
        username=body.username,
        password_hash=hash_password(body.password),
        device_key=secrets.token_hex(32),  # assign at registration
        is_verified=False,
        verification_token=verification_token,
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    send_verification_email(user.email, verification_token, background_tasks)

    return MessageResponse(detail="Verification email sent. Please check your inbox.")


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == body.email))
    user = result.scalar_one_or_none()

    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    if not user.is_verified:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Please verify your email address before logging in.",
        )

    # Ensure device_key exists (handles existing users who registered before this change)
    _ensure_device_key(user)
    db.add(user)
    await db.commit()

    token = create_access_token(user.id)
    return TokenResponse(access_token=token, device_key=user.device_key)


@router.post("/verify-email", response_model=MessageResponse)
async def verify_email(body: VerifyEmailRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.verification_token == body.token))
    user = result.scalar_one_or_none()

    if not user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired verification token.",
        )

    user.is_verified = True
    user.verification_token = None
    db.add(user)
    await db.commit()

    return MessageResponse(detail="Email verified successfully. You can now log in.")


@router.post("/forgot-password", response_model=MessageResponse)
async def forgot_password(
    body: ForgotPasswordRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.email == body.email))
    user = result.scalar_one_or_none()

    if user:
        reset_token = secrets.token_urlsafe(32)
        user.reset_token = reset_token
        # Store UTC-aware time for database
        user.reset_token_expires_at = datetime.now(timezone.utc) + timedelta(minutes=15)
        db.add(user)
        await db.commit()

        send_reset_password_email(user.email, reset_token, background_tasks)

    # Return standard response to avoid user enumeration
    return MessageResponse(
        detail="If the email is registered, a password reset link has been sent."
    )


@router.post("/reset-password", response_model=MessageResponse)
async def reset_password(body: ResetPasswordRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.reset_token == body.token))
    user = result.scalar_one_or_none()

    if not user or not user.reset_token_expires_at:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token.",
        )

    expires_at = user.reset_token_expires_at
    if expires_at.tzinfo is None:
        expires_at = expires_at.replace(tzinfo=timezone.utc)

    now_compare = datetime.now(timezone.utc)

    if expires_at < now_compare:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Password reset token has expired.",
        )

    user.password_hash = hash_password(body.password)
    user.reset_token = None
    user.reset_token_expires_at = None
    db.add(user)
    await db.commit()

    return MessageResponse(detail="Password has been reset successfully. You can now log in.")


@router.post("/resend-verification", response_model=MessageResponse)
async def resend_verification(
    body: ResendVerificationRequest,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(User).where(User.email == body.email))
    user = result.scalar_one_or_none()

    if not user:
        return MessageResponse(detail="Verification email sent if user is not already verified.")

    if user.is_verified:
        return MessageResponse(detail="This account is already verified.")

    verification_token = secrets.token_urlsafe(32)
    user.verification_token = verification_token
    db.add(user)
    await db.commit()

    send_verification_email(user.email, verification_token, background_tasks)

    return MessageResponse(detail="Verification email sent. Please check your inbox.")