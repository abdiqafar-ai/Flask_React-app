import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";

const AddDoctorForm = ({ onAdd }) => {
  return (
    <Formik
      initialValues={{ name: "", specialization: "", email: "", phone: "" }}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        specialization: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          await api.post("/doctors", values);
          resetForm();
          onAdd();
        } catch (error) {
          console.error("Error adding doctor:", error);
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
          <label htmlFor="specialization">Specialization</label>
          <Field name="specialization" type="text" />
          <ErrorMessage name="specialization" />
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
        <button type="submit">Add Doctor</button>
      </Form>
    </Formik>
  );
};

export default AddDoctorForm;
