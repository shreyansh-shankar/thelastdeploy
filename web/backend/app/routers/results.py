# web/backend/app/routers/results.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dependencies import get_db, get_optional_user
from app.models import Challenge, Result, User
from app.schemas import ResultRequest, ResultResponse

router = APIRouter()


@router.post("/results", response_model=ResultResponse)
async def submit_result(
    body: ResultRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    # Verify challenge exists
    ch_result = await db.execute(select(Challenge).where(Challenge.id == body.challenge_id))
    challenge = ch_result.scalar_one_or_none()
    if challenge is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found")

    # Unauthenticated — just store and return, no XP
    if not current_user:
        db.add(Result(
            user_id=None,
            challenge_id=body.challenge_id,
            passed=body.passed,
            output=body.output,
            signature=body.signature,
            ran_at=body.ran_at,
            queued_at=body.queued_at,
        ))
        await db.commit()
        return ResultResponse(xp_awarded=challenge.xp)

    # Authenticated — check if already completed
    existing = await db.execute(
        select(Result).where(
            Result.challenge_id == body.challenge_id,
            Result.user_id == current_user.id,
            Result.passed == True,
        )
    )
    already_completed = existing.scalars().first() is not None

    if already_completed:
        # Already done — don't insert, just tell agent the XP value
        return ResultResponse(xp_awarded=0)

    # First time completing — store result and award XP
    if body.passed:
        current_user.xp += challenge.xp
        db.add(current_user)

    db.add(Result(
        user_id=current_user.id,
        challenge_id=body.challenge_id,
        passed=body.passed,
        output=body.output,
        signature=body.signature,
        ran_at=body.ran_at,
        queued_at=body.queued_at,
    ))
    await db.commit()

    return ResultResponse(xp_awarded=challenge.xp if body.passed else 0)