# web/backend/alembic/versions/007_section_xp.py
"""
007_section_xp: add xp column to sections table.
Reading sections now have their own XP defined in section.yaml.

Revision ID: 007
Revises: 006
"""

from alembic import op
import sqlalchemy as sa

revision = "007"
down_revision = "006"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "sections",
        sa.Column("xp", sa.Integer, nullable=False, server_default="10"),
    )


def downgrade():
    op.drop_column("sections", "xp")