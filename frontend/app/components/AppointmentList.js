// components/AppointmentList.js
const AppointmentList = ({ appointments, onAdd }) => {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/appointments/${id}`);
      alert("Appointment deleted successfully");
      onAdd(); // Refresh the list
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleEdit = (appointment) => {
    // Handle editing logic
  };

  return (
    <div>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-teal-800 text-white">
          <tr>
            <th className="py-2 px-4">Date</th>
            <th className="py-2 px-4">Reason</th>
            <th className="py-2 px-4">Patient ID</th>
            <th className="py-2 px-4">Doctor ID</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-b">
              <td className="py-2 px-4">{appointment.date}</td>
              <td className="py-2 px-4">{appointment.reason}</td>
              <td className="py-2 px-4">{appointment.patient_id}</td>
              <td className="py-2 px-4">{appointment.doctor_id}</td>
              <td className="py-2 px-4 space-x-4">
                <button
                  onClick={() => handleEdit(appointment)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-lg hover:bg-yellow-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(appointment.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-lg hover:bg-red-400"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentList;
