const DoctorList = ({ doctors }) => (
  <ul>
    {doctors.map((doctor) => (
      <li key={doctor.id}>{doctor.name}</li>
    ))}
  </ul>
);

export default DoctorList;
