import Link from "next/link";
import { useState } from "react";
import api from "../services/api";

const PatientList = ({ patients }) => {
  const [editMode, setEditMode] = useState(false);
  const [currentPatient, setCurrentPatient] = useState(null);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/patients/${id}`);
      alert("Patient deleted successfully");
      // After deleting, you can trigger the parent component to re-fetch the list
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
      // Trigger re-fetch after update
      window.location.reload();
    } catch (error) {
      console.error("Error updating patient:", error);
    }
  };

  return (
    <div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-teal-800 text-white">
          <tr>
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Age</th>
            <th className="py-2 px-4">Gender</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Phone</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient.id} className="border-b">
              <td className="py-2 px-4">{patient.name}</td>
              <td className="py-2 px-4">{patient.age}</td>
              <td className="py-2 px-4">{patient.gender}</td>
              <td className="py-2 px-4">{patient.email}</td>
              <td className="py-2 px-4">{patient.phone}</td>
              <td className="py-2 px-4 space-x-4">
                <button
                  onClick={() => handleEdit(patient)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(patient.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Form (conditional rendering when in edit mode) */}
      {editMode && currentPatient && (
        <div className="mt-6 p-6 bg-teal-50 shadow-lg rounded-lg">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Update Patient
          </h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const formValues = {
                name: e.target.name.value,
                age: e.target.age.value,
                gender: e.target.gender.value,
                email: e.target.email.value,
                phone: e.target.phone.value,
              };
              handleUpdate(formValues);
            }}
          >
            <div className="mb-4">
              <label className="block text-teal-600">Name</label>
              <input
                type="text"
                name="name"
                defaultValue={currentPatient.name}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-600">Age</label>
              <input
                type="number"
                name="age"
                defaultValue={currentPatient.age}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-600">Gender</label>
              <input
                type="text"
                name="gender"
                defaultValue={currentPatient.gender}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-600">Email</label>
              <input
                type="email"
                name="email"
                defaultValue={currentPatient.email}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <label className="block text-teal-600">Phone</label>
              <input
                type="text"
                name="phone"
                defaultValue={currentPatient.phone}
                className="w-full p-2 border border-teal-300 rounded-lg"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setEditMode(false);
                  setCurrentPatient(null);
                }}
                className="bg-gray-500 text-white py-1 px-4 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-teal-600 text-white py-1 px-4 rounded-lg hover:bg-teal-500"
              >
                Update
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PatientList;
