"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import PatientList from "../components/PatientList";
import AddPatientForm from "../components/AddPatientForm";

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get("/patients");
      setPatients(response.data);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  // Filter patients based on search term (letter by letter)
  const filteredPatients = patients.filter((patient) =>
    [patient.name, patient.email].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-semibold text-teal-700 text-center mb-6">
        Patients List
      </h1>

      {/* Search Input */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm letter by letter
          className="w-full p-2 border border-teal-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      </div>

      {/* Patient List */}
      <div className="bg-white shadow-lg rounded-lg p-4 mb-8">
        <PatientList patients={filteredPatients} />
      </div>

      {/* Add Patient Form */}
      <div className="bg-teal-50 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-teal-600 mb-4">
          Add New Patient
        </h2>
        <AddPatientForm onAdd={fetchPatients} />
      </div>
    </div>
  );
};

export default Patients;
