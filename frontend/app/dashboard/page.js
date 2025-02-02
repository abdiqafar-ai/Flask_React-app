"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    // You can fetch data here if needed, but for now it's removed
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-teal-900 text-white p-6 flex flex-col shadow-lg">
          <h2 className="text-2xl font-semibold mb-8">Medsphere Dashboard</h2>
          <ul className="space-y-6">
            <li>
              <Link
                href="/patients"
                className="text-lg hover:text-yellow-400 transition duration-300 ease-in-out"
              >
                <i className="fas fa-user-md mr-2"></i>Patients
              </Link>
            </li>
            <li>
              <Link
                href="/doctors"
                className="text-lg hover:text-yellow-400 transition duration-300 ease-in-out"
              >
                <i className="fas fa-user-nurse mr-2"></i>Doctors
              </Link>
            </li>
            <li>
              <Link
                href="/appointments"
                className="text-lg hover:text-yellow-400 transition duration-300 ease-in-out"
              >
                <i className="fas fa-calendar-alt mr-2"></i>Appointments
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="text-lg hover:text-yellow-400 transition duration-300 ease-in-out"
              >
                <i className="fas fa-info-circle mr-2"></i>About
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-lg hover:text-yellow-400 transition duration-300 ease-in-out"
              >
                <i className="fas fa-phone-alt mr-2"></i>Contact
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-gray-50 overflow-auto">
          {/* Welcome Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-3xl font-semibold text-gray-800 mb-4">
              Welcome to Medsphere Dashboard
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Manage your patients, doctors, and appointments all in one place.
            </p>
            <div className="mt-6">
              <img
                src="/doctor-patient.png" // Replace with your image path
                alt="Doctor and Patient"
                className="w-full h-auto rounded-lg shadow-md"
              />
            </div>
          </section>

          {/* Recent Activities Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Recent Activities
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Via the dashboard, you can view recent activities such as:
            </p>
            <ul className="text-sm space-y-2">
              <li>• Added a new patient record</li>
              <li>• Registered a new doctor</li>
              <li>• Scheduled a new appointment</li>
            </ul>
          </section>

          {/* About Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              About Medsphere
            </h3>
            <p className="text-lg text-gray-600 mb-6">
              Medsphere is a cutting-edge medical management system that helps
              streamline the management of patients, doctors, and appointments
              efficiently.
            </p>
            <Link href="/about">
              <span className="text-teal-600 hover:text-teal-800 cursor-pointer text-lg font-semibold">
                Learn More <i className="fas fa-arrow-right ml-2"></i>
              </span>
            </Link>
          </section>

          {/* Contact Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Contact Us
            </h3>
            <p className="text-lg text-gray-600 mb-4">
              Have questions or need assistance? Reach out to us!
            </p>
            <p className="text-lg text-gray-600 mb-4">
              <strong>Phone:</strong> +1 234 567 890
            </p>
            <Link href="/contact">
              <span className="text-teal-600 hover:text-teal-800 cursor-pointer text-lg font-semibold">
                Get in Touch <i className="fas fa-envelope ml-2"></i>
              </span>
            </Link>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
