"use client";
import { useEffect, useState } from "react";
import api from "../services/api";

const PatientMedicalRecords = ({ patientId }) => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (patientId) {
      fetchRecords();
    }
  }, [patientId]);

  const fetchRecords = async () => {
    try {
      const response = await api.get(`/patients/${patientId}/medical-records`);
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Medical Records</h2>

      {/* List of Records */}
      <ul>
        {records.length > 0 ? (
          records.map((record) => (
            <li key={record.id} className="border-b p-2">
              <p>
                <strong>Diagnosis:</strong> {record.diagnosis}
              </p>
              <p>
                <strong>Prescription:</strong> {record.prescription}
              </p>
              <p>
                <strong>Notes:</strong> {record.notes}
              </p>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No medical records available.</li>
        )}
      </ul>
    </div>
  );
};

export default PatientMedicalRecords;
