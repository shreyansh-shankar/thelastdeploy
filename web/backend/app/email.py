# web/backend/app/email.py

import logging
import httpx
from fastapi import BackgroundTasks
from app.config import settings

logger = logging.getLogger("app.email")

async def send_email_via_resend(to_email: str, subject: str, html_content: str):
    """Sends an email using the Resend API."""
    if not settings.RESEND_API_KEY:
        logger.warning(
            f"RESEND_API_KEY is not set. Cannot send email to {to_email}. "
            f"Subject: {subject}"
        )
        return

    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {settings.RESEND_API_KEY}",
        "Content-Type": "application/json",
    }
    payload = {
        "from": settings.MAIL_FROM,
        "to": [to_email],
        "subject": subject,
        "html": html_content,
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(url, headers=headers, json=payload, timeout=10.0)
            if response.status_code not in (200, 201):
                logger.error(
                    f"Failed to send email to {to_email} via Resend. "
                    f"Status code: {response.status_code}, Response: {response.text}"
                )
            else:
                logger.info(f"Successfully sent email to {to_email} via Resend.")
    except Exception as e:
        logger.error(f"Error calling Resend API to send email to {to_email}: {e}")


def _log_email_to_console(to_email: str, subject: str, html_content: str):
    """Logs the email to console for development testing."""
    border = "=" * 80
    print(border)
    print(f"[{settings.ENVIRONMENT.upper()} EMAIL DEV-LOG]")
    print(f"From:    {settings.MAIL_FROM}")
    print(f"To:      {to_email}")
    print(f"Subject: {subject}")
    print("-" * 80)
    print(html_content)
    print(border)


def send_verification_email(email: str, token: str, background_tasks: BackgroundTasks):
    """Sends a verification email to the user (via background task)."""
    verify_url = f"{settings.FRONTEND_URL}/verify-email?token={token}"
    subject = "Verify Your DevLab Account"
    html_content = (
        f"<h2>Welcome to DevLab!</h2>"
        f"<p>Please verify your email address by clicking the link below:</p>"
        f"<p><a href='{verify_url}' style='display:inline-block;background-color:#10B981;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;font-weight:bold;'>Verify Email</a></p>"
        f"<p>If the button doesn't work, copy and paste this link into your browser:</p>"
        f"<p>{verify_url}</p>"
        f"<br/>"
        f"<p>Happy learning,</p>"
        f"<p>The DevLab Team</p>"
    )

    if settings.ENVIRONMENT == "development":
        _log_email_to_console(email, subject, html_content)
        
    if settings.RESEND_API_KEY:
        background_tasks.add_task(send_email_via_resend, email, subject, html_content)


def send_reset_password_email(email: str, token: str, background_tasks: BackgroundTasks):
    """Sends a password reset email to the user (via background task)."""
    reset_url = f"{settings.FRONTEND_URL}/reset-password?token={token}"
    subject = "Reset Your DevLab Password"
    html_content = (
        f"<h2>Password Reset Request</h2>"
        f"<p>You requested a password reset. Click the link below to set a new password:</p>"
        f"<p><a href='{reset_url}' style='display:inline-block;background-color:#10B981;color:white;padding:10px 20px;text-decoration:none;border-radius:6px;font-weight:bold;'>Reset Password</a></p>"
        f"<p>This link will expire in 15 minutes.</p>"
        f"<p>If you did not request this, you can ignore this email.</p>"
        f"<p>If the button doesn't work, copy and paste this link into your browser:</p>"
        f"<p>{reset_url}</p>"
        f"<br/>"
        f"<p>The DevLab Team</p>"
    )

    if settings.ENVIRONMENT == "development":
        _log_email_to_console(email, subject, html_content)

    if settings.RESEND_API_KEY:
        background_tasks.add_task(send_email_via_resend, email, subject, html_content)
