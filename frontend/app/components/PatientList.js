"use client";
import { useState } from "react";
import api from "../services/api";
import PatientMedicalRecords from "./PatientMedicalRecords";

const PatientList = ({ patients }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [updatedData, setUpdatedData] = useState({});

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
    setUpdatedData({
      name: patient.name,
      age: patient.age,
      gender: patient.gender,
      email: patient.email,
      phone: patient.phone,
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/patients/${currentPatient.id}`, updatedData);
      alert("Patient updated successfully");

      // Update UI without reloading
      Object.assign(
        patients.find((p) => p.id === currentPatient.id),
        updatedData
      );

      setEditMode(false);
      setCurrentPatient(null);
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
              onClick={() => setSelectedPatient(patient.id)}
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
                      e.stopPropagation();
                      handleEdit(patient);
                    }}
                    className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-400"
                  >
                    Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(patient.id);
                    }}
                    className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-400"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editMode && (
        <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-semibold text-teal-600 mb-4">
            Edit Patient
          </h2>
          <form onSubmit={handleUpdate} className="space-y-4">
            <input
              type="text"
              placeholder="Name"
              value={updatedData.name}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, name: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            <input
              type="number"
              placeholder="Age"
              value={updatedData.age}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, age: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            <select
              value={updatedData.gender}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, gender: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <input
              type="email"
              placeholder="Email"
              value={updatedData.email}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, email: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            <input
              type="text"
              placeholder="Phone"
              value={updatedData.phone}
              onChange={(e) =>
                setUpdatedData({ ...updatedData, phone: e.target.value })
              }
              className="w-full p-2 border rounded-md"
            />
            <button
              type="submit"
              className="bg-teal-500 text-white py-2 px-4 rounded-md"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="ml-2 bg-gray-400 text-white py-2 px-4 rounded-md"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {selectedPatient && (
        <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Medical Records for Patient {selectedPatient}
          </h2>
          <PatientMedicalRecords patientId={selectedPatient} />
        </div>
      )}
    </div>
  );
};

export default PatientList;
