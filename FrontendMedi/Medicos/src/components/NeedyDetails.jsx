import { useEffect, useState } from "react";
import {
  X,
  UserRound,
  Mail,
  Phone,
  MapPin,
  HeartPulse,
  UsersRound
} from "lucide-react";
import api from "../data/api";

const NeedyDetails = ({ email, onClose }) => {
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get(
          `/needy/profile/${email}`
        );

        setProfile(response.data);

      } catch (error) {
        console.log(error);

        alert(
          error.response?.data?.message ||
          "Failed to fetch needy profile"
        );

      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [email]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center">

          <div className="w-12 h-12 mx-auto rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin"></div>

          <p className="text-gray-500 font-medium mt-4">
            Loading profile...
          </p>

        </div>

      </div>
    );
  }

  if (!profile) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">

      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* Header */}

        <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-6 text-white">

          <div className="flex items-start justify-between gap-4">

            <div className="flex items-center gap-4">

              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">

                <UserRound className="w-7 h-7" />

              </div>

              <div>

                <p className="text-emerald-50 text-sm font-medium">
                  REQUESTER PROFILE
                </p>

                <h2 className="text-2xl font-black">
                  Needy Details
                </h2>

              </div>

            </div>

            <button
              type="button"
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center hover:bg-white/25 transition"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

          </div>

        </div>


        {/* Profile Details */}

        <div className="p-6">

          <div className="space-y-3">

            {/* Name */}

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-emerald-50 border border-emerald-100">

              <div className="w-9 h-9 rounded-xl bg-white text-emerald-600 flex items-center justify-center shrink-0 shadow-sm">

                <UserRound className="w-4 h-4" />

              </div>

              <div className="min-w-0">

                <p className="text-xs text-gray-400 font-medium">
                  Name
                </p>

                <p className="font-bold text-gray-800">
                  {profile.name}
                </p>

              </div>

            </div>


            {/* Email */}

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">

              <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">

                <Mail className="w-4 h-4" />

              </div>

              <div className="min-w-0">

                <p className="text-xs text-gray-400 font-medium">
                  Email
                </p>

                <p className="font-semibold text-gray-700 break-all">
                  {profile.email}
                </p>

              </div>

            </div>


            {/* Contact */}

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-teal-50 border border-teal-100">

              <div className="w-9 h-9 rounded-xl bg-white text-teal-600 flex items-center justify-center shrink-0 shadow-sm">

                <Phone className="w-4 h-4" />

              </div>

              <div>

                <p className="text-xs text-gray-400 font-medium">
                  Contact
                </p>

                <p className="font-bold text-gray-800">
                  {profile.contact}
                </p>

              </div>

            </div>


            {/* Address */}

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-rose-50 border border-rose-100">

              <div className="w-9 h-9 rounded-xl bg-white text-rose-600 flex items-center justify-center shrink-0 shadow-sm">

                <MapPin className="w-4 h-4" />

              </div>

              <div>

                <p className="text-xs text-gray-400 font-medium">
                  Address
                </p>

                <p className="font-semibold text-gray-700">
                  {profile.address}
                </p>

              </div>

            </div>


            {/* State + City */}

            <div className="grid grid-cols-2 gap-3">

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">

                <p className="text-xs text-gray-400 font-medium mb-1">
                  State
                </p>

                <p className="font-bold text-gray-800">
                  {profile.state}
                </p>

              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">

                <p className="text-xs text-gray-400 font-medium mb-1">
                  City
                </p>

                <p className="font-bold text-gray-800">
                  {profile.city}
                </p>

              </div>

            </div>


            {/* User Type */}

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-indigo-50 border border-indigo-100">

              <div className="w-9 h-9 rounded-xl bg-white text-indigo-600 flex items-center justify-center shrink-0 shadow-sm">

                <UsersRound className="w-4 h-4" />

              </div>

              <div>

                <p className="text-xs text-gray-400 font-medium">
                  User Type
                </p>

                <p className="font-bold text-gray-800">
                  {profile.userType}
                </p>

              </div>

            </div>


            {/* Health Problems */}

            <div className="flex items-start gap-3 p-4 rounded-2xl bg-amber-50 border border-amber-100">

              <div className="w-9 h-9 rounded-xl bg-white text-amber-600 flex items-center justify-center shrink-0 shadow-sm">

                <HeartPulse className="w-4 h-4" />

              </div>

              <div className="min-w-0">

                <p className="text-xs text-gray-400 font-medium">
                  Health Problems
                </p>

                <p className="font-semibold text-gray-700">
                  {profile.healthProblems || "Not provided"}
                </p>

              </div>

            </div>

          </div>


          {/* Close Button */}

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-6 bg-linear-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-bold shadow-md shadow-emerald-200/50 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg transition-all duration-300"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
};

export default NeedyDetails;
