from extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = "users"
    __table_args__ = {"schema": "hospital_db"}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

class Patient(db.Model):
    __tablename__ = "patients"
    __table_args__ = {"schema": "hospital_db"}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)

    appointments = db.relationship('Appointment', backref='patient', lazy=True, cascade="all, delete-orphan")
    medical_records = db.relationship('MedicalRecord', backref='patient', lazy=True, cascade="all, delete-orphan")

class Doctor(db.Model):
    __tablename__ = "doctors"
    __table_args__ = {"schema": "hospital_db"}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    availability = db.Column(db.JSON, nullable=False)

    appointments = db.relationship('Appointment', backref='doctor', lazy=True, cascade="all, delete-orphan")

class Appointment(db.Model):
    __tablename__ = "appointments"
    __table_args__ = {"schema": "hospital_db"}

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('hospital_db.patients.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('hospital_db.doctors.id'), nullable=False)
    appointment_date = db.Column(db.DateTime, nullable=False)
    reason = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<Appointment {self.id} for Patient ID {self.patient_id} with Doctor ID {self.doctor_id}>'

class MedicalRecord(db.Model):
    __tablename__ = "medical_records"
    __table_args__ = {"schema": "hospital_db"}

    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('hospital_db.patients.id'), nullable=False)
    record_date = db.Column(db.DateTime, default=datetime.utcnow)
    diagnosis = db.Column(db.String(255), nullable=False)
    prescription = db.Column(db.String(255))
    notes = db.Column(db.Text)

    def __repr__(self):
        return f'MedicalRecord {self.id} for Patient ID {self.patient_id} on {self.record_date}'
