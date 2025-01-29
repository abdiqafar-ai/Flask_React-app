// components/AddDoctorForm.js
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
      <Form className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Add Doctor
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <Field
            name="name"
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="specialization"
            className="block text-sm font-medium text-gray-700"
          >
            Specialization
          </label>
          <Field
            name="specialization"
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          />
          <ErrorMessage
            name="specialization"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <Field
            name="email"
            type="email"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          />
          <ErrorMessage
            name="email"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone
          </label>
          <Field
            name="phone"
            type="text"
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md focus:ring-teal-500 focus:border-teal-500"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="text-sm text-red-500"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-2 text-white bg-teal-500 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-300"
          >
            Add Doctor
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddDoctorForm;
