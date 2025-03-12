import { useEffect, useState } from "react";
import api from "../services/api";

const AppointmentForm = ({ appointment, onSubmit }) => {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState(
    appointment ? appointment.patient_id : ""
  );
  const [doctorId, setDoctorId] = useState(
    appointment ? appointment.doctor_id : ""
  );
  const [appointmentDate, setAppointmentDate] = useState(
    appointment ? appointment.appointment_date : ""
  );
  const [reason, setReason] = useState(appointment ? appointment.reason : "");

  useEffect(() => {

    const fetchPatientsAndDoctors = async () => {
      try {
        const [patientsResponse, doctorsResponse] = await Promise.all([
          api.get("/patients"),
          api.get("/doctors"),
        ]);
        setPatients(patientsResponse.data);
        setDoctors(doctorsResponse.data);
      } catch (error) {
        console.error("Error fetching patients and doctors:", error);
      }
    };
    fetchPatientsAndDoctors();
  }, []);


  const getPatientName = (id) => {
    const patient = patients.find((patient) => patient.id === id);
    return patient ? patient.name : "Unknown Patient";
  };


  const getDoctorName = (id) => {
    const doctor = doctors.find((doctor) => doctor.id === id);
    return doctor ? doctor.name : "Unknown Doctor";
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_date: appointmentDate,
      reason,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-gray-700">Patient</label>
        <select
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
        >
          <option value="">Select Patient</option>
          {patients.map((patient) => (
            <option key={patient.id} value={patient.id}>
              {patient.name}
            </option>
          ))}
        </select>
        <p className="mt-2 text-gray-500">
          Selected: {getPatientName(patientId)}
        </p>
      </div>

      <div>
        <label className="block text-gray-700">Doctor</label>
        <select
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
        >
          <option value="">Select Doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <p className="mt-2 text-gray-500">
          Selected: {getDoctorName(doctorId)}
        </p>
      </div>

      <div>
        <label className="block text-gray-700">Appointment Date</label>
        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      <div>
        <label className="block text-gray-700">Reason</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full p-2 mt-1 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md"
      >
        {appointment ? "Update Appointment" : "Create Appointment"}
      </button>
    </form>
  );
};

export default AppointmentForm;
