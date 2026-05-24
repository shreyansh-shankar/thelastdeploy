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

    # Store result
    result = Result(
        user_id=current_user.id if current_user else None,
        challenge_id=body.challenge_id,
        passed=body.passed,
        output=body.output,
        signature=body.signature,
        ran_at=body.ran_at,
        queued_at=body.queued_at,
    )
    db.add(result)

    # Award XP if passed and user is authenticated
    xp_awarded = 0
    if body.passed and current_user:
        # Only award XP if not already completed
        existing = await db.execute(
            select(Result).where(
                Result.challenge_id == body.challenge_id,
                Result.user_id == current_user.id,
                Result.passed == True,
            )
        )
        already_completed = existing.scalar_one_or_none() is not None
        if not already_completed:
            current_user.xp += challenge.xp
            xp_awarded = challenge.xp

    await db.commit()

    # Always return challenge XP so agent shows correct value
    return ResultResponse(xp_awarded=xp_awarded if xp_awarded else challenge.xp)