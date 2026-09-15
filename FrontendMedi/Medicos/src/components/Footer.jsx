import { useNavigate } from "react-router-dom";
import { FaLinkedinIn, FaInstagram } from "react-icons/fa";

const Footer = () => {

  const navigate = useNavigate();

  return (
    <footer className="bg-gray-950 text-white py-14">

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        <div className="grid md:grid-cols-4 gap-10">


          {/* Brand */}

          <div className="md:col-span-2">

            <h2 className="text-3xl font-black mb-4 bg-linear-to-r from-emerald-400 via-teal-400 to-indigo-400 bg-clip-text text-transparent">
              MediShare
            </h2>

            <p className="text-gray-400 max-w-md leading-relaxed mb-6">
              Connecting unused medicines with people who need them.
              Together, we can reduce medicine waste and make a
              meaningful difference.
            </p>


            {/* Social Icons */}

            <div className="flex items-center gap-3">

              {/* LinkedIn */}

              <a
                href="https://www.linkedin.com/in/rupak-gur-852916307/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-indigo-500 hover:text-white hover:border-indigo-500 transition-all duration-300"
              >
                <FaLinkedinIn size={19} />
              </a>


              {/* Instagram */}

              <a
                href="https://www.instagram.com/rupakgurrr/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300"
              >
                <FaInstagram size={19} />
              </a>

            </div>

          </div>


          {/* Quick Links */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3">

              <button
                onClick={() => navigate("/#home")}
                className="text-left text-gray-400 hover:text-emerald-400 transition"
              >
                Home
              </button>

              <button
                onClick={() => navigate("/#why-us")}
                className="text-left text-gray-400 hover:text-emerald-400 transition"
              >
                Why Us
              </button>

              <button
                onClick={() => navigate("/#services")}
                className="text-left text-gray-400 hover:text-teal-400 transition"
              >
                Services
              </button>

              <button
                onClick={() => navigate("/#about")}
                className="text-left text-gray-400 hover:text-indigo-400 transition"
              >
                About Developer
              </button>

            </div>

          </div>


          {/* Account */}

          <div>

            <h3 className="font-bold text-lg mb-5">
              Account
            </h3>

            <div className="flex flex-col gap-3">

              <button
                onClick={() => navigate("/login")}
                className="text-left text-gray-400 hover:text-emerald-400 transition"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="text-left text-gray-400 hover:text-teal-400 transition"
              >
                Sign Up
              </button>

            </div>

          </div>


        </div>


        {/* Bottom */}

        <div className="border-t border-white/10 mt-12 pt-7 flex flex-col md:flex-row items-center justify-between gap-3">

          <p className="text-gray-500 text-sm">
            © 2026 MediShare. Built by Rupak Gur.
          </p>

          <p className="text-gray-600 text-xs">
            Share. Care. Heal.
          </p>

        </div>

      </div>

    </footer>
  );
};

export default Footer;

