# web/backend/app/routers/users.py

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.dependencies import get_db, get_current_user
from app.models import User, LabProgress, SectionProgress
from app.schemas import MeResponse

router = APIRouter()


@router.get("/me", response_model=MeResponse)
async def get_me(
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # 1. Fetch lab progress in a single query
    lab_progress_list = (await db.execute(
        select(LabProgress).where(
            LabProgress.user_id == current_user.id,
            LabProgress.completed == True,
        )
    )).scalars().all()
    completed_labs = [p.lab_id for p in lab_progress_list]
    lab_xp_sum = sum(p.xp_awarded for p in lab_progress_list)

    # 2. Fetch section progress in a single query
    section_progress_list = (await db.execute(
        select(SectionProgress).where(
            SectionProgress.user_id == current_user.id,
            SectionProgress.completed == True,
        )
    )).scalars().all()
    completed_sections = [p.section_id for p in section_progress_list]
    sec_xp_sum = sum(p.xp_awarded for p in section_progress_list)

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

