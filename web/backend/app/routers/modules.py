# web/backend/app/routers/modules.py

from datetime import datetime, timezone
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.dependencies import get_db, get_current_user, get_optional_user
from app.models import Lab, LabProgress, Module, Section, SectionProgress, User
from app.schemas import (
    CompleteSectionResponse,
    LabDetail, LabSchema,
    ModuleListResponse, ModuleListItem,
    ModuleDetail, ModuleSummary,
    SectionSchema,
)

router = APIRouter()


def _total_xp(sections: list[Section], labs: list[Lab]) -> int:
    """Total XP = sum of all section.xp (reading) + sum of all lab.xp."""
    return sum(s.xp for s in sections) + sum(l.xp for l in labs)


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

        lab_result = await db.execute(select(Lab).where(Lab.module_id == m.id))
        labs = lab_result.scalars().all()

        completed_sections = 0
        if current_user:
            sec_prog_result = await db.execute(
                select(SectionProgress.section_id).where(
                    SectionProgress.user_id == current_user.id,
                    SectionProgress.module_id == m.id,
                    SectionProgress.completed == True,
                )
            )
            completed_section_ids = {row[0] for row in sec_prog_result.fetchall()}

            for section in sections:
                if section.id in completed_section_ids:
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
            total_xp=_total_xp(sections, labs),
            total_sections=len(sections),
            completed_sections=completed_sections,
        ))

    return ModuleListResponse(modules=items)


# ---------------------------------------------------------------------------
# GET /modules/:id/full — sections + labs + progress (frontend)
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

    lab_result = await db.execute(
        select(Lab).where(Lab.module_id == module_id).order_by(Lab.order)
    )
    all_labs = lab_result.scalars().all()
    labs_by_section: dict[str, list[Lab]] = {}
    for lab in all_labs:
        labs_by_section.setdefault(lab.section_id, []).append(lab)

    lab_progress_map: dict[str, LabProgress] = {}
    completed_section_ids: set[str] = set()

    if current_user:
        lp_result = await db.execute(
            select(LabProgress).where(
                LabProgress.user_id == current_user.id,
                LabProgress.module_id == module_id,
            )
        )
        for p in lp_result.scalars().all():
            lab_progress_map[p.lab_id] = p

        sp_result = await db.execute(
            select(SectionProgress.section_id).where(
                SectionProgress.user_id == current_user.id,
                SectionProgress.module_id == module_id,
                SectionProgress.completed == True,
            )
        )
        completed_section_ids = {row[0] for row in sp_result.fetchall()}

    section_schemas = []
    for s in sections:
        section_labs = labs_by_section.get(s.id, [])
        lab_schemas = [
            LabSchema(
                id=lab.id,
                title=lab.title,
                order=lab.order,
                xp=lab.xp,
                estimated_minutes=lab.estimated_minutes,
                setup_type=lab.setup_type,
                seed_commands=lab.seed_commands,
                resource_limits_cpu=lab.resource_limits_cpu,
                resource_limits_mem=lab.resource_limits_mem,
                completed=lab_progress_map[lab.id].completed if lab.id in lab_progress_map else False,
                xp_awarded=lab_progress_map[lab.id].xp_awarded if lab.id in lab_progress_map else 0,
            )
            for lab in section_labs
        ]
        section_schemas.append(SectionSchema(
            id=s.id,
            title=s.title,
            order=s.order,
            xp=s.xp,
            content=s.content,
            labs=lab_schemas,
            section_completed=s.id in completed_section_ids,
        ))

    return ModuleDetail(
        id=module.id,
        title=module.title,
        description=module.description,
        topic=module.topic,
        difficulty=module.difficulty,
        estimated_minutes=module.estimated_minutes,
        tags=[t.strip() for t in (module.tags or "").split(",") if t.strip()],
        total_xp=_total_xp(sections, all_labs),
        total_sections=len(sections),
        sections=section_schemas,
    )


# ---------------------------------------------------------------------------
# GET /modules/:id — lightweight summary (tld sync -m)
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

    sec_result = await db.execute(select(Section).where(Section.module_id == module_id))
    sections = sec_result.scalars().all()
    lab_result = await db.execute(select(Lab).where(Lab.module_id == module_id))
    labs = lab_result.scalars().all()

    return ModuleSummary(
        id=module.id,
        title=module.title,
        description=module.description,
        topic=module.topic,
        difficulty=module.difficulty,
        estimated_minutes=module.estimated_minutes,
        tags=[t.strip() for t in (module.tags or "").split(",") if t.strip()],
        total_xp=_total_xp(sections, labs),
        total_sections=len(sections),
    )


# ---------------------------------------------------------------------------
# POST /modules/:id/sections/:id/complete — reading sections
# ---------------------------------------------------------------------------

@router.post(
    "/modules/{module_id}/sections/{section_id}/complete",
    response_model=CompleteSectionResponse,
)
async def complete_reading_section(
    module_id: str,
    section_id: str,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sec_result = await db.execute(
        select(Section).where(
            Section.id == section_id,
            Section.module_id == module_id,
        )
    )
    section = sec_result.scalar_one_or_none()
    if not section:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Section not found")

    # For lab sections — verify all labs are actually completed before awarding
    lab_check = await db.execute(select(Lab).where(Lab.section_id == section_id))
    labs = lab_check.scalars().all()
    if labs:
        # Check all labs are completed for this user
        completed_labs = await db.execute(
            select(LabProgress.lab_id).where(
                LabProgress.user_id == current_user.id,
                LabProgress.section_id == section_id,
                LabProgress.completed == True,
            )
        )
        completed_lab_ids = {row[0] for row in completed_labs.fetchall()}
        all_lab_ids = {l.id for l in labs}
        if not all_lab_ids.issubset(completed_lab_ids):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Complete all labs in this section first",
            )

    prog_result = await db.execute(
        select(SectionProgress).where(
            SectionProgress.user_id == current_user.id,
            SectionProgress.section_id == section_id,
        )
    )
    existing = prog_result.scalar_one_or_none()

    if existing and existing.completed:
        return CompleteSectionResponse(xp_awarded=0, total_xp=current_user.xp)

    xp = section.xp  # reading XP from section.yaml (labs XP already awarded separately)

    if existing:
        existing.completed = True
        existing.xp_awarded = xp
        existing.completed_at = datetime.now(timezone.utc)
        db.add(existing)
    else:
        db.add(SectionProgress(
            user_id=current_user.id,
            module_id=module_id,
            section_id=section_id,
            completed=True,
            xp_awarded=xp,
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
    return CompleteSectionResponse(xp_awarded=xp, total_xp=current_user.xp)


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