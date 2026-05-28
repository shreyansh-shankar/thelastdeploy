# web/backend/app/routers/results.py

from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dependencies import get_db, get_optional_user
from app.models import Section, SectionProgress, User
from app.schemas import ResultRequest, ResultResponse

router = APIRouter()


@router.post("/results", response_model=ResultResponse)
async def submit_result(
    body: ResultRequest,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    # verify section exists
    result = await db.execute(
        select(Section).where(
            Section.id == body.section_id,
            Section.module_id == body.module_id,
        )
    )
    section = result.scalar_one_or_none()
    if not section:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Section not found")

    if not body.passed:
        return ResultResponse(xp_awarded=0)

    # unauthenticated — just return XP value, don't store
    if not current_user:
        return ResultResponse(xp_awarded=section.xp)

    # check if already completed
    prog_result = await db.execute(
        select(SectionProgress).where(
            SectionProgress.user_id == current_user.id,
            SectionProgress.section_id == body.section_id,
        )
    )
    existing = prog_result.scalar_one_or_none()

    if existing and existing.completed:
        return ResultResponse(xp_awarded=0)

    # first completion — award XP
    current_user.xp += section.xp
    db.add(current_user)

    if existing:
        existing.completed = True
        existing.xp_awarded = section.xp
        existing.completed_at = datetime.now(timezone.utc)
        db.add(existing)
    else:
        db.add(SectionProgress(
            user_id=current_user.id,
            module_id=body.module_id,
            section_id=body.section_id,
            completed=True,
            xp_awarded=section.xp,
            completed_at=datetime.now(timezone.utc),
        ))

    await db.commit()
    return ResultResponse(xp_awarded=section.xp)