from flask import Flask
from flask_cors import CORS
from config import Config
from extensions import db, ma, migrate  # Import from extensions
import logging
from logging.handlers import RotatingFileHandler

app = Flask(__name__)
CORS(app)
app.config.from_object(Config)

# Initialize extensions
db.init_app(app)
ma.init_app(app)
migrate.init_app(app, db)

# Delay blueprint import
def register_blueprints():
    from auth import auth_bp
    from routes import main_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(main_bp, url_prefix='/api')

register_blueprints()  # Register blueprints after app is initialized

@app.route('/')
def home():
    return "Welcome to the Health Management System API!"

if __name__ == '__main__':
    handler = RotatingFileHandler('error.log', maxBytes=10000, backupCount=1)
    handler.setLevel(logging.ERROR)
    app.logger.addHandler(handler)
    app.run(debug=True, port=5000)
