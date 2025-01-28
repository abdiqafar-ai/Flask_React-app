from app import app, db
from models import User


with app.app_context():
    admin = User.query.filter_by(email="Abdiqafar3468@gmail.com").first()
    if not admin:
        admin = User(
            name="Abdiqafar Ibrahim",
            email="Abdiqafar3468@gmail.com",
            password="123qwer",
            role="admin"
        )
        admin.set_password("123qwer")
        db.session.add(admin)
        db.session.commit()
        print("Admin user created.")
    else:
        print("Admin already exists.")
