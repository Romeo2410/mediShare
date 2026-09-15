import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    
    <nav className="bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm px-6 md:px-8 py-4">
      <div className="max-w-7xl mx-auto">

        {/* Top Navbar */}
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-tight bg-linear-to-r from-emerald-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent"
          >
            MediShare
          </Link>


          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">

            <a
              href="#home"
              className="text-gray-600 font-medium hover:text-emerald-600 transition"
            >
              Home
            </a>

            <a
              href="#about"
              className="text-gray-600 font-medium hover:text-teal-600 transition"
            >
              About
            </a>

            <a
              href="#services"
              className="text-gray-600 font-medium hover:text-indigo-600 transition"
            >
              Services
            </a>

            <a
              href="#why-us"
              className="text-gray-600 font-medium hover:text-rose-500 transition"
            >
              Why Us
            </a>


            {/* Login */}
            <Link
              to="/login"
              className="px-5 py-2 rounded-xl border-2 border-emerald-500 text-emerald-600 font-semibold hover:bg-emerald-50 transition"
            >
              Login
            </Link>


            {/* Sign Up */}
            <Link
              to="/signup"
              className="px-5 py-2 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-semibold shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg transition"
            >
              Sign Up
            </Link>

          </div>


          {/* Hamburger Button - Mobile */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-emerald-600 text-3xl font-bold focus:outline-none"
          >
            {isMenuOpen ? "✕" : "☰"}
          </button>

        </div>


        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 flex flex-col gap-4 border-t border-emerald-100 pt-4">

            <a
              href="#home"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 font-medium hover:text-emerald-600 transition"
            >
              Home
            </a>

            <a
              href="#about"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 font-medium hover:text-teal-600 transition"
            >
              About
            </a>

            <a
              href="#services"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 font-medium hover:text-indigo-600 transition"
            >
              Services
            </a>

            <a
              href="#why-us"
              onClick={() => setIsMenuOpen(false)}
              className="text-gray-600 font-medium hover:text-rose-500 transition"
            >
              Why Us
            </a>


            {/* Mobile Login */}
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
              className="border-2 border-emerald-500 text-emerald-600 px-5 py-2.5 rounded-xl font-semibold text-center hover:bg-emerald-50 transition"
            >
              Login
            </Link>


            {/* Mobile Sign Up */}
            <Link
              to="/signup"
              onClick={() => setIsMenuOpen(false)}
              className="bg-linear-to-r from-emerald-500 to-teal-500 text-white px-5 py-2.5 rounded-xl font-semibold text-center shadow-md hover:from-emerald-600 hover:to-teal-600 transition"
            >
              Sign Up
            </Link>

          </div>
        )}

      </div>

    </nav>
  );
};

export default Navbar;