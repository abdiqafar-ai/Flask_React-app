"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Ensure state only runs client-side
  useEffect(() => {
    setMenuOpen(false); // Initial state set after mount
  }, []);

  return (
    <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-indigo-700 shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-10 text-neutral-100 font-extrabold italic">
        <img src="./logo.png" alt="logo" width={80} height={80} />
        <span className="text-white text-4xl font-bold font-serif tracking-wide">
          <span className="text-yellow-400">Med</span>
          <span className="text-white">Sphere</span>
        </span>
      </div>

      {/* Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8 text-white font-semibold">
        <a
          href="#home"
          className="hover:text-yellow-400 transition duration-300"
        >
          Home
        </a>
        <a
          href="#services"
          className="hover:text-yellow-400 transition duration-300"
        >
          Services
        </a>
        <a
          href="#about"
          className="hover:text-yellow-400 transition duration-300"
        >
          About
        </a>
        <a
          href="#contact"
          className="hover:text-yellow-400 transition duration-300"
        >
          Contact
        </a>
      </div>

      {/* Mobile Menu Toggle */}
      <button
        className="text-white md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      {/* Mobile Navigation Links */}
      <div
        className={`md:hidden absolute top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-indigo-700 p-4 transform ${
          menuOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300`}
      >
        <a
          href="#home"
          className="block text-white py-2 hover:text-yellow-400 transition duration-300"
        >
          Home
        </a>
        <a
          href="#services"
          className="block text-white py-2 hover:text-yellow-400 transition duration-300"
        >
          Services
        </a>
        <a
          href="#about"
          className="block text-white py-2 hover:text-yellow-400 transition duration-300"
        >
          About
        </a>
        <a
          href="#contact"
          className="block text-white py-2 hover:text-yellow-400 transition duration-300"
        >
          Contact
        </a>
      </div>
    </div>
  );
};

export default Navbar;
