// components/DoctorList.js
const DoctorList = ({ doctors, onDelete, onUpdate }) => (
  <ul className="space-y-4">
    {doctors.map((doctor) => (
      <li
        key={doctor.id}
        className="flex items-center justify-between p-4 bg-white shadow-lg rounded-lg hover:bg-gray-50"
      >
        <div>
          <p className="text-lg font-semibold">{doctor.name}</p>
          <p className="text-sm text-gray-500">{doctor.specialization}</p>
        </div>
        <div className="flex space-x-2">
          {/* Update Button */}
          <button
            onClick={() =>
              onUpdate(doctor.id, {
                name: "Updated Name",
                specialization: "Updated Specialization",
              })
            }
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Update
          </button>

          {/* Delete Button */}
          <button
            onClick={() => onDelete(doctor.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
          >
            Delete
          </button>
        </div>
      </li>
    ))}
  </ul>
);

export default DoctorList;
