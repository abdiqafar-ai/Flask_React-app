// app/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import AppointmentList from "../components/AppointmentList";
import AddAppointmentForm from "../components/AddAppointmentForm";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-teal-700 text-center mb-6">
        Appointments Management
      </h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Reason"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Appointment List */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <AppointmentList
          appointments={filteredAppointments}
          onAdd={fetchAppointments}
        />
      </div>

      {/* Add Appointment Form */}
      <div className="bg-teal-50 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Add New Appointment
        </h2>
        <AddAppointmentForm onAdd={fetchAppointments} />
      </div>
    </div>
  );
};

export default Appointments;
