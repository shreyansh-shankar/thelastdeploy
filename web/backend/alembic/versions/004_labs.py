# web/backend/alembic/versions/004_labs.py
"""
004_labs: introduce labs table, lab_progress table.
Replaces section_progress (which tracked xp at section level).
Drops type/xp columns from sections (labs now own these).

Revision ID: 004
Revises: 003
"""

from alembic import op
import sqlalchemy as sa

revision = "004"
down_revision = "003"
branch_labels = None
depends_on = None


def upgrade():
    # ------------------------------------------------------------------
    # 1. Remove type and xp columns from sections
    #    (labs own xp now; type was reading|practical — no longer needed)
    # ------------------------------------------------------------------
    with op.batch_alter_table("sections") as batch_op:
        batch_op.drop_column("type")
        batch_op.drop_column("xp")

    # ------------------------------------------------------------------
    # 2. Create labs table
    # ------------------------------------------------------------------
    op.create_table(
        "labs",
        sa.Column("id", sa.String(100), primary_key=True),       # globally unique
        sa.Column("module_id", sa.String(100), sa.ForeignKey("modules.id"), nullable=False),
        sa.Column("section_id", sa.String(100), sa.ForeignKey("sections.id"), nullable=False),
        sa.Column("title", sa.String(255), nullable=False),
        sa.Column("order", sa.Integer, nullable=False, server_default="0"),
        sa.Column("xp", sa.Integer, nullable=False, server_default="0"),
        sa.Column("estimated_minutes", sa.Integer, nullable=True),
        sa.Column("setup_type", sa.String(50), nullable=True),
        sa.Column("seed_commands", sa.Text, nullable=True),       # JSON array as text
        sa.Column("resource_limits_cpu", sa.Integer, nullable=True),
        sa.Column("resource_limits_mem", sa.Integer, nullable=True),
        sa.Column("yaml_content", sa.Text, nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
        ),
    )

    # ------------------------------------------------------------------
    # 3. Create lab_progress table (replaces section_progress)
    # ------------------------------------------------------------------
    op.create_table(
        "lab_progress",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("lab_id", sa.String(100), sa.ForeignKey("labs.id"), nullable=False),
        sa.Column("section_id", sa.String(100), sa.ForeignKey("sections.id"), nullable=False),
        sa.Column("module_id", sa.String(100), sa.ForeignKey("modules.id"), nullable=False),
        sa.Column("completed", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("xp_awarded", sa.Integer, nullable=False, server_default="0"),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
        ),
    )

    # Index for fast user progress lookups
    op.create_index("ix_lab_progress_user_lab", "lab_progress", ["user_id", "lab_id"])
    op.create_index("ix_lab_progress_user_module", "lab_progress", ["user_id", "module_id"])

    # ------------------------------------------------------------------
    # 4. Drop old section_progress table
    #    (data migration not needed — dev/staging only; prod: migrate first)
    # ------------------------------------------------------------------
    op.drop_table("section_progress")


def downgrade():
    op.create_table(
        "section_progress",
        sa.Column("id", sa.Integer, primary_key=True, autoincrement=True),
        sa.Column("user_id", sa.Integer, sa.ForeignKey("users.id"), nullable=False),
        sa.Column("module_id", sa.String(100), sa.ForeignKey("modules.id"), nullable=False),
        sa.Column("section_id", sa.String(100), sa.ForeignKey("sections.id"), nullable=False),
        sa.Column("completed", sa.Boolean, nullable=False, server_default="false"),
        sa.Column("xp_awarded", sa.Integer, nullable=False, server_default="0"),
        sa.Column("completed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.text("now()")),
    )

    op.drop_index("ix_lab_progress_user_lab", "lab_progress")
    op.drop_index("ix_lab_progress_user_module", "lab_progress")
    op.drop_table("lab_progress")
    op.drop_table("labs")

    with op.batch_alter_table("sections") as batch_op:
        batch_op.add_column(sa.Column("type", sa.String(20), nullable=False, server_default="reading"))
        batch_op.add_column(sa.Column("xp", sa.Integer, nullable=False, server_default="0"))