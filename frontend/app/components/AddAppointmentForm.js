// components/AddAppointmentForm.js
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
      <Form className="space-y-6 max-w-lg mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-center text-teal-700">
          Add New Appointment
        </h2>


        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <Field
            name="date"
            type="date"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="date"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div>
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <Field
            name="time"
            type="time"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="time"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div>
          <label
            htmlFor="reason"
            className="block text-sm font-medium text-gray-700"
          >
            Reason
          </label>
          <Field
            name="reason"
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="reason"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div>
          <label
            htmlFor="patient_id"
            className="block text-sm font-medium text-gray-700"
          >
            Patient ID
          </label>
          <Field
            name="patient_id"
            type="number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="patient_id"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div>
          <label
            htmlFor="doctor_id"
            className="block text-sm font-medium text-gray-700"
          >
            Doctor ID
          </label>
          <Field
            name="doctor_id"
            type="number"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="doctor_id"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div>
          <label
            htmlFor="notes"
            className="block text-sm font-medium text-gray-700"
          >
            Notes
          </label>
          <Field
            name="notes"
            type="text"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
          <ErrorMessage
            name="notes"
            component="div"
            className="text-sm text-red-500"
          />
        </div>


        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-teal-600 text-white font-semibold rounded-md shadow-md hover:bg-teal-700 focus:ring-4 focus:ring-teal-300"
          >
            Add Appointment
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddAppointmentForm;
