from app import ma
from models import User, Patient, Doctor, Appointment

class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User

class PatientSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Patient

class DoctorSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Doctor

class AppointmentSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Appointment

user_schema = UserSchema()
users_schema = UserSchema(many=True)
patient_schema = PatientSchema()
patients_schema = PatientSchema(many=True)
doctor_schema = DoctorSchema()
doctors_schema = DoctorSchema(many=True)
appointment_schema = AppointmentSchema()
appointments_schema = AppointmentSchema(many=True)