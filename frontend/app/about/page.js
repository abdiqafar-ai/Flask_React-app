import Navbar from "../components/Navbar";

const About = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="max-w-4xl mx-auto py-12 px-6">
        <h1 className="text-4xl font-bold text-teal-800 mb-6">
          About Medsphere
        </h1>

        <p className="text-lg text-gray-700 mb-6">
          Medsphere is a **modern medical management system** designed to
          simplify and optimize healthcare operations. Our platform focuses on
          three core functionalities: **patient management, doctor registration,
          and appointment scheduling.** By providing an intuitive and efficient
          interface, Medsphere helps hospitals and clinics **eliminate
          paperwork, reduce scheduling conflicts, and enhance the overall
          patient experience.**
        </p>

        <h2 className="text-2xl font-semibold text-teal-700 mb-4">
          What Medsphere Offers
        </h2>

        <ul className="list-disc pl-6 text-lg text-gray-700 space-y-3">
          <li>
            🔹 **Patient Management** – Easily register and keep track of
            patient details, ensuring accurate records.
          </li>
          <li>
            🔹 **Doctor Profiles** – Manage doctors, their availability, and
            assign them to patients efficiently.
          </li>
          <li>
            🔹 **Appointment Scheduling** – Book and manage patient appointments
            with real-time availability.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold text-teal-700 mt-6 mb-4">
          Why Choose Medsphere?
        </h2>

        <p className="text-lg text-gray-700 mb-6">
          Our system is **built for healthcare providers** who need a reliable
          and easy-to-use solution for managing patient appointments and medical
          staff. Whether you're a receptionist handling bookings or a doctor
          keeping track of your schedule, Medsphere ensures everything runs
          smoothly.
        </p>

        <h2 className="text-2xl font-semibold text-teal-700 mt-6 mb-4">
          Our Mission
        </h2>

        <p className="text-lg text-gray-700">
          At Medsphere, our mission is to **bridge the gap between healthcare
          and technology** by providing a seamless system that enhances patient
          care while reducing administrative workload. We are committed to
          delivering **efficiency, accuracy, and convenience** to medical
          professionals and patients alike.
        </p>
      </div>
    </div>
  );
};

export default About;
