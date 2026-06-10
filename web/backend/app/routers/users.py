# web/backend/app/routers/users.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.dependencies import get_db, get_current_user
from app.models import User, LabProgress, SectionProgress
from app.schemas import MeResponse, LeaderboardEntry, LeaderboardResponse

router = APIRouter()


@router.get("/me", response_model=MeResponse)
async def get_me(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # Completed labs (from tld check)
    lab_result = await db.execute(
        select(LabProgress.lab_id).where(
            LabProgress.user_id == current_user.id,
            LabProgress.completed == True,
        )
    )
    completed_labs = [row[0] for row in lab_result.fetchall()]

    # Completed sections (reading scroll / future: questions)
    sec_result = await db.execute(
        select(SectionProgress.section_id).where(
            SectionProgress.user_id == current_user.id,
            SectionProgress.completed == True,
        )
    )
    completed_sections = [row[0] for row in sec_result.fetchall()]

    # Recalculate and heal XP drift
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
    actual_xp = lab_xp_sum + sec_xp_sum

    if current_user.xp != actual_xp:
        current_user.xp = actual_xp
        db.add(current_user)
        await db.commit()

    return MeResponse(
        id=current_user.id,
        username=current_user.username,
        email=current_user.email,
        xp=current_user.xp,
        streak_days=current_user.streak_days,
        completed_labs=completed_labs,
        completed_sections=completed_sections,
    )


@router.get("/leaderboard", response_model=LeaderboardResponse)
async def get_leaderboard(db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(
            User.id,
            User.username,
            User.xp,
            func.count(LabProgress.id).label("completed"),
        )
        .outerjoin(
            LabProgress,
            (LabProgress.user_id == User.id) & (LabProgress.completed == True)
        )
        .group_by(User.id, User.username, User.xp)
        .order_by(User.xp.desc())
        .limit(50)
    )
    rows = result.fetchall()

    return LeaderboardResponse(leaderboard=[
        LeaderboardEntry(rank=i + 1, username=row.username, xp=row.xp, completed=row.completed)
        for i, row in enumerate(rows)
    ])