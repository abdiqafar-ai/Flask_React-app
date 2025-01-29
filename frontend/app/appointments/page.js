// app/appointments/page.js
"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import AppointmentList from "../components/AppointmentList";
import AddAppointmentForm from "../components/AddAppointmentForm";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  return (
    <div>
      <h1>Appointments</h1>
      <AppointmentList appointments={appointments} />
      <AddAppointmentForm onAdd={fetchAppointments} />
    </div>
  );
};

export default Appointments;
