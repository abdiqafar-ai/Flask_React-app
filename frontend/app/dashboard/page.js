import Link from "next/link";
import Navbar from "../components/Navbar";

const Dashboard = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-teal-800 text-white p-6">
          <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
          <ul className="space-y-4">
            <li>
              <Link href="/patients" className="text-lg hover:text-yellow-400">
                Patients
              </Link>
            </li>
            <li>
              <Link href="/doctors" className="text-lg hover:text-yellow-400">
                Doctors
              </Link>
            </li>
            <li>
              <Link
                href="/appointments"
                className="text-lg hover:text-yellow-400"
              >
                Appointments
              </Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <section className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Welcome to Medsphere Dashboard
            </h3>
            <p className="text-lg text-gray-600">
              Manage patients, doctors, and appointments all in one place.
            </p>
          </section>

          {/* Upcoming Appointments Section */}
          <section className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-bold text-gray-700 mb-4">
              Upcoming Appointments
            </h3>
            <ul className="space-y-4">
              {/* Example of an Appointment */}
              <li className="flex justify-between items-center">
                <span className="text-lg text-gray-600">
                  Dr. Smith - 10:00 AM
                </span>
                <Link href="/appointments">
                  <span className="text-teal-600 hover:text-teal-800 cursor-pointer">
                    View Details
                  </span>
                </Link>
              </li>
              <li className="flex justify-between items-center">
                <span className="text-lg text-gray-600">
                  Dr. Johnson - 2:00 PM
                </span>
                <Link href="/appointments">
                  <span className="text-teal-600 hover:text-teal-800 cursor-pointer">
                    View Details
                  </span>
                </Link>
              </li>
            </ul>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
