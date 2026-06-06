# web/backend/app/routers/auth.py

import secrets
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dependencies import get_db
from app.models import User
from app.auth import hash_password, verify_password, create_access_token
from app.schemas import RegisterRequest, LoginRequest, TokenResponse

router = APIRouter()


def _ensure_device_key(user: User) -> str:
    """Generate and assign a device_key if the user doesn't have one yet."""
    if not user.device_key:
        user.device_key = secrets.token_hex(32)  # 64 char hex
    return user.device_key


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
async def register(body: RegisterRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(User).where((User.email == body.email) | (User.username == body.username))
    )
    existing = result.scalar_one_or_none()
    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Email or username already registered",
        )

    user = User(
        email=body.email,
        username=body.username,
        password_hash=hash_password(body.password),
        device_key=secrets.token_hex(32),  # assign at registration
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)

    token = create_access_token(user.id)
    return TokenResponse(access_token=token, device_key=user.device_key)


@router.post("/login", response_model=TokenResponse)
async def login(body: LoginRequest, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(User).where(User.email == body.email))
    user = result.scalar_one_or_none()

    if user is None or not verify_password(body.password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password",
        )

    # Ensure device_key exists (handles existing users who registered before this change)
    _ensure_device_key(user)
    db.add(user)
    await db.commit()

    token = create_access_token(user.id)
    return TokenResponse(access_token=token, device_key=user.device_key)