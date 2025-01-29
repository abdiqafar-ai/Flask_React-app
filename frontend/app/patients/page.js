"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import PatientList from "../components/PatientList";
import AddPatientForm from "../components/AddPatientForm";

const Patients = () => {
  const [patients, setPatients] = useState([]);

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

  return (
    <div>
      <h1>Patients</h1>
      <PatientList patients={patients} />
      <AddPatientForm onAdd={fetchPatients} />
    </div>
  );
};

export default Patients;
