from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager
from marshmallow import Schema, fields, validate

db = SQLAlchemy()


db = SQLAlchemy()
jwt = JWTManager()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(200), nullable=False)
    role = db.Column(db.String(20), nullable=False) 
    registration_code = db.Column(db.String(20), nullable=True) 
    privacy_comment = db.Column(db.String(500), nullable=True)

    def __init__(self, name, email, password, role, registration_code=None):
        self.name = name
        self.email = email
        self.password = password
        self.role = role
        self.registration_code = registration_code

    def set_password(self, password):
        self.password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)


    def get_privacy_comment(self, current_user):
        if current_user.role == 'admin':
            return self.privacy_comment
        return "This comment is private."


class UserSchema(Schema):
    name = fields.Str(required=True)
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    role = fields.Str(required=True, validate=validate.OneOf(['patient', 'doctor', 'admin']))
    registration_code = fields.Str(validate=validate.Length(equal=20))


def init_app(app):
    db.init_app(app)
    jwt.init_app(app)


class Patient(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    contact = db.Column(db.String(100), nullable=False)
    address = db.Column(db.String(200))  
    gender = db.Column(db.String(10))  
    medical_history = db.Column(db.Text)

    appointments = db.relationship('Appointment', backref='patient', lazy=True)
    medical_records = db.relationship('MedicalRecord', backref='patient', lazy=True)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'age': self.age,
            'contact': self.contact,
            'address': self.address,
            'gender': self.gender,
            'medical_history': self.medical_history
        }

    def __repr__(self):
        return f'<Patient {self.name}>'


class Doctor(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    specialization = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100)) 
    office_location = db.Column(db.String(200))  

    appointments = db.relationship('Appointment', backref='doctor', lazy=True)
    medical_records = db.relationship('MedicalRecord', backref='doctor', lazy=True)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'specialization': self.specialization,
            'contact': self.contact,
            'email': self.email,
            'office_location': self.office_location
        }

    def __repr__(self):
        return f'<Doctor {self.name}>'

class Appointment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    reason = db.Column(db.String(200), nullable=False)
    status = db.Column(db.String(50), default='Scheduled')
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'date': self.date,
            'reason': self.reason,
            'status': self.status,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id
        }

    def __repr__(self):
        return f'<Appointment {self.id}>'


class MedicalRecord(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    diagnosis = db.Column(db.String(200))
    treatment = db.Column(db.String(200))
    prescription = db.Column(db.String(200))
    prescribed_tablets = db.Column(db.String(200))
    date = db.Column(db.DateTime, default=datetime.utcnow)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.id'), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'diagnosis': self.diagnosis,
            'treatment': self.treatment,
            'prescription': self.prescription,
            'prescribed_tablets': self.prescribed_tablets,
            'date': self.date,
            'patient_id': self.patient_id,
            'doctor_id': self.doctor_id
        }

    def __repr__(self):
        return f'<MedicalRecord {self.id}>'


class Staff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(100), nullable=False)
    contact = db.Column(db.String(100), nullable=False)

    def as_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'role': self.role,
            'contact': self.contact
        }

    def __repr__(self):
        return f'<Staff {self.name}>'
