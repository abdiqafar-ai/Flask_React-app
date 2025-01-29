from flask import Blueprint, request, jsonify
from app import db
from models import User
from schemas import user_schema
from werkzeug.security import generate_password_hash, check_password_hash

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Check if the username already exists
    if User.query.filter_by(username=data['username']).first():
        return jsonify({"error": "Username already exists"}), 400
    
    # Check if the email already exists
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        username=data['username'],
        email=data['email'],
        password=generate_password_hash(data['password'])  # Ensure password is hashed
    )
    db.session.add(new_user)
    db.session.commit()

    return jsonify(user=user_schema.dump(new_user)), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print("Received data:", data)
    
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({"error": "Invalid request format"}), 400

    user = User.query.filter_by(email=data.get('email')).first()

    if user and check_password_hash(user.password, data['password']):
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401




