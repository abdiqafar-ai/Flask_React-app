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
      <Form className="space-y-6 max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-teal-700">
          Add New Patient
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="name"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700"
          >
            Age
          </label>
          <Field
            name="age"
            type="number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="age"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div>
          <label
            htmlFor="gender"
            className="block text-sm font-medium text-gray-700"
          >
            Gender
          </label>
          <Field
            as="select"
            name="gender"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="" label="Select gender" />
            <option value="Male" label="Male" />
            <option value="Female" label="Female" />
          </Field>
          <ErrorMessage
            name="gender"
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
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
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="phone"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700 focus:ring-4 focus:ring-teal-300"
          >
            Add Patient
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddPatientForm;