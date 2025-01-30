"use client";
import { useState, useEffect } from "react";

const AppointmentForm = ({ appointment, onSubmit }) => {
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [reason, setReason] = useState("");

  useEffect(() => {
    if (appointment) {
      setPatientId(appointment.patient_id);
      setDoctorId(appointment.doctor_id);
      setAppointmentDate(appointment.appointment_date);
      setReason(appointment.reason);
    } else {
      setPatientId("");
      setDoctorId("");
      setAppointmentDate("");
      setReason("");
    }
  }, [appointment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const appointmentData = {
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_date: appointmentDate,
      reason: reason,
    };
    onSubmit(appointmentData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md space-y-4"
    >
      <div>
        <label className="block text-gray-700 font-semibold">Patient ID:</label>
        <input
          type="number"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold">Doctor ID:</label>
        <input
          type="number"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold">
          Appointment Date:
        </label>
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold">Reason:</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
          className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        Submit
      </button>
    </form>
  );
};

export default AppointmentForm;
