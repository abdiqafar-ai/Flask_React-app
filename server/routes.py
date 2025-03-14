from flask import Blueprint, request, jsonify
from extensions import db
from models import Patient, Doctor, Appointment, MedicalRecord
from schemas import (
    patient_schema, patients_schema, doctor_schema, doctors_schema,
    appointment_schema, appointments_schema, medical_record_schema, medical_records_schema
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
def create_patient():
    data = request.get_json()
    if not data or 'name' not in data or 'age' not in data or 'gender' not in data or 'email' not in data or 'phone' not in data:
        return jsonify({'message': 'Missing required fields'}), 400
    new_patient = Patient(name=data['name'], age=data['age'], gender=data['gender'], email=data['email'], phone=data['phone'])
    db.session.add(new_patient)
    db.session.commit()
    return jsonify({'message': 'Patient created successfully'}), 201

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

@main_bp.route('/doctors/<int:id>', methods=['PUT'])
def update_doctor(id):
    doctor = Doctor.query.get(id)
    if not doctor:
        return jsonify({"message": "Doctor not found"}), 404

    try:
        data = request.get_json()
        doctor.name = data['name']
        doctor.specialization = data['specialization']
        doctor.email = data['email']
        doctor.phone = data['phone']
        doctor.availability = data['availability']
        db.session.commit()
        return jsonify({"message": "Doctor updated successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": "Error updating doctor", "error": str(e)}), 500

@main_bp.route('/doctors/<int:doctor_id>', methods=['DELETE'])
def delete_doctor(doctor_id):
    doctor = Doctor.query.get(doctor_id)
    if not doctor:
        return {"message": "Doctor not found"}, 404
    db.session.delete(doctor)
    db.session.commit()
    return {"message": "Doctor deleted successfully"}, 200


@main_bp.route('/appointments', methods=['POST'])
def create_appointment():
    data = request.get_json()
    if not data.get('patient_id') or not data.get('doctor_id') or not data.get('appointment_date') or not data.get('reason'):
        return jsonify({"error": "Missing required fields"}), 400
    new_appointment = Appointment(
        patient_id=data['patient_id'],
        doctor_id=data['doctor_id'],
        appointment_date=datetime.strptime(data['appointment_date'], '%Y-%m-%d %H:%M:%S'),
        reason=data['reason']
    )
    try:
        db.session.add(new_appointment)
        db.session.commit()
        return appointment_schema.jsonify(new_appointment), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@main_bp.route('/appointments', methods=['GET'])
def get_appointments():
    appointments = Appointment.query.all()
    return appointments_schema.jsonify(appointments)

@main_bp.route('/appointments/<int:id>', methods=['GET'])
def get_appointment(id):
    appointment = Appointment.query.get(id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404
    return appointment_schema.jsonify(appointment)

@main_bp.route('/appointments/<int:id>', methods=['PUT'])
def update_appointment(id):
    appointment = Appointment.query.get(id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404
    data = request.get_json()
    if data.get('patient_id'):
        appointment.patient_id = data['patient_id']
    if data.get('doctor_id'):
        appointment.doctor_id = data['doctor_id']
    if data.get('appointment_date'):
        try:
            appointment_date_str = data['appointment_date'].replace("T", " ")
            appointment.appointment_date = datetime.strptime(appointment_date_str, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return jsonify({"error": "Invalid date format. Expected 'YYYY-MM-DDTHH:MM:SS'"}), 400
    if data.get('reason'):
        appointment.reason = data['reason']
    try:
        db.session.commit()
        return appointment_schema.jsonify(appointment)
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@main_bp.route('/appointments/<int:id>', methods=['DELETE'])
def delete_appointment(id):
    appointment = Appointment.query.get(id)
    if not appointment:
        return jsonify({"error": "Appointment not found"}), 404
    try:
        db.session.delete(appointment)
        db.session.commit()
        return jsonify({"message": "Appointment deleted"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500




@main_bp.route('/patients/<int:patient_id>/medical-records', methods=['POST'])
def create_medical_record(patient_id):
    patient = Patient.query.get(patient_id)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404
    
    data = request.get_json()
    new_record = MedicalRecord(
        patient_id=patient_id,
        diagnosis=data.get('diagnosis'),
        prescription=data.get('prescription'),
        notes=data.get('notes')
    )
    try:
        db.session.add(new_record)
        db.session.commit()
        return medical_record_schema.jsonify(new_record), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@main_bp.route('/patients/<int:patient_id>/medical-records', methods=['GET'])
def get_medical_records(patient_id):
    patient = Patient.query.get(patient_id)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404
    records = MedicalRecord.query.filter_by(patient_id=patient_id).all()
    return medical_records_schema.jsonify(records)


@main_bp.route('/medical-records/<int:id>', methods=['GET'])
def get_medical_record(id):
    record = MedicalRecord.query.get(id)
    if not record:
        return jsonify({"error": "Medical record not found"}), 404
    return medical_record_schema.jsonify(record)


@main_bp.route('/medical-records/<int:id>', methods=['PUT'])
def update_medical_record(id):
    record = MedicalRecord.query.get(id)
    if not record:
        return jsonify({"error": "Medical record not found"}), 404
    
    data = request.get_json()
    if data.get('diagnosis'):
        record.diagnosis = data['diagnosis']
    if data.get('prescription'):
        record.prescription = data['prescription']
    if data.get('notes'):
        record.notes = data['notes']
    
    try:
        db.session.commit()
        return medical_record_schema.jsonify(record)
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500


@main_bp.route('/medical-records/<int:id>', methods=['DELETE'])
def delete_medical_record(id):
    record = MedicalRecord.query.get(id)
    if not record:
        return jsonify({"error": "Medical record not found"}), 404
    try:
        db.session.delete(record)
        db.session.commit()
        return jsonify({"message": "Medical record deleted"})
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
