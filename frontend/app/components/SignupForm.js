"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../services/api";
import Router from "next/router";

const SignupForm = () => {
  return (
    <Formik
      initialValues={{ username: "", email: "", password: "" }}
      validationSchema={Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string().required("Required"),
      })}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const response = await api.post("/auth/register", values);
          if (response.status === 201) {
            Router.push("/login");
          } else {
            setErrors({ submit: response.data.error });
          }
        } catch (error) {
          if (error.response && error.response.data.error) {
            setErrors({ submit: error.response.data.error });
          } else {
            console.error("Error signing up:", error);
          }
        }
        setSubmitting(false);
      }}
    >
      {({ errors }) => (
        <Form>
          <div>
            <label htmlFor="username">Username</label>
            <Field name="username" type="text" />
            <ErrorMessage name="username" />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" />
          </div>
          {errors.submit && <div className="error">{errors.submit}</div>}
          <button type="/login">Sign Up</button>
        </Form>
      )}
    </Formik>
  );
};

export default SignupForm;
