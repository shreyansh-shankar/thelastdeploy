# web/backend/alembic/versions/002_modules.py

"""modules

Revision ID: 002
Revises: 001
Create Date: 2025-01-15 00:00:00.000000
"""

from alembic import op
import sqlalchemy as sa

revision = '002'
down_revision = '001'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'modules',
        sa.Column('id', sa.String(100), nullable=False),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('topic', sa.String(50), nullable=True),
        sa.Column('difficulty', sa.String(20), nullable=True),
        sa.Column('estimated_minutes', sa.Integer(), nullable=True),
        sa.Column('tags', sa.Text(), nullable=True),
        sa.Column('yaml_content', sa.Text(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.PrimaryKeyConstraint('id'),
    )

    op.create_table(
        'sections',
        sa.Column('id', sa.String(100), nullable=False),
        sa.Column('module_id', sa.String(100), nullable=False),
        sa.Column('title', sa.String(255), nullable=False),
        sa.Column('type', sa.String(20), nullable=False),
        sa.Column('order', sa.Integer(), nullable=False),
        sa.Column('xp', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('content', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.ForeignKeyConstraint(['module_id'], ['modules.id']),
        sa.PrimaryKeyConstraint('id'),
    )

    op.create_table(
        'section_progress',
        sa.Column('id', sa.Integer(), autoincrement=True, nullable=False),
        sa.Column('user_id', sa.Integer(), nullable=False),
        sa.Column('module_id', sa.String(100), nullable=False),
        sa.Column('section_id', sa.String(100), nullable=False),
        sa.Column('completed', sa.Boolean(), nullable=False, server_default='false'),
        sa.Column('xp_awarded', sa.Integer(), nullable=False, server_default='0'),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), server_default=sa.func.now()),
        sa.ForeignKeyConstraint(['user_id'], ['users.id']),
        sa.ForeignKeyConstraint(['module_id'], ['modules.id']),
        sa.ForeignKeyConstraint(['section_id'], ['sections.id']),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('user_id', 'section_id', name='uq_user_section'),
    )


def downgrade() -> None:
    op.drop_table('section_progress')
    op.drop_table('sections')
    op.drop_table('modules')