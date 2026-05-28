# web/backend/alembic/versions/003_drop_challenges.py

"""drop legacy challenges table

Revision ID: 003
Revises: 002
Create Date: 2025-01-15 00:00:00.000000
"""

from alembic import op

revision = '003'
down_revision = '002'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.drop_table('results')
    op.drop_table('challenges')


def downgrade() -> None:
    pass