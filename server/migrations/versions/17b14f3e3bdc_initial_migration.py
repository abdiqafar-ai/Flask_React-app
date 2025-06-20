"""Initial migration

Revision ID: 17b14f3e3bdc
Revises: 
Create Date: 2025-06-19 20:28:46.783899

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '17b14f3e3bdc'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('doctors',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('specialization', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=False),
    sa.Column('availability', sa.JSON(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    schema='hospital_db'
    )
    op.create_table('patients',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('age', sa.Integer(), nullable=False),
    sa.Column('gender', sa.String(length=10), nullable=False),
    sa.Column('email', sa.String(length=100), nullable=False),
    sa.Column('phone', sa.String(length=15), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    schema='hospital_db'
    )
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=80), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password_hash', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username'),
    schema='hospital_db'
    )
    op.create_table('appointments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('doctor_id', sa.Integer(), nullable=False),
    sa.Column('appointment_date', sa.DateTime(), nullable=False),
    sa.Column('reason', sa.String(length=255), nullable=False),
    sa.ForeignKeyConstraint(['doctor_id'], ['hospital_db.doctors.id'], ),
    sa.ForeignKeyConstraint(['patient_id'], ['hospital_db.patients.id'], ),
    sa.PrimaryKeyConstraint('id'),
    schema='hospital_db'
    )
    op.create_table('medical_records',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('patient_id', sa.Integer(), nullable=False),
    sa.Column('record_date', sa.DateTime(), nullable=True),
    sa.Column('diagnosis', sa.String(length=255), nullable=False),
    sa.Column('prescription', sa.String(length=255), nullable=True),
    sa.Column('notes', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['patient_id'], ['hospital_db.patients.id'], ),
    sa.PrimaryKeyConstraint('id'),
    schema='hospital_db'
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('medical_records', schema='hospital_db')
    op.drop_table('appointments', schema='hospital_db')
    op.drop_table('users', schema='hospital_db')
    op.drop_table('patients', schema='hospital_db')
    op.drop_table('doctors', schema='hospital_db')
    # ### end Alembic commands ###
