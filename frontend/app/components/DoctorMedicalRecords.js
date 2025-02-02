"use client";
import { useEffect, useState } from "react";
import api from "../services/api";

const DoctorMedicalRecords = ({ patientId }) => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    diagnosis: "",
    prescription: "",
    notes: "",
  });
  const [editRecord, setEditRecord] = useState(null);

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

  const handleAddOrUpdateRecord = async (e) => {
    e.preventDefault();
    try {
      if (editRecord) {
        const response = await api.put(
          `/medical-records/${editRecord.id}`,
          editRecord
        );
        setRecords(
          records.map((record) =>
            record.id === editRecord.id ? response.data : record
          )
        );
        setEditRecord(null);
      } else {
        const response = await api.post(
          `/patients/${patientId}/medical-records`,
          newRecord
        );
        setRecords([...records, response.data]);
        setNewRecord({ diagnosis: "", prescription: "", notes: "" });
      }
    } catch (error) {
      console.error("Error saving record:", error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      await api.delete(`/medical-records/${id}`);
      setRecords(records.filter((record) => record.id !== id));
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Manage Medical Records</h2>

      <form onSubmit={handleAddOrUpdateRecord} className="mb-4">
        <input
          type="text"
          placeholder="Diagnosis"
          value={editRecord ? editRecord.diagnosis : newRecord.diagnosis}
          onChange={(e) =>
            editRecord
              ? setEditRecord({ ...editRecord, diagnosis: e.target.value })
              : setNewRecord({ ...newRecord, diagnosis: e.target.value })
          }
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Prescription"
          value={editRecord ? editRecord.prescription : newRecord.prescription}
          onChange={(e) =>
            editRecord
              ? setEditRecord({ ...editRecord, prescription: e.target.value })
              : setNewRecord({ ...newRecord, prescription: e.target.value })
          }
          className="border p-2 mr-2"
          required
        />
        <input
          type="text"
          placeholder="Notes"
          value={editRecord ? editRecord.notes : newRecord.notes}
          onChange={(e) =>
            editRecord
              ? setEditRecord({ ...editRecord, notes: e.target.value })
              : setNewRecord({ ...newRecord, notes: e.target.value })
          }
          className="border p-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 ml-2">
          {editRecord ? "Update" : "Add"} Record
        </button>
      </form>

      <ul>
        {records.length > 0 ? (
          records.map((record) => (
            <li
              key={record.id}
              className="border-b p-2 flex justify-between items-center"
            >
              <div>
                <p>
                  <strong>Diagnosis:</strong> {record.diagnosis}
                </p>
                <p>
                  <strong>Prescription:</strong> {record.prescription}
                </p>
                <p>
                  <strong>Notes:</strong> {record.notes}
                </p>
              </div>
              <div>
                <button
                  onClick={() => setEditRecord(record)}
                  className="bg-yellow-500 text-white px-2 py-1 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRecord(record.id)}
                  className="bg-red-500 text-white px-2 py-1"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No medical records available.</li>
        )}
      </ul>
    </div>
  );
};

export default DoctorMedicalRecords;
