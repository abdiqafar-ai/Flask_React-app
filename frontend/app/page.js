import Link from "next/link";

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-teal-500 to-blue-600 text-white px-6">
    <div className="text-center max-w-2xl p-10 bg-white bg-opacity-10 rounded-2xl shadow-xl backdrop-blur-md">
      <h1 className="text-5xl font-bold mb-5">Welcome to Medsphere</h1>
      <p className="text-lg mb-6">
        Simplify medical management with seamless doctor, patient, and
        appointment handling.
      </p>
      <Link href="/signup">
        <button className="bg-white text-teal-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-teal-500 hover:text-white transition-all duration-300">
          Get Started
        </button>
      </Link>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-yellow-300 hover:text-yellow-500 font-medium transition-all"
        >
          Log in here
        </Link>
      </p>
    </div>
  </div>
);

export default Home;
