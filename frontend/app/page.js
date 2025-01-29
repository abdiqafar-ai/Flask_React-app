// app/page.js
import Link from "next/link";
import Navbar from "./components/Navbar";

const Home = () => {
  return (
    <div>
      <h1>Welcome to MedSphere</h1>
      <p>
        Your all-in-one solution to manage hospital activities efficiently and
        effortlessly.
      </p>
      <div>
        <Link href="/signup">
          <button>Get Started</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
