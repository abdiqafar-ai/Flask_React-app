"use client";
import { useState } from "react";
import api from "../services/api";
import PatientMedicalRecords from "./PatientMedicalRecords"; // Import the correct component

const PatientList = ({ patients }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null); // Track selected patient for medical records

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      alert("Patient deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  const handleEdit = (patient) => {
    setEditMode(true);
    setCurrentPatient(patient);
  };

  const handleUpdate = async (values) => {
    try {
      await api.put(`/patients/${currentPatient.id}`, values);
      alert("Patient updated successfully");
      setEditMode(false);
      setCurrentPatient(null);
      window.location.reload();
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-md">
      <table className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <thead className="bg-teal-700 text-white">
          <tr>
            <th className="py-3 px-6 text-left text-sm font-medium">Name</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Age</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Gender</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Email</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Phone</th>
            <th className="py-3 px-6 text-left text-sm font-medium">Actions</th>
          </tr>
        </thead>
        <tbody className="text-gray-700">
          {patients.map((patient) => (
            <tr
              key={patient.id}
              className="border-b cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedPatient(patient.id)} // Select patient on click
            >
              <td className="py-4 px-6">{patient.name}</td>
              <td className="py-4 px-6">{patient.age}</td>
              <td className="py-4 px-6">{patient.gender}</td>
              <td className="py-4 px-6">{patient.email}</td>
              <td className="py-4 px-6">{patient.phone}</td>
              <td className="py-4 px-6">
                <div className="flex space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click from triggering
                      handleEdit(patient);
                    }}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(patient.id);
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Show Medical Records if a patient is selected */}
      {selectedPatient && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Medical Records for Patient {selectedPatient}
          </h2>
          <PatientMedicalRecords patientId={selectedPatient} />{" "}
          {/* Updated component */}
        </div>
      )}
    </div>
  );
};

export default PatientList;
