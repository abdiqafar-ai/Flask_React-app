"use client";
import { useState, useEffect } from "react";
import api from "../services/api";
import DoctorMedicalRecords from "./DoctorMedicalRecords";

const DoctorList = ({ doctors, setDoctors }) => {
  const [viewingDoctor, setViewingDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await api.get("/doctors");
        setDoctors(response.data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [setDoctors]);

  const handleViewDoctor = async (doctor) => {
    if (viewingDoctor?.id === doctor.id) {
      setViewingDoctor(null);
      setPatients([]);
      setSelectedPatient(null);
    } else {
      setViewingDoctor(doctor);
      try {
        const response = await api.get(`/patients?doctorId=${doctor.id}`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    }
  };

  return (
    <div>
      {!viewingDoctor ? (
        <ul className="space-y-6">
          {doctors.map((doctor) => (
            <li key={doctor.id} className="bg-white shadow-md rounded-lg p-6">
              <p className="text-xl font-semibold">{doctor.name}</p>
              <button
                onClick={() => handleViewDoctor(doctor)}
                className="mt-2 px-4 py-2 text-white bg-purple-500 rounded-md hover:bg-purple-600"
              >
                View
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold">
            Patients of {viewingDoctor.name}
          </h2>
          <ul className="space-y-4 mt-4">
            {patients.length === 0 ? (
              <p className="text-gray-600">
                No patients assigned to this doctor.
              </p>
            ) : (
              patients.map((patient) => (
                <li
                  key={patient.id}
                  className="flex justify-between p-3 border-b"
                >
                  <span>{patient.name}</span>
                  <button
                    onClick={() => setSelectedPatient(patient)}
                    className="px-4 py-1 text-white bg-blue-500 rounded-md hover:bg-blue-600"
                  >
                    View Records
                  </button>
                </li>
              ))
            )}
          </ul>
          <button
            onClick={() => setViewingDoctor(null)}
            className="mt-4 px-6 py-2 text-white bg-gray-500 rounded-md hover:bg-gray-600"
          >
            Back to Doctors
          </button>
        </div>
      )}

      {selectedPatient && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-teal-600 mb-4">
            Medical Records for {selectedPatient.name}
          </h2>
          <DoctorMedicalRecords patientId={selectedPatient.id} />
        </div>
      )}
    </div>
  );
};

export default DoctorList;
