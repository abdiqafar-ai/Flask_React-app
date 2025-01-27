"""Initial migration

Revision ID: ca299140461b
Revises: 
Create Date: 2025-01-25 10:24:10.735452

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'ca299140461b'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('doctor',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('specialization', sa.String(length=100), nullable=False),
    sa.Column('contact', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=True),
    sa.Column('office_location', sa.String(length=200), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('patient',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('contact', sa.String(length=100), nullable=False),
    sa.Column('address', sa.String(length=200), nullable=True),
    sa.Column('gender', sa.String(length=10), nullable=True),
    sa.Column('medical_history', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('staff',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('role', sa.String(length=100), nullable=False),
    sa.Column('contact', sa.String(length=100), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('appointment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('reason', sa.String(length=200), nullable=False),
    sa.Column('status', sa.String(length=50), nullable=True),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('doctor_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctor.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('medical_record',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('diagnosis', sa.String(length=200), nullable=True),
    sa.Column('treatment', sa.String(length=200), nullable=True),
    sa.Column('prescription', sa.String(length=200), nullable=True),
    sa.Column('prescribed_tablets', sa.String(length=200), nullable=True),
    sa.Column('date', sa.DateTime(), nullable=True),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('doctor_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['doctor_id'], ['doctor.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['patient.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('medical_record')
    op.drop_table('appointment')
    op.drop_table('staff')
    op.drop_table('patient')
    op.drop_table('doctor')
    # ### end Alembic commands ###
