# web/backend/app/routers/results.py

import hashlib
import hmac
import logging
from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.dependencies import get_db, get_optional_user
from app.models import Lab, LabProgress, User, SectionProgress
from app.schemas import ResultRequest, ResultResponse

router = APIRouter()
logger = logging.getLogger(__name__)


def _verify_signature(body: ResultRequest, device_key: str) -> bool:
    """
    Verify HMAC-SHA256 signature using the user's per-device key.
    Payload format: lab_id:section_id:passed:output:timestamp (RFC3339 UTC)
    """
    if not body.signature or not body.ran_at:
        return False

    timestamp = body.ran_at.astimezone(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    passed_str = "true" if body.passed else "false"
    output_str = body.output or ""

    payload = f"{body.lab_id}:{body.section_id}:{passed_str}:{output_str}:{timestamp}"

    expected = hmac.new(
        device_key.encode(),
        payload.encode(),
        hashlib.sha256,
    ).hexdigest()

    return hmac.compare_digest(expected, body.signature)


@router.post("/results", response_model=ResultResponse)
async def submit_result(
    body: ResultRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    # 1. Signature verification — requires authenticated user with device_key
    if body.signature:
        if not current_user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Authentication required to submit signed results",
            )
        if not current_user.device_key:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="No device key found — please log in again with tld login",
            )
        if not _verify_signature(body, current_user.device_key):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid signature",
            )

    # 2. Look up lab by globally unique lab_id
    result = await db.execute(
        select(Lab).where(Lab.id == body.lab_id)
    )
    lab = result.scalar_one_or_none()
    if not lab:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lab not found")

    # 3. If not passed, return early — no XP
    if not body.passed:
        return ResultResponse(xp_awarded=0)

    # 4. Unauthenticated — return XP value but don't persist
    if not current_user:
        return ResultResponse(xp_awarded=lab.xp)

    # 5. Check if already completed
    prog_result = await db.execute(
        select(LabProgress).where(
            LabProgress.user_id == current_user.id,
            LabProgress.lab_id == body.lab_id,
        )
    )
    existing = prog_result.scalar_one_or_none()

    if existing and existing.completed:
        return ResultResponse(xp_awarded=0)

    # 6. First completion — award XP
    if existing:
        existing.completed = True
        existing.xp_awarded = lab.xp
        existing.completed_at = datetime.now(timezone.utc)
        db.add(existing)
    else:
        db.add(LabProgress(
            user_id=current_user.id,
            lab_id=body.lab_id,
            section_id=lab.section_id,
            module_id=lab.module_id,
            completed=True,
            xp_awarded=lab.xp,
            completed_at=datetime.now(timezone.utc),
        ))

    await db.flush()

    # Recalculate true total XP by summing database entries to prevent and heal drift
    lab_xp_sum = await db.scalar(
        select(func.sum(LabProgress.xp_awarded)).where(
            LabProgress.user_id == current_user.id,
            LabProgress.completed == True
        )
    ) or 0
    sec_xp_sum = await db.scalar(
        select(func.sum(SectionProgress.xp_awarded)).where(
            SectionProgress.user_id == current_user.id,
            SectionProgress.completed == True
        )
    ) or 0
    current_user.xp = lab_xp_sum + sec_xp_sum
    db.add(current_user)

    await db.commit()
    logger.info("Lab completed: user=%s lab=%s xp=%d", current_user.id, body.lab_id, lab.xp)
    return ResultResponse(xp_awarded=lab.xp)