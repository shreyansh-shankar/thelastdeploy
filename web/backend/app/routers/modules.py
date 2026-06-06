# web/backend/app/routers/modules.py

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.dependencies import get_db, get_optional_user
from app.models import Lab, LabProgress, Module, Section, User
from app.schemas import (
    LabDetail, LabSchema,
    ModuleListResponse, ModuleListItem,
    ModuleDetail, ModuleSummary,
    SectionSchema,
)

router = APIRouter()


# ---------------------------------------------------------------------------
# GET /modules
# ---------------------------------------------------------------------------

@router.get("/modules", response_model=ModuleListResponse)
async def list_modules(
    db: AsyncSession = Depends(get_db),
    current_user: User | None = Depends(get_optional_user),
):
    result = await db.execute(select(Module))
    modules = result.scalars().all()

    items = []
    for m in modules:
        sec_result = await db.execute(
            select(Section).where(Section.module_id == m.id).order_by(Section.order)
        )
        sections = sec_result.scalars().all()

        # total XP = sum of all labs in this module
        lab_result = await db.execute(
            select(Lab).where(Lab.module_id == m.id)
        )
        labs = lab_result.scalars().all()
        total_xp = sum(lab.xp for lab in labs)

        completed_sections = 0
        if current_user:
            # A section is "completed" when all its labs are completed
            for section in sections:
                section_labs = [l for l in labs if l.section_id == section.id]
                if not section_labs:
                    continue
                prog_result = await db.execute(
                    select(LabProgress).where(
                        LabProgress.user_id == current_user.id,
                        LabProgress.section_id == section.id,
                        LabProgress.completed == True,
                    )
                )
                completed_lab_ids = {p.lab_id for p in prog_result.scalars().all()}
                section_lab_ids = {l.id for l in section_labs}
                if section_lab_ids.issubset(completed_lab_ids):
                    completed_sections += 1

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


# ---------------------------------------------------------------------------
# GET /modules/:id — lightweight summary for tld sync -m
# ---------------------------------------------------------------------------

@router.get("/modules/{module_id}", response_model=ModuleSummary)
async def get_module_summary(
    module_id: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Module).where(Module.id == module_id))
    module = result.scalar_one_or_none()
    if not module:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Module not found")

    sec_result = await db.execute(
        select(Section).where(Section.module_id == module_id)
    )
    sections = sec_result.scalars().all()

    lab_result = await db.execute(
        select(Lab).where(Lab.module_id == module_id)
    )
    labs = lab_result.scalars().all()
    total_xp = sum(l.xp for l in labs)

    tags = [t.strip() for t in (module.tags or "").split(",") if t.strip()]

    return ModuleSummary(
        id=module.id,
        title=module.title,
        description=module.description,
        topic=module.topic,
        difficulty=module.difficulty,
        estimated_minutes=module.estimated_minutes,
        tags=tags,
        total_xp=total_xp,
        total_sections=len(sections),
    )


# ---------------------------------------------------------------------------
# GET /modules/:id/full — full detail with sections + labs (for frontend)
# ---------------------------------------------------------------------------

@router.get("/modules/{module_id}/full", response_model=ModuleDetail)
async def get_module_full(
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

    # Fetch all labs for this module at once
    lab_result = await db.execute(
        select(Lab).where(Lab.module_id == module_id).order_by(Lab.order)
    )
    all_labs = lab_result.scalars().all()
    labs_by_section: dict[str, list[Lab]] = {}
    for lab in all_labs:
        labs_by_section.setdefault(lab.section_id, []).append(lab)

    # Fetch user progress map
    progress_map: dict[str, LabProgress] = {}
    if current_user:
        prog_result = await db.execute(
            select(LabProgress).where(
                LabProgress.user_id == current_user.id,
                LabProgress.module_id == module_id,
            )
        )
        for p in prog_result.scalars().all():
            progress_map[p.lab_id] = p

    section_schemas = []
    for s in sections:
        section_labs = labs_by_section.get(s.id, [])
        lab_schemas = []
        for lab in section_labs:
            prog = progress_map.get(lab.id)
            lab_schemas.append(LabSchema(
                id=lab.id,
                title=lab.title,
                order=lab.order,
                xp=lab.xp,
                estimated_minutes=lab.estimated_minutes,
                setup_type=lab.setup_type,
                seed_commands=lab.seed_commands,
                resource_limits_cpu=lab.resource_limits_cpu,
                resource_limits_mem=lab.resource_limits_mem,
                completed=prog.completed if prog else False,
                xp_awarded=prog.xp_awarded if prog else 0,
            ))
        section_schemas.append(SectionSchema(
            id=s.id,
            title=s.title,
            order=s.order,
            content=s.content,
            labs=lab_schemas,
        ))

    tags = [t.strip() for t in (module.tags or "").split(",") if t.strip()]
    total_xp = sum(lab.xp for lab in all_labs)

    return ModuleDetail(
        id=module.id,
        title=module.title,
        description=module.description,
        topic=module.topic,
        difficulty=module.difficulty,
        estimated_minutes=module.estimated_minutes,
        tags=tags,
        total_xp=total_xp,
        total_sections=len(sections),
        sections=section_schemas,
    )


# ---------------------------------------------------------------------------
# GET /labs/:id — for tld sync -l
# ---------------------------------------------------------------------------

@router.get("/labs/{lab_id}", response_model=LabDetail)
async def get_lab(
    lab_id: str,
    db: AsyncSession = Depends(get_db),
):
    result = await db.execute(select(Lab).where(Lab.id == lab_id))
    lab = result.scalar_one_or_none()
    if not lab:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lab not found")

    return LabDetail(
        id=lab.id,
        module_id=lab.module_id,
        section_id=lab.section_id,
        data=LabSchema(
            id=lab.id,
            title=lab.title,
            order=lab.order,
            xp=lab.xp,
            estimated_minutes=lab.estimated_minutes,
            setup_type=lab.setup_type,
            seed_commands=lab.seed_commands,
            resource_limits_cpu=lab.resource_limits_cpu,
            resource_limits_mem=lab.resource_limits_mem,
        ),
    )