"use client";

import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registrationCode, setRegistrationCode] = useState("");
  const [role, setRole] = useState("patient"); // Default role: patient
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { email, password, registrationCode, role };

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("access_token", result.access_token); // Store the token

        // Redirect based on role
        const { role } = result;
        switch (role) {
          case "admin":
            router.push("/admin");
            break;
          case "doctor":
            router.push("/doctor");
            break;
          case "patient":
          default:
            router.push("/patient");
            break;
        }
      } else {
        alert(result.message || "An error occurred during login.");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border px-4 py-2 rounded"
            required
          />
        </div>

        {/* <div className="mb-4">
          <label className="block text-sm font-medium" htmlFor="role">
            Role
          </label>
          <select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border px-4 py-2 rounded"
          >
            <option value="patient">Patient</option>
            <option value="doctor">Doctor</option>
            <option value="admin">Admin</option>
          </select>
        </div> */}

        {role === "doctor" && (
          <div className="mb-4">
            <label
              className="block text-sm font-medium"
              htmlFor="registrationCode"
            >
              Registration Code
            </label>
            <input
              id="registrationCode"
              type="text"
              placeholder="Registration Code"
              value={registrationCode}
              onChange={(e) => setRegistrationCode(e.target.value)}
              className="w-full border px-4 py-2 rounded"
              required
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded w-full"
        >
          Login
        </button>
      </form>

      <p className="mt-4 text-sm">
        Don't have an account?{" "}
        <Link href="/signup" className="text-blue-600">
          Sign up
        </Link>
      </p>
    </div>
  );
}

export default Login;
