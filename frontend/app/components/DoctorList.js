// DoctorList.js
"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import AddDoctorForm from "./AddDoctorForm"; // Adjust the path if necessary

const DoctorList = ({ doctors, setDoctors }) => {
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [viewingDoctor, setViewingDoctor] = useState(null);

  useEffect(() => {
    // Fetch initial list of doctors when the component mounts
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleEditClick = (doctor) => {
    setEditingDoctor(doctor);
  };

  const handleViewClick = (doctor) => {
    setViewingDoctor(viewingDoctor?.id === doctor.id ? null : doctor);
  };

  const handleDeleteClick = async (id) => {
    try {
      await api.delete(`/doctors/${id}`);
      setDoctors(doctors.filter((doctor) => doctor.id !== id)); // Update UI after deletion
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  return (
    <div>
      <ul className="space-y-6">
        {doctors.map((doctor) => (
          <li
            key={doctor.id}
            className="flex flex-col bg-white shadow-md rounded-lg hover:bg-gray-50 transition duration-200 ease-in-out p-6"
          >
            <p className="text-xl font-semibold text-gray-800">{doctor.name}</p>

            {viewingDoctor?.id === doctor.id ? (
              <div className="space-y-4 mt-4 text-gray-600">
                <p>
                  <strong>Specialization:</strong> {doctor.specialization}
                </p>
                <p>
                  <strong>Email:</strong> {doctor.email}
                </p>
                <p>
                  <strong>Phone:</strong> {doctor.phone}
                </p>

                <div>
                  <strong>Availability:</strong>
                  <ul className="space-y-1 mt-2">
                    {doctor.availability &&
                      doctor.availability.map((slot, index) => (
                        <li key={index} className="text-sm">
                          {slot}
                        </li>
                      ))}
                  </ul>
                </div>

                <button
                  onClick={() => setViewingDoctor(null)}
                  className="w-full mt-4 px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600 transition duration-200"
                >
                  Hide Details
                </button>
              </div>
            ) : (
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleViewClick(doctor)}
                  className="px-4 py-2 text-sm font-medium text-white bg-purple-500 rounded-md hover:bg-purple-600 transition duration-200"
                >
                  View
                </button>
                <div className="flex space-x-4">
                  <button
                    onClick={() => handleEditClick(doctor)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition duration-200"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(doctor.id)}
                    className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition duration-200"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>

      {editingDoctor && (
        <AddDoctorForm
          editDoctor={editingDoctor}
          onAdd={() => setEditingDoctor(null)} // Reset after editing
        />
      )}
    </div>
  );
};

export default DoctorList;
