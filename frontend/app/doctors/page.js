"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import DoctorList from "../components/DoctorList";
import AddDoctorForm from "../components/AddDoctorForm";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

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

  return (
    <div>
      <h1>Doctors</h1>
      <DoctorList doctors={doctors} />
      <AddDoctorForm onAdd={fetchDoctors} />
    </div>
  );
};

export default Doctors;
