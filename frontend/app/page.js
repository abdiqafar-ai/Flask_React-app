import Link from "next/link";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
   
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-500 to-purple-600 text-white">
      <div>
        <Navbar />
      </div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-16 px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          Welcome to <span className="text-yellow-400">MedSphere</span>
        </h1>
        <p className="text-lg md:text-xl mb-10 max-w-2xl font-medium drop-shadow-sm">
          Your all-in-one solution to manage hospital activities efficiently and
          effortlessly.
        </p>
        <div>
          <Link href="/signup">
            <span className="px-8 py-4 bg-yellow-400 text-black font-bold text-lg rounded-full shadow-lg hover:shadow-2xl hover:bg-yellow-500 transition-all duration-300">
              Get Started
            </span>
          </Link>
        </div>
      </section>

      {/* Services Section */}
      <section
        id="services"
        className="py-20 bg-white text-gray-800 px-4 md:px-20"
      >
        <h2 className="text-4xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="text-center p-6 bg-gray-100 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">
              Medical Consultation
            </h3>
            <p className="text-lg">
              Expert doctors available for all your healthcare needs.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-100 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Emergency Services</h3>
            <p className="text-lg">
              24/7 emergency care and trauma services for critical patients.
            </p>
          </div>
          <div className="text-center p-6 bg-gray-100 rounded-xl shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Laboratory Services</h3>
            <p className="text-lg">
              Accurate and quick lab tests to assist in diagnosis and treatment.
            </p>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="py-20 bg-gray-50 text-gray-800 px-4 md:px-20"
      >
        <h2 className="text-4xl font-bold text-center mb-12">About Us</h2>
        <p className="text-lg md:text-xl text-center max-w-2xl mx-auto">
          MedSphere is committed to providing quality healthcare services. Our
          team of experienced doctors, nurses, and specialists work together to
          ensure that you receive the best care possible.
        </p>
      </section>

      <section
        id="contact"
        className="py-20 bg-gray-100 text-gray-800 px-4 md:px-20"
      >
        <h2 className="text-4xl font-bold text-center mb-10">Contact Us</h2>
        <p className="text-lg text-center mb-8">
          Have questions or need help? Reach out to us!
        </p>
        <div className="text-center mb-8">
          <p className="text-lg font-semibold">
            📞 Call Us: <span className="text-blue-500">+254 700 123 456</span>
          </p>
          <p className="text-lg font-semibold">
            📧 Email:{" "}
            <span className="text-blue-500">support@medsphere.com</span>
          </p>
        </div>

        <div className="flex justify-center space-x-6 mt-10">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5.018 3.676 9.163 8.438 9.878v-6.992H8.078v-2.886h2.36V9.705c0-2.334 1.41-3.613 3.566-3.613.996 0 2.024.177 2.024.177v2.22h-1.139c-1.125 0-1.474.695-1.474 1.406v1.667h2.5l-.4 2.886h-2.1v6.992C18.324 21.163 22 17.018 22 12z" />
            </svg>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M23 4.994a8.954 8.954 0 01-2.586.703A4.497 4.497 0 0022.337 3a8.91 8.91 0 01-2.846 1.085 4.484 4.484 0 00-7.654 4.085 12.75 12.75 0 01-9.261-4.7 4.478 4.478 0 001.389 5.981 4.478 4.478 0 01-2.029-.561v.057a4.485 4.485 0 003.592 4.395 4.5 4.5 0 01-2.022.076 4.484 4.484 0 004.184 3.11A9.013 9.013 0 011 19.093a12.735 12.735 0 006.923 2.026c8.31 0 12.858-6.88 12.858-12.846 0-.195-.005-.39-.014-.583A9.12 9.12 0 0023 4.994z" />
            </svg>
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 hover:text-blue-900 transition duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M22.227 0H1.773C.793 0 0 .793 0 1.773v20.454C0 23.207.793 24 1.773 24h20.454C23.207 24 24 23.207 24 22.227V1.773C24 .793 23.207 0 22.227 0zM7.119 20.452H3.531V8.992h3.588v11.46zM5.325 7.573a2.063 2.063 0 01-2.065-2.062 2.065 2.065 0 114.13 0 2.063 2.063 0 01-2.065 2.062zm15.127 12.879h-3.588v-5.597c0-1.333-.024-3.048-1.855-3.048-1.857 0-2.142 1.45-2.142 2.946v5.699h-3.588V8.992h3.444v1.566h.049c.48-.91 1.655-1.866 3.405-1.866 3.643 0 4.318 2.398 4.318 5.515v6.246z" />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
