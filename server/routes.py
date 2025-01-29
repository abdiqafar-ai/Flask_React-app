from flask import Blueprint, request, jsonify
from app import db
from models import Patient, Doctor, Appointment
from schemas import (
    patient_schema, patients_schema, doctor_schema, doctors_schema,
    appointment_schema, appointments_schema
)
from datetime import datetime

main_bp = Blueprint('main', __name__)

@main_bp.route('/patients', methods=['GET'])
def get_patients():
    patients = Patient.query.all()
    return patients_schema.jsonify(patients)

@main_bp.route('/patients/<id>', methods=['GET'])
def get_patient(id):
    patient = Patient.query.get(id)
    return patient_schema.jsonify(patient)

@main_bp.route('/patients', methods=['POST'])
def add_patient():
    data = request.get_json()
    new_patient = Patient(**data)
    db.session.add(new_patient)
    db.session.commit()
    return patient_schema.jsonify(new_patient), 201

@main_bp.route('/patients/<id>', methods=['PUT'])
def update_patient(id):
    patient = Patient.query.get(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(patient, key, value)
    db.session.commit()
    return patient_schema.jsonify(patient)

@main_bp.route('/patients/<int:id>', methods=['DELETE'])
def delete_patient(id):
    patient = Patient.query.get(id)
    db.session.delete(patient)
    db.session.commit()
    return '', 204


@main_bp.route('/doctors', methods=['GET'])
def get_doctors():
    doctors = Doctor.query.all()
    return doctors_schema.jsonify(doctors)

@main_bp.route('/doctors/<id>', methods=['GET'])
def get_doctor(id):
    doctor = Doctor.query.get(id)
    return doctor_schema.jsonify(doctor)

@main_bp.route('/doctors', methods=['POST'])
def add_doctor():
    data = request.get_json()
    new_doctor = Doctor(**data)
    db.session.add(new_doctor)
    db.session.commit()
    return doctor_schema.jsonify(new_doctor), 201

@main_bp.route('/doctors/<id>', methods=['PUT'])
def update_doctor(id):
    doctor = Doctor.query.get(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(doctor, key, value)
    db.session.commit()
    return doctor_schema.jsonify(doctor)

@main_bp.route('/doctors/<int:id>', methods=['DELETE'])
def delete_doctor(id):
    doctor = Doctor.query.get(id)
    db.session.delete(doctor)
    db.session.commit()
    return '', 204

# Appointment routes (similar to patient routes)
@main_bp.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    return appointments_schema.jsonify(appointments)

@main_bp.route('/appointments/<id>', methods=['GET'])
def get_appointment(id):
    appointment = Appointment.query.get(id)
    return appointment_schema.jsonify(appointment)

@main_bp.route('/appointments', methods=['POST'])  # Ensure this route requires authentication
def create_appointment():
    data = request.get_json()
    try:
        # Parse appointment_date from the input data
        appointment_date = datetime.strptime(data['appointment_date'], '%Y-%m-%dT%H:%M:%S')
        new_appointment = Appointment(
            appointment_date=appointment_date,  # Use the correct field name
            reason=data['reason'],
            patient_id=data['patient_id'],
            doctor_id=data['doctor_id'],
            notes=data.get('notes', '')  # Optional field
        )
        db.session.add(new_appointment)
        db.session.commit()
        return appointment_schema.jsonify(new_appointment), 201
    except KeyError as e:
        return jsonify({"error": f"Missing field: {str(e)}"}), 400
    except ValueError as e:
        return jsonify({"error": f"Invalid date format: {str(e)}"}), 400

@main_bp.route('/appointments/<id>', methods=['PUT'])
def update_appointment(id):
    appointment = Appointment.query.get(id)
    data = request.get_json()
    for key, value in data.items():
        setattr(appointment, key, value)
    db.session.commit()
    return appointment_schema.jsonify(appointment)

@main_bp.route('/appointments/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appointment = Appointment.query.get(id)
    db.session.delete(appointment)
    db.session.commit()
    return '', 204