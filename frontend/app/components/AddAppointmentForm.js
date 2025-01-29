import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";

const AddAppointmentForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{
        date: "",
        time: "",
        reason: "",
        patient_id: "",
        doctor_id: "",
        notes: "",
      }}
      validationSchema={Yup.object({
        date: Yup.date().required("Required"),
        time: Yup.string().required("Required"),
        reason: Yup.string().required("Required"),
        patient_id: Yup.number().required("Required").positive().integer(),
        doctor_id: Yup.number().required("Required").positive().integer(),
        notes: Yup.string(),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await api.post("/appointments", values);
          resetForm();
          onAdd();
        } catch (error) {
          console.error("Error adding appointment:", error);
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <div>
          <label htmlFor="date">Date</label>
          <Field name="date" type="date" />
          <ErrorMessage name="date" />
        </div>
        <div>
          <label htmlFor="time">Time</label>
          <Field name="time" type="time" />
          <ErrorMessage name="time" />
        </div>
        <div>
          <label htmlFor="reason">Reason</label>
          <Field name="reason" type="text" />
          <ErrorMessage name="reason" />
        </div>
        <div>
          <label htmlFor="patient_id">Patient ID</label>
          <Field name="patient_id" type="number" />
          <ErrorMessage name="patient_id" />
        </div>
        <div>
          <label htmlFor="doctor_id">Doctor ID</label>
          <Field name="doctor_id" type="number" />
          <ErrorMessage name="doctor_id" />
        </div>
        <div>
          <label htmlFor="notes">Notes</label>
          <Field name="notes" type="text" />
          <ErrorMessage name="notes" />
        </div>
        <button type="submit">Add Appointment</button>
      </Form>
    </Formik>
  );
};

export default AddAppointmentForm;
