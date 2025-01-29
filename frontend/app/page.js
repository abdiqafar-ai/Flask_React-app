import Link from "next/link";

const Home = () => (
  <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6">
    <div className="text-center max-w-2xl p-8 bg-white bg-opacity-10 rounded-2xl shadow-lg backdrop-blur-md">
      <h1 className="text-4xl font-extrabold mb-4">Welcome to Medsphere</h1>
      <p className="text-lg mb-6">
        Manage your health records and appointments with ease.
      </p>
      <Link href="/signup">
        <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-500 hover:text-white transition-all duration-300">
          Get Started
        </button>
      </Link>
      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-yellow-300 hover:text-yellow-500 font-medium"
        >
          Login here
        </Link>
      </p>
    </div>
  </div>
);

export default Home;
