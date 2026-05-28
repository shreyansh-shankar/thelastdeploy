# web/backend/seed/seed.py

import asyncio
import sys
import os
import yaml

sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))

from sqlalchemy import select
from app.database import AsyncSessionLocal
from app.models import Challenge


async def seed():
    # Load the challenge YAML from the challenges folder in project root
    yaml_path = os.path.join(
        os.path.dirname(__file__), "..", "..", "..", "challenges", "docker-hello", "challenge.yaml"
    )
    yaml_path = os.path.abspath(yaml_path)

    with open(yaml_path, "r") as f:
        raw_yaml = f.read()
        data = yaml.safe_load(raw_yaml)

    async with AsyncSessionLocal() as db:
        # Check if already seeded
        result = await db.execute(select(Challenge).where(Challenge.id == data["id"]))
        existing = result.scalar_one_or_none()

        if existing:
            print(f"Challenge '{data['id']}' already exists, skipping.")
            return

        challenge = Challenge(
            id=data["id"],
            title=data["title"],
            description=data.get("description"),
            topic=data.get("topic"),
            difficulty=data.get("difficulty"),
            xp=data.get("xp", 0),
            estimated_minutes=data.get("estimated_minutes"),
            yaml_content=raw_yaml,
        )
        db.add(challenge)
        await db.commit()
        print(f"✅ Seeded challenge: {data['id']} — {data['title']}")


if __name__ == "__main__":
    asyncio.run(seed())