from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_migrate import Migrate
from config import Config
from flask_cors import CORS
from models import db, User, UserSchema, Patient, Doctor, Staff, Appointment, MedicalRecord
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
import random
import string
from werkzeug.exceptions import Forbidden

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

db.init_app(app)
migrate = Migrate(app, db)
jwt = JWTManager(app)

@app.route('/admin/register_doctor', methods=['POST'])
@jwt_required()  
def admin_register_doctor():
    current_user_id = get_jwt_identity()
    current_user = User.query.filter_by(id=current_user_id).first()


    if current_user.role != 'admin':
        return jsonify({"message": "Unauthorized access. Only admin can register doctors."}), 403

    data = request.get_json()


    registration_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=20))


    doctor = User(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        role='doctor',
        registration_code=registration_code
    )
    doctor.set_password(data['password'])

    db.session.add(doctor)
    db.session.commit()

    return jsonify({"message": "Doctor registered successfully.", "registration_code": registration_code}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if not data.get('email') or not data.get('password'):
        return jsonify({"message": "Email and password are required"}), 400


    user = User.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({"message": "Invalid email or password"}), 401

    if user.check_password(data['password']):

        if user.role == 'doctor' and user.registration_code != data.get('registration_code'):
            return jsonify({"message": "Invalid registration code"}), 401


        user_schema = UserSchema()
        user_data = user_schema.dump(user)


        access_token = create_access_token(identity=user.id)

        return jsonify({
            "access_token": access_token,
            "role": user.role,
            "user": user_data
        }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401

@app.route('/patient/dashboard', methods=['GET'])
@jwt_required()
def patient_dashboard():
    current_user_id = get_jwt_identity()
    current_user = User.query.filter_by(id=current_user_id).first()
    if current_user.role != 'patient':
        raise Forbidden("Access denied. Patients can only access their dashboard.")
    return jsonify(message="Welcome to the patient dashboard."), 200

@app.route('/doctor/dashboard', methods=['GET'])
@jwt_required()
def doctor_dashboard():
    current_user_id = get_jwt_identity()
    current_user = User.query.filter_by(id=current_user_id).first()
    if current_user.role != 'doctor':
        raise Forbidden("Access denied. Only doctors can access this dashboard.")
    return jsonify(message="Welcome to the doctor dashboard."), 200

@app.route('/admin/dashboard', methods=['GET'])
@jwt_required()
def admin_dashboard():
    current_user_id = get_jwt_identity()
    current_user = User.query.filter_by(id=current_user_id).first()
    if current_user.role != 'admin':
        raise Forbidden("Access denied. Only admins can access this dashboard.")
    return jsonify(message="Welcome to the admin dashboard."), 200

@app.route('/user/<int:user_id>/privacy', methods=['GET'])
@jwt_required()
def get_privacy_comment(user_id):
    current_user_id = get_jwt_identity()
    current_user = User.query.filter_by(id=current_user_id).first()
    target_user = User.query.filter_by(id=user_id).first()

    if not target_user:
        return jsonify({"message": "User not found"}), 404


    if current_user.role != 'admin':
        raise Forbidden("Access denied. Only admins can view privacy comments.")
    return jsonify({"privacy_comment": target_user.registration_code}), 200

@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()

    if not data.get('name') or not data.get('email') or not data.get('password') or not data.get('role'):
        return jsonify({"message": "Name, email, password, and role are required"}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"message": "Email is already registered"}), 400

    if data['role'] not in ['patient', 'doctor']:
        return jsonify({"message": "Invalid role. Only 'patient' or 'doctor' are allowed"}), 400

    registration_code = None
    if data['role'] == 'doctor':
        registration_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=20))

    new_user = User(
        name=data['name'],
        email=data['email'],
        password=data['password'],
        role=data['role'],
        registration_code=registration_code
    )

    new_user.set_password(data['password'])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "message": "User registered successfully.",
        "registration_code": registration_code if registration_code else None
    }), 201

@app.route('/')
def index():
    return "Welcome to the Hospital Management API!"

@app.route('/api/patients', methods=['GET', 'POST'])
def manage_patients():
    if request.method == 'GET':
        patients = Patient.query.all()
        return jsonify([patient.as_dict() for patient in patients])
    
    if request.method == 'POST':
        data = request.get_json()
        new_patient = Patient(**data)
        db.session.add(new_patient)
        db.session.commit()
        return jsonify(new_patient.as_dict()), 201

@app.route('/api/patients/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def patient(id):
    patient = Patient.query.get_or_404(id)
    
    if request.method == 'GET':
        return jsonify(patient.as_dict())
    
    if request.method == 'PUT':
        data = request.get_json()
        for key, value in data.items():
            setattr(patient, key, value)
        db.session.commit()
        return jsonify(patient.as_dict())
    
    if request.method == 'DELETE':
        db.session.delete(patient)
        db.session.commit()
        return '', 204

@app.route('/api/doctors', methods=['GET', 'POST'])
def manage_doctors():
    if request.method == 'GET':
        doctors = Doctor.query.all()
        return jsonify([doctor.as_dict() for doctor in doctors])
    
    if request.method == 'POST':
        data = request.get_json()
        new_doctor = Doctor(**data)
        db.session.add(new_doctor)
        db.session.commit()
        return jsonify(new_doctor.as_dict()), 201

@app.route('/api/doctors/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def doctor(id):
    doctor = Doctor.query.get_or_404(id)
    
    if request.method == 'GET':
        return jsonify(doctor.as_dict())
    
    if request.method == 'PUT':
        data = request.get_json()
        for key, value in data.items():
            setattr(doctor, key, value)
        db.session.commit()
        return jsonify(doctor.as_dict())
    
    if request.method == 'DELETE':
        db.session.delete(doctor)
        db.session.commit()
        return '', 204

@app.route('/api/appointments', methods=['GET', 'POST'])
def manage_appointments():
    if request.method == 'GET':
        appointments = Appointment.query.all()
        return jsonify([appointment.as_dict() for appointment in appointments])
    
    if request.method == 'POST':
        data = request.get_json()
        if isinstance(data.get('date'), str):
            try:
                data['date'] = datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S')
            except ValueError:
                return jsonify({"error": "Invalid date format. Please use YYYY-MM-DDTHH:MM:SS"}), 400
        
        required_fields = ['reason', 'patient_id', 'doctor_id', 'date']
        missing_fields = [field for field in required_fields if field not in data]
        if missing_fields:
            return jsonify({"error": f"Missing required fields: {', '.join(missing_fields)}"}), 400
        
        try:
            new_appointment = Appointment(**data)
            db.session.add(new_appointment)
            db.session.commit()
            return jsonify(new_appointment.as_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Error creating appointment: {str(e)}"}), 500

@app.route('/api/appointments/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def appointment(id):
    appointment = Appointment.query.get_or_404(id)
    
    if request.method == 'GET':
        return jsonify(appointment.as_dict())
    
    if request.method == 'PUT':
        data = request.get_json()
        if isinstance(data.get('date'), str):
            try:
                data['date'] = datetime.strptime(data['date'], '%Y-%m-%dT%H:%M:%S')
            except ValueError:
                return jsonify({"error": "Invalid date format. Please use YYYY-MM-DDTHH:MM:SS"}), 400

        for key, value in data.items():
            setattr(appointment, key, value)
        
        try:
            db.session.commit()
            return jsonify(appointment.as_dict())
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Error updating appointment: {str(e)}"}), 500
    
    if request.method == 'DELETE':
        try:
            db.session.delete(appointment)
            db.session.commit()
            return '', 204
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": f"Error deleting appointment: {str(e)}"}), 500

@app.route('/api/medical_records', methods=['GET', 'POST'])
def manage_medical_records():
    if request.method == 'GET':
        records = MedicalRecord.query.all()
        return jsonify([record.as_dict() for record in records])
    
    if request.method == 'POST':
        data = request.get_json()
        if 'date' in data:
            data['date'] = datetime.fromisoformat(data['date'])  
        new_record = MedicalRecord(**data)
        db.session.add(new_record)
        db.session.commit()
        return jsonify(new_record.as_dict()), 201

@app.route('/api/medical_records/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def medical_record(id):
    record = MedicalRecord.query.get_or_404(id)
    
    if request.method == 'GET':
        return jsonify(record.as_dict())
    
    if request.method == 'PUT':
        data = request.get_json()
        for key, value in data.items():
            setattr(record, key, value)
        db.session.commit()
        return jsonify(record.as_dict())
    
    if request.method == 'DELETE':
        db.session.delete(record)
        db.session.commit()
        return '', 204

@app.route('/api/staff', methods=['GET', 'POST'])
def manage_staff():
    if request.method == 'GET':
        staff = Staff.query.all()
        return jsonify([member.as_dict() for member in staff])
    
    if request.method == 'POST':
        data = request.get_json()
        new_staff = Staff(**data)
        db.session.add(new_staff)
        db.session.commit()
        return jsonify(new_staff.as_dict()), 201

@app.route('/api/staff/<int:id>', methods=['GET', 'PUT', 'DELETE'])
def staff(id):
    member = Staff.query.get_or_404(id)
    
    if request.method == 'GET':
        return jsonify(member.as_dict())
    
    if request.method == 'PUT':
        data = request.get_json()
        for key, value in data.items():
            setattr(member, key, value)
        db.session.commit()
        return jsonify(member.as_dict())
    
    if request.method == 'DELETE':
        db.session.delete(member)
        db.session.commit()
        return '', 204

if __name__ == '__main__':
    app.run(debug=True)
