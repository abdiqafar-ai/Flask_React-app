"use client";
import { useEffect, useState } from "react";
import Api from "../services/api";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentsList";

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await Api.get("/appointments");
        console.log(response.data); 
        setAppointments(response.data);
      } catch (error) {
        console.error("Error fetching appointments", error);
      }
    }
    fetchAppointments();
  }, []);


  const handleCreate = async (formData) => {
    const formattedDate = new Date(formData.appointment_date)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const updatedFormData = {
      ...formData,
      appointment_date: formattedDate,
    };

    try {
      await Api.post("/appointments", updatedFormData);
      const response = await Api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error during appointment creation:", error);
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await Api.put(`/appointments/${editingAppointment.id}`, formData);
      const response = await Api.get("/appointments");
      setAppointments(response.data);
      setEditingAppointment(null);
    } catch (error) {
      console.error("Error updating appointment", error);
    }
  };

  const handleEdit = (appointment) => {
    setEditingAppointment(appointment);
  };

  const handleDelete = async (id) => {
    try {
      await Api.delete(`/appointments/${id}`);
      const response = await Api.get("/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error deleting appointment", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Appointments
      </h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        {editingAppointment ? (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Edit Appointment
            </h2>
            <AppointmentForm
              appointment={editingAppointment}
              onSubmit={handleUpdate}
            />
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Create Appointment
            </h2>
            <AppointmentForm appointment={null} onSubmit={handleCreate} />
          </div>
        )}
      </div>

      <h2 className="text-2xl font-semibold text-gray-700 mt-6 mb-4">
        Appointment List
      </h2>
      <AppointmentList
        appointments={appointments}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
