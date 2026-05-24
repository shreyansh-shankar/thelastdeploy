# web/backend/app/routers/users.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.dependencies import get_db, get_current_user
from app.models import User, Result
from app.schemas import MeResponse, LeaderboardEntry, LeaderboardResponse

router = APIRouter()


@router.get("/me", response_model=MeResponse)
async def get_me(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    result = await db.execute(
        select(Result.challenge_id).where(
            Result.user_id == current_user.id,
            Result.passed == True,
        )
    )
    completed = [row[0] for row in result.fetchall()]

    return MeResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        xp=current_user.xp,
        streak_days=current_user.streak_days,
        completed_challenges=completed,
    )


@router.get("/leaderboard", response_model=LeaderboardResponse)
async def get_leaderboard(db: AsyncSession = Depends(get_db)):
    # Get users ordered by XP with completed challenge count
    result = await db.execute(
        select(
            User.id,
            User.username,
            User.xp,
            func.count(Result.id).label("completed"),
        )
        .outerjoin(Result, (Result.user_id == User.id) & (Result.passed == True))
        .group_by(User.id, User.username, User.xp)
        .order_by(User.xp.desc())
        .limit(50)
    )
    rows = result.fetchall()

    leaderboard = [
        LeaderboardEntry(
            rank=i + 1,
            username=row.username,
            xp=row.xp,
            completed=row.completed,
        )
        for i, row in enumerate(rows)
    ]

    return LeaderboardResponse(leaderboard=leaderboard)