"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import DoctorList from "../components/DoctorList";
import AddDoctorForm from "../components/AddDoctorForm";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await api.get("/doctors");
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

const handleDelete = async (id) => {
  try {
    console.log("Deleting doctor with id:", id); 
    await api.delete(`/doctors/${id}`);
    setDoctors((prevDoctors) =>
      prevDoctors.filter((doctor) => doctor.id !== id)
    );
  } catch (error) {
    console.error("Error deleting doctor:", error);
    alert("Error deleting doctor. Please try again.");
  }
};


  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await api.put(`/doctors/${id}`, updatedData);
      setDoctors((prevDoctors) =>
        prevDoctors.map((doctor) => (doctor.id === id ? response.data : doctor))
      );
    } catch (error) {
      console.error("Error updating doctor:", error);
      alert("Error updating doctor. Please try again.");
    }
  };

  const filteredDoctors = doctors.filter((doctor) =>
    doctor.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-teal-700 text-center mb-6">
        Doctors List
      </h1>


      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name"
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full p-2 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>


      <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <DoctorList
          doctors={filteredDoctors}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>


      <div className="bg-teal-50 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Add New Doctor
        </h2>
        <AddDoctorForm onAdd={fetchDoctors} />{" "}
      </div>
    </div>
  );
};

export default Doctors;
