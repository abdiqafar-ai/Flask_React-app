import SignupForm from "../components/SignupForm";
import Link from "next/link";

const Signup = () => (
  <div>
    <h1>Sign Up</h1>
    <SignupForm />
    <p>
      Already have an account? <Link href="/login">Login here</Link>
    </p>
  </div>
);

export default Signup;
