"use client";
import React from "react";

const AppointmentList = ({ appointments, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-700 mb-4">
        Appointments List
      </h2>
      <ul className="space-y-4">
        {appointments.map((appointment) => (
          <li
            key={appointment.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-gray-800">
                <strong>Patient ID:</strong> {appointment.patient_id}
              </p>
              <p className="text-gray-800">
                <strong>Doctor ID:</strong> {appointment.doctor_id}
              </p>
              <p className="text-gray-800">
                <strong>Date:</strong>{" "}
                {new Date(appointment.appointment_date).toLocaleString()}
              </p>
              <p className="text-gray-800">
                <strong>Reason:</strong> {appointment.reason}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(appointment)}
                className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(appointment.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AppointmentList;
