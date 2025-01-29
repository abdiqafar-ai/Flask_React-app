import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className="bg-teal-900 p-4 shadow-lg">
      <nav className="flex justify-between items-center">
        <div className="flex items-center">
          {/* Logo */}
          <Image
            src="/logo.png"
            alt="Medsphere Logo"
            width={50}
            height={50}
            className="rounded-full border-4 border-yellow-400"
          />

          {/* Medsphere Text with Playful Styling */}
          <span className="text-white text-5xl font-extrabold ml-3 tracking-wide bg-gradient-to-r from-teal-400 to-yellow-400 text-transparent bg-clip-text animate-bounce">
            Medsphere
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
