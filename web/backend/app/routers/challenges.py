# web/backend/app/routers/challenges.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dependencies import get_db, get_optional_user
from app.models import Challenge, Result, User
from app.schemas import ChallengeListResponse, ChallengeListItem, ChallengeDetail

router = APIRouter()


@router.get("/challenges", response_model=ChallengeListResponse)
async def list_challenges(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Challenge))
    challenges = result.scalars().all()
    return ChallengeListResponse(
        challenges=[
            ChallengeListItem(id=c.id, yaml=c.yaml_content)
            for c in challenges
        ]
    )


@router.get("/challenges/{challenge_id}", response_model=ChallengeDetail)
async def get_challenge(
    challenge_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    result = await db.execute(select(Challenge).where(Challenge.id == challenge_id))
    challenge = result.scalar_one_or_none()
    if challenge is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Challenge not found")

    completed = False
    if current_user:
        res = await db.execute(
            select(Result).where(
                Result.challenge_id == challenge_id,
                Result.user_id == current_user.id,
                Result.passed == True,
            )
        )
        completed = res.scalar_one_or_none() is not None

    return ChallengeDetail(
        id=challenge.id,
        title=challenge.title,
        description=challenge.description,
        topic=challenge.topic,
        difficulty=challenge.difficulty,
        xp=challenge.xp,
        estimated_minutes=challenge.estimated_minutes,
        completed=completed,
    )