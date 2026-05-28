# web/backend/app/routers/modules.py

from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dependencies import get_db, get_current_user, get_optional_user
from app.models import Module, Section, SectionProgress, User
from app.schemas import (
    ModuleListResponse, ModuleListItem,
    ModuleDetail, SectionSchema,
    CompleteSectionResponse,
)

router = APIRouter()


@router.get("/modules", response_model=ModuleListResponse)
async def list_modules(
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    result = await db.execute(select(Module))
    modules = result.scalars().all()

    items = []
    for m in modules:
        # load sections
        sec_result = await db.execute(
            select(Section).where(Section.module_id == m.id).order_by(Section.order)
        )
        sections = sec_result.scalars().all()
        total_xp = sum(s.xp for s in sections)
        completed_sections = 0

        if current_user:
            prog_result = await db.execute(
                select(SectionProgress).where(
                    SectionProgress.user_id == current_user.id,
                    SectionProgress.module_id == m.id,
                    SectionProgress.completed == True,
                )
            )
            completed_sections = len(prog_result.scalars().all())

        tags = [t.strip() for t in (m.tags or "").split(",") if t.strip()]

        items.append(ModuleListItem(
            id=m.id,
            title=m.title,
            description=m.description,
            topic=m.topic,
            difficulty=m.difficulty,
            estimated_minutes=m.estimated_minutes,
            tags=tags,
            total_xp=total_xp,
            total_sections=len(sections),
            completed_sections=completed_sections,
        ))

    return ModuleListResponse(modules=items)


@router.get("/modules/{module_id}", response_model=ModuleDetail)
async def get_module(
    module_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    result = await db.execute(select(Module).where(Module.id == module_id))
    module = result.scalar_one_or_none()
    if not module:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found")

    sec_result = await db.execute(
        select(Section).where(Section.module_id == module_id).order_by(Section.order)
    )
    sections = sec_result.scalars().all()

    # get user progress
    progress_map: dict[str, SectionProgress] = {}
    if current_user:
        prog_result = await db.execute(
            select(SectionProgress).where(
                SectionProgress.user_id == current_user.id,
                SectionProgress.module_id == module_id,
            )
        )
        for p in prog_result.scalars().all():
            progress_map[p.section_id] = p

    section_schemas = []
    for s in sections:
        prog = progress_map.get(s.id)
        section_schemas.append(SectionSchema(
            id=s.id,
            title=s.title,
            type=s.type,
            order=s.order,
            xp=s.xp,
            content=s.content,
            completed=prog.completed if prog else False,
            xp_awarded=prog.xp_awarded if prog else 0,
        ))

    tags = [t.strip() for t in (module.tags or "").split(",") if t.strip()]
    total_xp = sum(s.xp for s in sections)

    return ModuleDetail(
        id=module.id,
        title=module.title,
        description=module.description,
        topic=module.topic,
        difficulty=module.difficulty,
        estimated_minutes=module.estimated_minutes,
        tags=tags,
        total_xp=total_xp,
        sections=section_schemas,
    )


@router.post("/modules/{module_id}/sections/{section_id}/complete",
             response_model=CompleteSectionResponse)
async def complete_section(
    module_id: str,
    section_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    # verify section exists and belongs to module
    result = await db.execute(
        select(Section).where(
            Section.id == section_id,
            Section.module_id == module_id,
        )
    )
    section = result.scalar_one_or_none()
    if not section:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Section not found")

    if section.type != "reading":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Practical sections are completed via orbstack check",
        )

    # check if already completed
    prog_result = await db.execute(
        select(SectionProgress).where(
            SectionProgress.user_id == current_user.id,
            SectionProgress.section_id == section_id,
        )
    )
    existing = prog_result.scalar_one_or_none()

    if existing and existing.completed:
        return CompleteSectionResponse(xp_awarded=0, total_xp=current_user.xp)

    xp_awarded = section.xp
    current_user.xp += xp_awarded
    db.add(current_user)

    if existing:
        existing.completed = True
        existing.xp_awarded = xp_awarded
        existing.completed_at = datetime.now(timezone.utc)
        db.add(existing)
    else:
        db.add(SectionProgress(
            user_id=current_user.id,
            module_id=module_id,
            section_id=section_id,
            completed=True,
            xp_awarded=xp_awarded,
            completed_at=datetime.now(timezone.utc),
        ))

    await db.commit()
    return CompleteSectionResponse(xp_awarded=xp_awarded, total_xp=current_user.xp)