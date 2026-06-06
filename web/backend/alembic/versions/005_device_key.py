# web/backend/alembic/versions/005_device_key.py
"""
005_device_key: add device_key column to users table

Revision ID: 005
Revises: 004
"""

from alembic import op
import sqlalchemy as sa

revision = "005"
down_revision = "004"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column(
        "users",
        sa.Column("device_key", sa.String(64), nullable=True, unique=True),
    )


def downgrade():
    op.drop_column("users", "device_key")