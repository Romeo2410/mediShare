import { useEffect, useState } from "react";
import { Pill, Mail, CalendarDays, Clock3, CheckCircle2, XCircle, Hourglass, ClipboardList, Sparkles} from "lucide-react";

import DashboardNav from "../components/DashboardNavbar";
import api from "../data/api";

const MyRequests = () => {

  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  // Fetch Requests

  useEffect(() => {

    const fetchRequests = async () => {

      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        setIsLoading(false);
        return;
      }

      try {

        const response = await api.get(
          `/medicine/requests/${user.email}`
        );

        const data = response.data;

        setRequests(data);

      } catch (error) {

        console.log(error);
        alert("Failed to fetch requests");

      } finally {

        setIsLoading(false);

      }
    };

    fetchRequests();

  }, []);


  // Status Style

  const getStatusStyle = (status) => {

    if (status === "Accepted") {
      return {
        icon: CheckCircle2,
        bg: "bg-emerald-50",
        border: "border-emerald-100",
        text: "text-emerald-700"
      };
    }

    if (status === "Rejected") {
      return {
        icon: XCircle,
        bg: "bg-rose-50",
        border: "border-rose-100",
        text: "text-rose-700"
      };
    }

    return {
      icon: Hourglass,
      bg: "bg-amber-50",
      border: "border-amber-100",
      text: "text-amber-700"
    };
  };


  // Loading

  if (isLoading) {

    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <div className="w-10 h-10 mx-auto rounded-full border-4 border-cyan-100 border-t-cyan-500 animate-spin"></div>

          <p className="text-gray-500 font-medium mt-3">
            Loading requests...
          </p>

        </div>

      </div>
    );

  }


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="My Requests"
        dashboardPath="/needy/dashboard"
      />


      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">


        {/* Header */}

        <div className="mb-7">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">

            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />

            <span className="text-xs font-bold text-cyan-600">
              MEDICINE REQUESTS
            </span>

          </div>

          <div className="flex items-center gap-3 mt-3">

            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500 to-indigo-500 text-white flex items-center justify-center shadow-md">

              <ClipboardList className="w-5 h-5" />

            </div>

            <div>

              <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                My Requests
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Track the medicines you have requested.
              </p>

            </div>

          </div>

        </div>


        {/* Empty State */}

        {requests.length === 0 ? (

          <div className="bg-white border border-gray-100 rounded-3xl shadow-sm p-10 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-cyan-50 text-cyan-500 flex items-center justify-center">

              <Pill className="w-8 h-8" />

            </div>

            <h2 className="text-xl font-black text-gray-900 mt-5">
              No Requests Yet
            </h2>

            <p className="text-gray-500 text-sm mt-2">
              You haven't requested any medicines yet.
            </p>

          </div>

        ) : (


          /* Request Cards */

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {requests.map((request) => {

              const statusStyle = getStatusStyle(
                request.status
              );

              const StatusIcon = statusStyle.icon;


              return (

                <div
                  key={request._id}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg transition-shadow duration-200"
                >


                  {/* Medicine Header */}

                  <div className="flex items-start justify-between gap-3 mb-5">

                    <div className="flex items-center gap-3 min-w-0">

                      <div className="w-11 h-11 shrink-0 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">

                        <Pill className="w-5 h-5" />

                      </div>

                      <h2 className="text-lg font-black text-gray-900 truncate">

                        {request.medicineName}

                      </h2>

                    </div>


                    {/* Status */}

                    <div
                      className={`
                        shrink-0
                        inline-flex
                        items-center
                        gap-1.5
                        px-2.5
                        py-1
                        rounded-full
                        border
                        text-xs
                        font-bold
                        ${statusStyle.bg}
                        ${statusStyle.border}
                        ${statusStyle.text}
                      `}
                    >

                      <StatusIcon className="w-3.5 h-3.5" />

                      {request.status}

                    </div>

                  </div>


                  {/* Donor */}

                  <div className="flex items-center gap-3 py-3 border-t border-gray-100">

                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">

                      <Mail className="w-4 h-4" />

                    </div>

                    <div className="min-w-0">

                      <p className="text-xs text-gray-400 font-medium">
                        Donor
                      </p>

                      <p className="text-sm font-semibold text-gray-700 truncate">
                        {request.donorEmail}
                      </p>

                    </div>

                  </div>


                  {/* Requested Date */}

                  <div className="flex items-center gap-3 py-3 border-t border-gray-100">

                    <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center">

                      <CalendarDays className="w-4 h-4" />

                    </div>

                    <div>

                      <p className="text-xs text-gray-400 font-medium">
                        Requested
                      </p>

                      <p className="text-sm font-semibold text-gray-700">
                        {new Date(
                          request.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </div>

                  </div>


                  {/* Status Message */}

                  <div
                    className={`
                      mt-2
                      rounded-xl
                      px-3
                      py-2.5
                      ${statusStyle.bg}
                    `}
                  >

                    <div className="flex items-center gap-2">

                      <Clock3
                        className={`w-4 h-4 ${statusStyle.text}`}
                      />

                      <p
                        className={`text-xs font-semibold ${statusStyle.text}`}
                      >
                        {request.status === "Pending"
                          ? "Waiting for donor response"
                          : request.status === "Accepted"
                          ? "Your medicine request was accepted"
                          : "Your medicine request was rejected"}
                      </p>

                    </div>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </div>
  );
};

export default MyRequests;