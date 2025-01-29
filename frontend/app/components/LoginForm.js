"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import api from "../services/api";

const LoginForm = () => {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h2>
        <p className="text-gray-500 mb-6">
          Log in to manage your health records.
        </p>

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email")
              .required("Email is required"),
            password: Yup.string().required("Password is required"),
          })}
          onSubmit={async (values, { setSubmitting, setFieldError }) => {
            try {
              const response = await api.post("/auth/login", values);

              if (response.status === 200) {
                router.replace("/"); // Redirect to home page after login
              } else {
                setFieldError("password", "Invalid credentials");
              }
            } catch (error) {
              setFieldError("password", "Invalid email or password");
            }
            setSubmitting(false);
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col text-left">
                <label htmlFor="email" className="font-medium text-gray-700">
                  Email
                </label>
                <Field
                  name="email"
                  type="email"
                  autoComplete="off"
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
                  autoComplete="off"
                  className="border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
              >
                {isSubmitting ? "Logging in..." : "Log in"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-4 text-gray-600 text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
