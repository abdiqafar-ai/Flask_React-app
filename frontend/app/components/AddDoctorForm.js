// AddDoctorForm.js
"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import { useState, useEffect } from "react";

const AddDoctorForm = ({ onAdd, editDoctor, setEditDoctor }) => {
  const initialValues = {
    name: editDoctor?.name || "",
    specialization: editDoctor?.specialization || "",
    email: editDoctor?.email || "",
    phone: editDoctor?.phone || "",
    availability: editDoctor?.availability || [], // Add availability
  };

  const [availability, setAvailability] = useState(initialValues.availability);

  useEffect(() => {
    if (editDoctor) {
      setAvailability(editDoctor.availability || []);
    }
  }, [editDoctor]);

  const handleAvailabilityChange = (day, time) => {
    const newAvailability = availability.includes(`${day}:${time}`)
      ? availability.filter((slot) => slot !== `${day}:${time}`)
      : [...availability, `${day}:${time}`];

    setAvailability(newAvailability);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={Yup.object({
        name: Yup.string().required("Required"),
        specialization: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        phone: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, resetForm }) => {
        try {
          if (editDoctor) {
            await api.put(`/doctors/${editDoctor.id}`, {
              ...values,
              availability, 
            });
          } else {
            await api.post("/doctors", {
              ...values,
              availability, 
            });
          }
          resetForm();
          onAdd();
          setEditDoctor(null); 
        } catch (error) {
          console.error("Error adding/updating doctor:", error);
        }
        setSubmitting(false);
      }}
    >
      <Form className="space-y-6 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          {editDoctor ? "Edit Doctor" : "Add Doctor"}
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

        <div>
          <h3 className="text-lg font-semibold">Availability</h3>
          <div className="grid grid-cols-2 gap-4 mt-4">
            {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map(
              (day) => (
                <div key={day} className="flex flex-col">
                  <label className="text-sm font-medium">{day}</label>
                  {["Morning", "Afternoon", "Evening"].map((time) => (
                    <div key={time} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={availability.includes(`${day}:${time}`)}
                        onChange={() => handleAvailabilityChange(day, time)}
                        className="mr-2"
                      />
                      <span className="text-sm">{time}</span>
                    </div>
                  ))}
                </div>
              )
            )}
          </div>
        </div>


        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-teal-600 text-white font-semibold rounded-md shadow-md"
          >
            {editDoctor ? "Update Doctor" : "Add Doctor"}
          </button>
        </div>
      </Form>
    </Formik>
  );
};

export default AddDoctorForm;
