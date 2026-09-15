import { useNavigate } from "react-router-dom";
import { LayoutDashboard, LogOut, Pill } from "lucide-react";

const DashboardNavbar = ({ title, dashboardPath }) => {

  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login", {
      state: { loggedOut: true }
    });

  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-emerald-100 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">

        <div className="flex items-center justify-between gap-4">

          {/* Logo + Title */}

          <div className="flex items-center gap-3">

            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-sm">

              <Pill className="w-5 h-5" />

            </div>

            <div>

              <h1 className="text-lg md:text-xl font-black bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                MediShare
              </h1>

              <p className="hidden sm:block text-xs text-gray-500 font-medium">
                {title}
              </p>

            </div>

          </div>


          {/* Buttons */}

          <div className="flex items-center gap-2 md:gap-3">

            <button
              onClick={() => navigate(dashboardPath)}
              className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-semibold border border-emerald-100 hover:bg-emerald-500 hover:text-white transition-all duration-300"
            >

              <LayoutDashboard className="w-4 h-4" />

              <span className="hidden sm:inline">
                Dashboard
              </span>

            </button>


            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 md:px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 font-semibold border border-rose-100 hover:bg-rose-500 hover:text-white transition-all duration-300"
            >

              <LogOut className="w-4 h-4" />

              <span className="hidden sm:inline">
                Logout
              </span>

            </button>

          </div>

        </div>

      </div>

    </nav>
  );
};

export default DashboardNavbar;