import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { HeartHandshake, Sparkles} from "lucide-react";

import DashboardNav from "../components/DashboardNavbar";
import DashboardCard from "../components/DashboardCard";

const NeedyDashboard = () => {

  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setUserName(user.name);
    }
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="Needy Dashboard"
        dashboardPath="/needy/dashboard"
      />

      {/* Welcome Section */}
      <div className="relative overflow-hidden">

        <div className="absolute -top-24 -right-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="absolute -top-20 -left-24 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 pt-12 pb-8">

          <div className="bg-white/80 backdrop-blur-md border border-white rounded-3xl shadow-lg p-8 md:p-10">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">

                  <Sparkles className="w-4 h-4 text-emerald-500" />

                  <span className="text-sm font-bold text-emerald-600">
                    NEEDY DASHBOARD
                  </span>

                </div>

                <h2 className="text-3xl md:text-4xl font-black text-gray-900">

                  Welcome,{" "}

                  <span className="bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                    {userName}
                  </span>

                </h2>

                <p className="text-gray-500 mt-3 text-lg max-w-2xl">
                  Find the medicines you need, manage your requests,
                  and connect with generous donors.
                </p>

              </div>

              <div className="hidden sm:flex w-20 h-20 rounded-3xl bg-linear-to-br from-emerald-500 to-teal-500 text-white items-center justify-center shadow-lg shadow-emerald-200">

                <HeartHandshake className="w-10 h-10" />

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* Dashboard Cards */}
      <div className="max-w-7xl mx-auto px-6 md:px-8 pb-12">

        <div className="mb-7">

          <h3 className="text-2xl font-black text-gray-900">
            Manage Your Activities
          </h3>

          <p className="text-gray-500 mt-1">
            Choose an option below to continue.
          </p>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <DashboardCard
            title="Needy Profile"
            description="Create and manage your personal profile information."
            buttonText="Manage Profile"
            variant="needy"
            onClick={() => navigate("/needy/profile")}
          />

          <DashboardCard
            title="Find Medicines"
            description="Browse available medicines shared by generous donors."
            buttonText="Find Medicines"
            variant="needy"
            onClick={() => navigate("/needy/find-medicines")}
          />

          <DashboardCard
            title="My Requested Medicines"
            description="View and track the medicines you have requested from donors."
            buttonText="My Requests"
            variant="needy"
            onClick={() => navigate("/needy/requests")}
          />

          <DashboardCard
            title="Request Medicine"
            description="Find medicines by state and city and request what you need."
            buttonText="Find & Request"
            variant="needy"
            onClick={() => navigate("/needy/request-medicine")}
          />

        </div>

      </div>

    </div>
  );
};

export default NeedyDashboard;