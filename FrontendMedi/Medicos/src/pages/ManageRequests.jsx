import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNavbar";
import NeedyDetails from "../components/NeedyDetails";
import { ClipboardList, Mail, CalendarDays, UserRound, Check, X, Sparkles} from "lucide-react";
import api from "../data/api";

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEmail, setSelectedEmail] = useState(null);

  const handleStatusChange = async (requestId, status) => {
    try {
      const response = await api.put(
        `/medicine/request/${requestId}`,
        {
          status
        }
      );

      const data = response.data;

      alert(data.message);

      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId
            ? { ...request, status: status }
            : request
        )
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to update request"
      );
    }
  };

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user) {
          alert("Please login first");
          return;
        }

        const response = await api.get(
          `/medicine/requests/donor/${user.email}`
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

        <DashboardNav
          title="Medicine Requests"
          dashboardPath="/donor/dashboard"
        />

        <div className="flex items-center justify-center min-h-96">

          <div className="text-center">

            <div className="w-12 h-12 mx-auto rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin"></div>

            <p className="text-gray-500 font-medium mt-4">
              Loading requests...
            </p>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="Medicine Requests"
        dashboardPath="/donor/dashboard"
      />

      <div className="relative overflow-hidden">

        {/* Background Decorations */}

        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="absolute top-96 -left-24 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-10">

          {/* Header */}

          <div className="mb-9">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">

              <Sparkles className="w-4 h-4 text-emerald-500" />

              <span className="text-sm font-bold text-emerald-600">
                DONOR REQUESTS
              </span>

            </div>

            <div className="flex items-center gap-3 mb-2">

              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-200">

                <ClipboardList className="w-6 h-6" />

              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                Medicine Requests
              </h1>

            </div>

            <p className="text-gray-500 text-lg">
              Review requests and decide who should receive your medicine.
            </p>

          </div>


          {/* Needy Details */}

          {selectedEmail && (
            <NeedyDetails
              email={selectedEmail}
              onClose={() => setSelectedEmail(null)}
            />
          )}


          {/* Empty State */}

          {requests.length === 0 ? (

            <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl shadow-lg p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-5">

                <ClipboardList className="w-8 h-8" />

              </div>

              <h2 className="text-xl font-black text-gray-900 mb-2">
                No Requests Yet
              </h2>

              <p className="text-gray-500">
                No medicine requests have been received yet.
              </p>

            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {requests.map((request) => (

                <div
                  key={request._id}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-xl transition-shadow duration-200"
                >

                  {/* Medicine */}

                  <div className="flex items-start justify-between gap-3 mb-5">

                    <div className="flex items-center gap-3">

                      <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">

                        <ClipboardList className="w-5 h-5" />

                      </div>

                      <div>

                        <p className="text-xs text-gray-400 font-medium">
                          Medicine
                        </p>

                        <h2 className="text-lg font-black text-gray-900">
                          {request.medicineName}
                        </h2>

                      </div>

                    </div>

                    {/* Status */}

                    <span
                      className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold ${
                        request.status === "Pending"
                          ? "bg-amber-50 text-amber-700 border border-amber-100"
                          : request.status === "Accepted"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                          : "bg-rose-50 text-rose-700 border border-rose-100"
                      }`}
                    >
                      {request.status}
                    </span>

                  </div>


                  {/* Request Details */}

                  <div className="space-y-3">

                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">

                        <Mail className="w-4 h-4" />

                      </div>

                      <div className="min-w-0">

                        <p className="text-xs text-gray-400">
                          Needy Email
                        </p>

                        <p className="text-sm font-semibold text-gray-700 truncate">
                          {request.needyEmail}
                        </p>

                      </div>

                    </div>


                    <div className="flex items-center gap-3">

                      <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">

                        <CalendarDays className="w-4 h-4" />

                      </div>

                      <div>

                        <p className="text-xs text-gray-400">
                          Requested
                        </p>

                        <p className="text-sm font-semibold text-gray-700">
                          {new Date(
                            request.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  </div>


                  {/* Accept / Reject */}

                  <div className="flex gap-3 mt-6">

                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(
                          request._id,
                          "Accepted"
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-xl font-bold shadow-sm hover:bg-emerald-600 hover:shadow-md transition-all duration-300"
                    >

                      <Check className="w-4 h-4" />

                      Accept

                    </button>


                    <button
                      type="button"
                      onClick={() =>
                        handleStatusChange(
                          request._id,
                          "Rejected"
                        )
                      }
                      className="flex-1 flex items-center justify-center gap-2 bg-rose-50 text-rose-600 border border-rose-100 py-2.5 rounded-xl font-bold hover:bg-rose-500 hover:text-white transition-all duration-300"
                    >

                      <X className="w-4 h-4" />

                      Reject

                    </button>

                  </div>


                  {/* Needy Details Button */}

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedEmail(request.needyEmail)
                    }
                    className="w-full mt-3 flex items-center justify-center gap-2 bg-indigo-50 text-indigo-600 border border-indigo-100 py-2.5 rounded-xl font-bold hover:bg-indigo-500 hover:text-white transition-all duration-300"
                  >

                    <UserRound className="w-4 h-4" />

                    View Needy Details

                  </button>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default ManageRequests;
