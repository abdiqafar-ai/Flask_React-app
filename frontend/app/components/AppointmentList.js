const AppointmentList = ({ appointments }) => (
  <ul>
    {appointments.map((appointment) => (
      <li
        key={appointment.id}
      >{`${appointment.date} - ${appointment.reason}`}</li>
    ))}
  </ul>
);

export default AppointmentList;
