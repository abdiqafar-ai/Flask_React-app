"use client";

import React, { useState, useEffect } from "react";

function AdminDashboard() {
  const [view, setView] = useState("dashboard");
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  // Fetch users, appointments, and specializations when the component loads
  useEffect(() => {
    fetchUsers();
    fetchAppointments();
    fetchSpecializations();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setUsers(data);
      } else {
        alert("Failed to fetch users.");
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/appointments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setAppointments(data);
      } else {
        alert("Failed to fetch appointments.");
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchSpecializations = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/admin/specializations"
      );
      const data = await response.json();
      if (response.ok) {
        setSpecializations(data);
      } else {
        alert("Failed to fetch specializations.");
      }
    } catch (error) {
      console.error("Error fetching specializations:", error);
    }
  };

  const handleRegisterDoctor = async (name, email, specialization) => {
    try {
      const response = await fetch("http://localhost:5000/admin/doctors", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
        body: JSON.stringify({ name, email, specialization }),
      });

      if (response.ok) {
        alert("Doctor registered successfully!");
      } else {
        alert("Failed to register doctor.");
      }
    } catch (error) {
      console.error("Error registering doctor:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🩺 Admin Dashboard
        </h1>

        {/* Navigation */}
        <div className="flex space-x-4 mb-8">
          <button
            className={`px-6 py-3 font-medium rounded-lg ${
              view === "dashboard"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={`px-6 py-3 font-medium rounded-lg ${
              view === "registerDoctor"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("registerDoctor")}
          >
            Register Doctor
          </button>
          <button
            className={`px-6 py-3 font-medium rounded-lg ${
              view === "viewUsers"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("viewUsers")}
          >
            View Users
          </button>
          <button
            className={`px-6 py-3 font-medium rounded-lg ${
              view === "viewAppointments"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("viewAppointments")}
          >
            View Appointments
          </button>
        </div>

        {/* Views */}
        {view === "dashboard" && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome to the Admin Dashboard
            </h2>
            <p className="text-gray-500 mt-2">
              Use the navigation menu to manage the system.
            </p>
          </div>
        )}

        {view === "registerDoctor" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Register a New Doctor
            </h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const name = e.target.elements.name.value;
                const email = e.target.elements.email.value;
                const specialization = e.target.elements.specialization.value;
                handleRegisterDoctor(name, email, specialization);
                e.target.reset();
              }}
              className="space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Doctor Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Doctor Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="specialization"
                  className="block text-sm font-medium text-gray-600"
                >
                  Specialization
                </label>
                <select
                  id="specialization"
                  required
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                >
                  {specializations.map((spec) => (
                    <option key={spec.id} value={spec.name}>
                      {spec.name}
                    </option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Register Doctor
              </button>
            </form>
          </div>
        )}

        {view === "viewUsers" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              All Users
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-4 px-6">Name</th>
                  <th className="border-b py-4 px-6">Email</th>
                  <th className="border-b py-4 px-6">Role</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-100">
                    <td className="border-b py-4 px-6">{user.name}</td>
                    <td className="border-b py-4 px-6">{user.email}</td>
                    <td className="border-b py-4 px-6">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "viewAppointments" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              All Appointments
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-4 px-6">Patient Name</th>
                  <th className="border-b py-4 px-6">Doctor</th>
                  <th className="border-b py-4 px-6">Date</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appt) => (
                  <tr key={appt.id} className="hover:bg-gray-100">
                    <td className="border-b py-4 px-6">{appt.patientName}</td>
                    <td className="border-b py-4 px-6">{appt.doctorName}</td>
                    <td className="border-b py-4 px-6">{appt.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
