// app/components/AddPatientForm.js
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";

const AddPatientForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{ name: "", age: "", gender: "", email: "", phone: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        age: Yup.number().required("Required").positive().integer(),
        gender: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await api.post("/patients", values);
          resetForm();
          onAdd();
        } catch (error) {
          console.error("Error adding patient:", error);
        }
        setSubmitting(false);
      }}
    >
      <Form>
        <div>
          <label htmlFor="name">Name</label>
          <Field name="name" type="text" />
          <ErrorMessage name="name" />
        </div>
        <div>
          <label htmlFor="age">Age</label>
          <Field name="age" type="number" />
          <ErrorMessage name="age" />
        </div>
        <div>
          <label htmlFor="gender">Gender</label>
          <Field name="gender" type="text" />
          <ErrorMessage name="gender" />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <Field name="email" type="email" />
          <ErrorMessage name="email" />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <Field name="phone" type="text" />
          <ErrorMessage name="phone" />
        </div>
        <button type="submit">Add Patient</button>
      </Form>
    </Formik>
  );
};

export default AddPatientForm;
