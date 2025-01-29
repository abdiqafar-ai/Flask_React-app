"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import api from "../services/api";
import Link from "next/link";

const SignupForm = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">
          Create an Account
        </h2>
        <p className="text-gray-500 mb-6">
          Join us to manage your health records effortlessly!
        </p>

        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          validationSchema={Yup.object({
            username: Yup.string().required("Username is required"),
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string()
              .min(6, "Password must be at least 6 characters")
              .required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            try {
              const response = await api.post("/auth/register", values);
              if (response.status === 201) {
                router.push("/login"); // Redirect to login page after successful signup
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
          {({ errors, isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col text-left">
                <label htmlFor="username" className="font-medium text-gray-700">
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="flex flex-col text-left">
                <label htmlFor="password" className="font-medium text-gray-700">
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {errors.submit && (
                <div className="text-red-500 text-sm">{errors.submit}</div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {isSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-gray-600 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupForm;
