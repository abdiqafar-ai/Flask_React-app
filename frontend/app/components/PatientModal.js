const PatientModal = ({ patients, onSelect, onClose }) => (
  <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h3 className="text-lg font-semibold">Select Patient</h3>
      <ul className="space-y-2 mt-4">
        {patients.map((patient) => (
          <li
            key={patient.id}
            onClick={() => onSelect(patient)}
            className="cursor-pointer hover:text-teal-600"
          >
            {patient.name}
          </li>
        ))}
      </ul>
      <button
        className="mt-4 w-full text-white bg-red-600 p-2 rounded-md"
        onClick={onClose}
      >
        Close
      </button>
    </div>
  </div>
);

export default PatientModal;
