"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";

function PatientDashboard() {
  const [view, setView] = useState("dashboard");
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [medicalRecords, setMedicalRecords] = useState([]);
  const [profile, setProfile] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Fetch appointments, available slots, medical records, and profile when the component loads
  useEffect(() => {
    fetchAppointments();
    fetchMedicalRecords();
    fetchProfile();
    fetchAvailableSlots(); // New function to fetch available slots
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/patient/appointments",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
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

  const fetchAvailableSlots = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/patient/available-slots", // New endpoint for available slots
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAvailableSlots(data);
      } else {
        alert("Failed to fetch available slots.");
      }
    } catch (error) {
      console.error("Error fetching available slots:", error);
    }
  };

  const fetchMedicalRecords = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/patient/medical-records",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMedicalRecords(data);
      } else {
        alert("Failed to fetch medical records.");
      }
    } catch (error) {
      console.error("Error fetching medical records:", error);
    }
  };

  const fetchProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/patient/profile", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setProfile(data);
      } else {
        alert("Failed to fetch profile.");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleSlotSelection = (slot) => {
    setSelectedSlot(slot);
  };

  const handleAppointmentBooking = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/patient/book-appointment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({
            slotId: selectedSlot.id,
          }),
        }
      );

      if (response.ok) {
        alert("Appointment booked successfully!");
        fetchAppointments(); // Refresh appointments after booking
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-7xl mx-auto bg-white shadow-xl rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🩺 Patient Dashboard
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
              view === "appointments"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("appointments")}
          >
            My Appointments
          </button>
          <button
            className={`px-6 py-3 font-medium rounded-lg ${
              view === "medicalRecords"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("medicalRecords")}
          >
            Medical Records
          </button>
          <button
            className={`px-6 py-3 font-medium rounded-lg ${
              view === "profileSettings"
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setView("profileSettings")}
          >
            Profile Settings
          </button>
        </div>

        {/* Views */}
        {view === "dashboard" && (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700">
              Welcome to your Patient Dashboard
            </h2>
            <p className="text-gray-500 mt-2">
              Use the navigation menu to manage your appointments, view medical
              records, and update your profile.
            </p>
          </div>
        )}

        {view === "appointments" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              My Appointments
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-4 px-6">Doctor</th>
                  <th className="border-b py-4 px-6">Date</th>
                  <th className="border-b py-4 px-6">Status</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="hover:bg-gray-100">
                    <td className="border-b py-4 px-6">
                      {appointment.doctorName}
                    </td>
                    <td className="border-b py-4 px-6">{appointment.date}</td>
                    <td className="border-b py-4 px-6">{appointment.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "medicalRecords" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              My Medical Records
            </h2>
            <table className="w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="border-b py-4 px-6">Date</th>
                  <th className="border-b py-4 px-6">Description</th>
                  <th className="border-b py-4 px-6">Doctor</th>
                </tr>
              </thead>
              <tbody>
                {medicalRecords.map((record) => (
                  <tr key={record.id} className="hover:bg-gray-100">
                    <td className="border-b py-4 px-6">{record.date}</td>
                    <td className="border-b py-4 px-6">{record.description}</td>
                    <td className="border-b py-4 px-6">{record.doctorName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {view === "profileSettings" && profile && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Profile Settings
            </h2>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  defaultValue={profile.name}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-600"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  defaultValue={profile.email}
                  className="w-full mt-1 px-4 py-2 border rounded-lg focus:ring focus:ring-blue-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {view === "bookAppointment" && (
          <div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">
              Select Appointment Slot
            </h2>
            <div className="space-y-4">
              {availableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className={`border p-4 rounded-lg ${
                    selectedSlot?.id === slot.id ? "bg-blue-100" : "bg-gray-200"
                  } cursor-pointer`}
                  onClick={() => handleSlotSelection(slot)}
                >
                  <p>{`${slot.date} at ${slot.time}`}</p>
                  <p>Doctor: {slot.doctorName}</p>
                </div>
              ))}
              <button
                onClick={handleAppointmentBooking}
                disabled={!selectedSlot}
                className="mt-4 w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Book Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PatientDashboard;
