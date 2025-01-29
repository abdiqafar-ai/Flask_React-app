const PatientList = ({ patients }) => (
  <ul>
    {patients.map((patient) => (
      <li key={patient.id}>{patient.name}</li>
    ))}
  </ul>
);

export default PatientList;
