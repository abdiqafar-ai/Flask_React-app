# Medsphere Medical Management System

Medsphere is a full-stack medical management system designed to streamline the management of patients, doctors, and appointments in a hospital setting. The system provides an easy-to-use interface for hospital staff to manage patient and doctor records, and schedule appointments effectively.

This project is built using Flask for the backend and React for the frontend, ensuring a responsive, modern, and scalable application. The system integrates essential functionalities for daily hospital operations while ensuring data security.


## Contents

Project Overview
Features
Technologies Used
Installation
Usage
Folder Structure
Contributing
License.


## OVERVIEW

Medsphere is a medical management system that allows the management of patients, doctors, and appointments. Users can perform the following:

Patient Management: Add and manage patient details, such as personal information.
Doctor Management: Add and manage doctor profiles, including their specialization, availability, and contact details.
Appointment Scheduling: Book, view, and cancel appointments between patients and doctors.

## FEATURES

1. Patient Management.
Add and update patient details, including name, age, and contact information.
2. Doctor Management.
Register and manage doctor profiles with details such as name, specialization, and contact information.
View doctor availability
3. Appointment Scheduling.
Schedule appointments by selecting a doctor, choosing a date.
Doctors and patients can cancel appointments if needed.
4. User Authentication.
Secure login and siggn up page.

## TECHNOLOGIES USED

* BACKEND *

1. Flask(python web Framework).
2. SQLALCHEMY(ORM).
3. SQLITE(Database).

* Frontend *

1. Nextjs.
2. Tailwind css for styling.
3. Formik(Form handling).
4. React Icons(For social media and other icons).

## INSTALLATION

* Backend *

To set up the project locally:

1. clone the respiratory:
git clone [git@github.com:abdiqafar-ai/Flask_React-app.git](https://github.com/abdiqafar-ai/Flask_React-app.git)

2. cd Directory
3. cd server
4. python -m venv venv
5. on windows: venv\Scripts\activate.
   on macos/Linux: source venv/bin/activate
6. install the dependecies: pip install -r requirements.txt.
7. flask run.

The backend will be running on http://127.0.0.1:5000.

* Frontend *

1. cd frontend.
2. npm install.
3. npm run dev.

## Usage

Once the backend and the frontend is running:

1. open the next js app in your browser (http://localhost:3000)
2. user can:
          1. login or sign up incase they don't have an account.
          2. add,search,update and delete a patients.
          3. add,search,update and delete a doctor.
          4. Book and cancel appointment for the patients.

## FOLDER STRUCTURE

app/
│
├── Frontend/.                  # React frontend
│   ├── public/ .
│   └── app/.
│   |
├── server/.
│   ├── app.py.
│   ├── models.py.
│   ├── routes.py.
│   └── schema.py.
├── .gitignore.
├── requirements.txt.
├── README.md.

└── package.json.

## Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a new branch for your changes (git checkout -b feature/your-feature).
3. Make your changes.
4. Commit your changes (git commit -am 'Add new feature').
5. Push to your branch (git push origin feature/your-feature).
6. Create a pull request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Future Improvements

The following features are planned for future updates:

Email Notifications: Automatically notify patients and doctors about upcoming appointments and changes.
Admin Analytics: Dashboard with visual graphs and reports on patient visits, appointment statistics, and doctor performance.
Patient Portal: Allow patients to view their medical history and upcoming appointments.
Multi-language Support: Implement internationalization (i18n) for users from different regions.
Real-time Messaging: Enable real-time communication between doctors and patients via chat.

This project is licensed under the MIT License - see the LICENSE file for details.
