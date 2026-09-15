import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Pill, Package, CalendarDays, MapPin, FileText, HeartHandshake, Sparkles, Send} from "lucide-react";

import api from "../data/api";

const MedicineDetails = () => {

  const { id } = useParams();

  const [medicine, setMedicine] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRequesting, setIsRequesting] = useState(false);


  // Request Medicine

  const handleRequest = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      const profileResponse = await api.get(
        `/needy/profile/${user.email}`
      );

      if (!profileResponse.data) {
        alert("Please complete your needy profile before requesting medicine");
        return;
      }

      setIsRequesting(true);

      const response = await api.post(
        "/medicine/request",
        {
          medicineId: medicine._id,
          needyEmail: user.email
        }
      );

      const data = response.data;

      alert(data.message);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to request medicine"
      );

    } finally {

      setIsRequesting(false);

    }
  };


  // Fetch Medicine

  useEffect(() => {

    const fetchMedicine = async () => {

      try {

        const response = await api.get(
          `/medicine/id/${id}`
        );

        setMedicine(response.data);

      } catch (error) {

        console.log(error);
        alert("Failed to fetch medicine");

      } finally {

        setIsLoading(false);

      }
    };

    fetchMedicine();

  }, [id]);


  // Loading

  if (isLoading) {

    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl shadow-lg p-6 text-center">

          <div className="w-10 h-10 mx-auto rounded-full border-4 border-cyan-100 border-t-cyan-500 animate-spin"></div>

          <p className="text-gray-500 font-medium mt-3">
            Loading medicine...
          </p>

        </div>

      </div>
    );

  }


  // Medicine Not Found

  if (!medicine) {

    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-6">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">

          <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center">

            <Pill className="w-7 h-7" />

          </div>

          <h2 className="text-xl font-black text-gray-900 mt-4">
            Medicine Not Found
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            This medicine may no longer be available.
          </p>

        </div>

      </div>
    );

  }


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <div className="max-w-5xl mx-auto px-5 md:px-8 py-8">

        {/* Page Header */}

        <div className="mb-5">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">

            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />

            <span className="text-xs font-bold text-cyan-600">
              MEDICINE DETAILS
            </span>

          </div>

        </div>


        {/* Main Card */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-lg overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr]">


            {/* Medicine Image */}

            <div className="bg-gray-50 h-64 md:h-auto md:min-h-96 flex items-center justify-center p-4">

              <img
                src={medicine.image}
                alt={medicine.medicineName}
                className="w-full h-full object-contain rounded-2xl"
              />

            </div>


            {/* Details */}

            <div className="p-6 md:p-7">

              {/* Medicine Name + Category + Condition */}

              <div className="flex flex-wrap items-center gap-2 mb-2">

                <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                  {medicine.medicineName}
                </h1>

                {/* Category */}

                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold">

                  <Pill className="w-3.5 h-3.5" />

                  {medicine.category}

                </span>

                {/* Condition */}

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${
                    medicine.condition === "Sealed"
                      ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                      : "bg-amber-50 border-amber-100 text-amber-700"
                  }`}
                >
                  {medicine.condition}
                </span>

              </div>


              <p className="text-sm text-gray-500 mb-5">
                Medicine shared by a generous donor.
              </p>


              {/* Medicine Information */}

              <div className="grid grid-cols-2 gap-3">

                {/* Quantity */}

                <div className="p-3.5 rounded-xl bg-cyan-50 border border-cyan-100">

                  <div className="flex items-center gap-2 text-cyan-600 mb-1">

                    <Package className="w-4 h-4" />

                    <span className="text-xs font-semibold">
                      Quantity
                    </span>

                  </div>

                  <p className="font-black text-gray-900">
                    {medicine.quantity}
                  </p>

                </div>


                {/* Expiry */}

                <div className="p-3.5 rounded-xl bg-violet-50 border border-violet-100">

                  <div className="flex items-center gap-2 text-violet-600 mb-1">

                    <CalendarDays className="w-4 h-4" />

                    <span className="text-xs font-semibold">
                      Expiry
                    </span>

                  </div>

                  <p className="font-black text-gray-900">

                    {new Date(
                      medicine.expiryDate
                    ).toLocaleDateString()}

                  </p>

                </div>


                {/* Location */}

                <div className="col-span-2 p-3.5 rounded-xl bg-rose-50 border border-rose-100">

                  <div className="flex items-center gap-2 text-rose-600 mb-1">

                    <MapPin className="w-4 h-4" />

                    <span className="text-xs font-semibold">
                      Location
                    </span>

                  </div>

                  <p className="font-black text-gray-900">
                    {medicine.city}, {medicine.state}
                  </p>

                </div>

              </div>


              {/* Description */}

              <div className="mt-5">

                <div className="flex items-center gap-2 mb-2">

                  <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">

                    <FileText className="w-4 h-4" />

                  </div>

                  <h2 className="text-base font-black text-gray-900">
                    Description
                  </h2>

                </div>

                <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100">

                  <p className="text-sm text-gray-600 leading-relaxed">
                    {medicine.description || "No description provided."}
                  </p>

                </div>

              </div>


              {/* Request Section */}

              <div className="mt-5 p-4 rounded-xl bg-linear-to-r from-violet-50 to-cyan-50 border border-violet-100">

                <div className="flex items-center gap-3">

                  <div className="w-9 h-9 shrink-0 rounded-lg bg-white text-violet-600 flex items-center justify-center shadow-sm">

                    <HeartHandshake className="w-4 h-4" />

                  </div>

                  <div>

                    <h3 className="text-sm font-black text-gray-900">
                      Need this medicine?
                    </h3>

                    <p className="text-xs text-gray-500 mt-0.5">
                      Send a request to the donor.
                    </p>

                  </div>

                </div>


                <button
                  type="button"
                  onClick={handleRequest}
                  disabled={isRequesting}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-linear-to-r from-violet-500 to-cyan-500 text-white py-3 rounded-xl font-bold shadow-sm hover:from-violet-600 hover:to-cyan-600 hover:shadow-md transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                >

                  {isRequesting ? (
                    <>
                      <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"></div>
                      Requesting...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Request Medicine
                    </>
                  )}

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MedicineDetails;