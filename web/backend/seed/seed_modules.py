# web/backend/seed/seed_modules.py

import asyncio
import os
import sys
import yaml

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from sqlalchemy import select
from app.database import AsyncSessionLocal
from app.models import Module, Section

CHALLENGES_DIR = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "..", "..", "challenges")
)


async def seed():
    async with AsyncSessionLocal() as db:
        for module_dir in sorted(os.listdir(CHALLENGES_DIR)):
            module_path = os.path.join(CHALLENGES_DIR, module_dir)
            module_yaml_path = os.path.join(module_path, "module.yaml")

            if not os.path.isdir(module_path) or not os.path.exists(module_yaml_path):
                continue

            with open(module_yaml_path) as f:
                raw_yaml = f.read()
                module_data = yaml.safe_load(raw_yaml)

            module_id = module_data["id"]

            # upsert module
            result = await db.execute(select(Module).where(Module.id == module_id))
            existing_module = result.scalar_one_or_none()

            tags = ",".join(module_data.get("tags", []))

            if existing_module:
                existing_module.title = module_data["title"]
                existing_module.description = module_data.get("description")
                existing_module.topic = module_data.get("topic")
                existing_module.difficulty = module_data.get("difficulty")
                existing_module.estimated_minutes = module_data.get("estimated_minutes")
                existing_module.tags = tags
                existing_module.yaml_content = raw_yaml
                db.add(existing_module)
                print(f"  ↻ Updated module: {module_id}")
            else:
                db.add(Module(
                    id=module_id,
                    title=module_data["title"],
                    description=module_data.get("description"),
                    topic=module_data.get("topic"),
                    difficulty=module_data.get("difficulty"),
                    estimated_minutes=module_data.get("estimated_minutes"),
                    tags=tags,
                    yaml_content=raw_yaml,
                ))
                print(f"  ✅ Seeded module: {module_id}")

            # seed sections
            sections_dir = os.path.join(module_path, "sections")
            if not os.path.isdir(sections_dir):
                continue

            for section_dir in sorted(os.listdir(sections_dir)):
                section_path = os.path.join(sections_dir, section_dir)
                section_yaml_path = os.path.join(section_path, "section.yaml")
                content_path = os.path.join(section_path, "content.md")

                if not os.path.isdir(section_path) or not os.path.exists(section_yaml_path):
                    continue

                with open(section_yaml_path) as f:
                    section_data = yaml.safe_load(f)

                content = None
                if os.path.exists(content_path):
                    with open(content_path) as f:
                        content = f.read()

                section_id = section_data["id"]

                result = await db.execute(select(Section).where(Section.id == section_id))
                existing_section = result.scalar_one_or_none()

                if existing_section:
                    existing_section.title = section_data["title"]
                    existing_section.type = section_data["type"]
                    existing_section.order = section_data["order"]
                    existing_section.xp = section_data.get("xp", 0)
                    existing_section.content = content
                    db.add(existing_section)
                    print(f"    ↻ Updated section: {section_id}")
                else:
                    db.add(Section(
                        id=section_id,
                        module_id=module_id,
                        title=section_data["title"],
                        type=section_data["type"],
                        order=section_data["order"],
                        xp=section_data.get("xp", 0),
                        content=content,
                    ))
                    print(f"    ✅ Seeded section: {section_id}")

        await db.commit()
        print("\nDone.")


if __name__ == "__main__":
    asyncio.run(seed())