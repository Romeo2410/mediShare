import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Map, MapPin, Search, Pill, Package, Sparkles, ArrowRight, SlidersHorizontal} from "lucide-react";

import DashboardNav from "../components/DashboardNavbar";
import api from "../data/api";

const RequestMedicine = () => {

  const navigate = useNavigate();

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [medicines, setMedicines] = useState([]);

  const [isLoadingStates, setIsLoadingStates] = useState(false);
  const [isLoadingCities, setIsLoadingCities] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoadingMedicines, setIsLoadingMedicines] = useState(false);


  // Load States

  useEffect(() => {

    const fetchStates = async () => {

      try {

        setIsLoadingStates(true);

        const response = await api.get(
          "/medicine/states"
        );

        setStates(response.data);

      } catch (error) {

        console.log(error);

        alert("Failed to fetch states");

      } finally {

        setIsLoadingStates(false);

      }

    };

    fetchStates();

  }, []);


  // Load Cities

  useEffect(() => {

    const fetchCities = async () => {

      if (!selectedState) {

        setCities([]);
        setSelectedCity("");

        return;

      }

      try {

        setIsLoadingCities(true);

        setSelectedCity("");
        setMedicines([]);

        const response = await api.get(
          `/medicine/cities?state=${encodeURIComponent(selectedState)}`
        );

        setCities(response.data);

      } catch (error) {

        console.log(error);

        alert("Failed to fetch cities");

      } finally {

        setIsLoadingCities(false);

      }

    };

    fetchCities();

  }, [selectedState]);


  // Find Medicines

  const handleFindMedicines = async () => {

    if (!selectedState || !selectedCity) {

      alert("Please select state and city");

      return;

    }

    try {

      setIsLoadingMedicines(true);

      const response = await api.get(
        "/medicines/location",
        {
          params: {
            state: selectedState,
            city: selectedCity
          }
        }
      );

      setMedicines(response.data);
      setHasSearched(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch medicines"
      );

    } finally {

      setIsLoadingMedicines(false);

    }

  };


  // Show All Medicines

  const handleShowAllMedicines = async () => {

    try {

      setIsLoadingMedicines(true);

      const response = await api.get(
        "/medicines"
      );

      setMedicines(response.data);
      setHasSearched(true);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch medicines"
      );

    } finally {

      setIsLoadingMedicines(false);

    }

  };


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="Request Medicine"
        dashboardPath="/needy/dashboard"
      />


      <div className="max-w-6xl mx-auto px-5 md:px-8 py-8">


        {/* Header */}

        <div className="mb-7">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-50 border border-cyan-100">

            <Sparkles className="w-3.5 h-3.5 text-cyan-500" />

            <span className="text-xs font-bold text-cyan-600">
              FIND MEDICINE
            </span>

          </div>

          <div className="flex items-center gap-3 mt-3">

            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-cyan-500 to-indigo-500 text-white flex items-center justify-center shadow-md">

              <Search className="w-5 h-5" />

            </div>

            <div>

              <h1 className="text-2xl md:text-3xl font-black text-gray-900">
                Request Medicine
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Find available medicines by location.
              </p>

            </div>

          </div>

        </div>


        {/* Search Panel */}

        <div className="bg-white border border-gray-100 rounded-3xl shadow-lg p-6 md:p-7">

          <div className="flex items-center gap-2 mb-5">

            <SlidersHorizontal className="w-5 h-5 text-indigo-500" />

            <h2 className="text-lg font-black text-gray-900">
              Choose Location
            </h2>

          </div>


          {/* State + City */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* State */}

            <div>

              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                <Map className="w-4 h-4 text-emerald-500" />

                Select State

              </label>

              <select
                value={selectedState}
                onChange={(e) =>
                  setSelectedState(e.target.value)
                }
                disabled={isLoadingStates}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 transition disabled:bg-gray-100"
              >

                <option value="">
                  {isLoadingStates
                    ? "Loading states..."
                    : "Select State"}
                </option>

                {states.map((state) => (

                  <option
                    key={state}
                    value={state}
                  >
                    {state}
                  </option>

                ))}

              </select>

            </div>


            {/* City */}

            <div>

              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                <MapPin className="w-4 h-4 text-cyan-500" />

                Select City

              </label>

              <select
                value={selectedCity}
                onChange={(e) =>
                  setSelectedCity(e.target.value)
                }
                disabled={!selectedState || isLoadingCities}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white text-gray-700 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-100 transition disabled:bg-gray-100"
              >

                <option value="">
                  {!selectedState
                    ? "Select state first"
                    : isLoadingCities
                    ? "Loading cities..."
                    : "Select City"}
                </option>

                {cities.map((city) => (

                  <option
                    key={city}
                    value={city}
                  >
                    {city}
                  </option>

                ))}

              </select>

            </div>

          </div>


          {/* Buttons */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-6">

            <button
              type="button"
              onClick={handleFindMedicines}
              disabled={
                !selectedState ||
                !selectedCity ||
                isLoadingMedicines
              }
              className="flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-teal-500 text-white py-3 rounded-xl font-bold shadow-sm hover:from-emerald-600 hover:to-teal-600 hover:shadow-md transition-all duration-300 disabled:bg-gray-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed"
            >

              {isLoadingMedicines ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4" />
                  Find Medicines
                </>
              )}

            </button>


            <button
              type="button"
              onClick={handleShowAllMedicines}
              disabled={isLoadingMedicines}
              className="flex items-center justify-center gap-2 bg-gray-800 text-white py-3 rounded-xl font-bold hover:bg-gray-900 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >

              <Pill className="w-4 h-4" />

              {isLoadingMedicines
                ? "Loading..."
                : "Show All Medicines"}

            </button>

          </div>

        </div>


        {/* Results */}

        <div className="mt-8">

          {hasSearched &&
            medicines.length === 0 &&
            !isLoadingMedicines && (

              <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 text-center">

                <div className="w-14 h-14 mx-auto rounded-xl bg-gray-100 text-gray-400 flex items-center justify-center">

                  <Pill className="w-7 h-7" />

                </div>

                <h2 className="text-lg font-black text-gray-900 mt-4">
                  No Medicines Found
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  No medicines are available for the selected location.
                </p>

              </div>

            )}


          {medicines.length > 0 && (

            <div className="flex items-center justify-between mb-4">

              <div>

                <h2 className="text-xl font-black text-gray-900">
                  Available Medicines
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  {medicines.length} medicine
                  {medicines.length !== 1 ? "s" : ""} available
                </p>

              </div>

            </div>

          )}


          {/* Medicine Cards */}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {medicines.map((medicine) => (

              <div
                key={medicine._id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-lg transition-shadow duration-200"
              >

                {/* Medicine Name + Category */}

                <div className="flex items-center justify-between gap-3 mb-4">

                  <div className="flex items-center gap-2 min-w-0">

                    <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">

                      <Pill className="w-5 h-5" />

                    </div>

                    <h2 className="text-lg font-black text-gray-900 truncate">
                      {medicine.medicineName}
                    </h2>

                  </div>

                  <span className="shrink-0 px-2.5 py-1 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-bold">
                    {medicine.category}
                  </span>

                </div>


                {/* Quantity */}

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">

                  <Package className="w-4 h-4 text-cyan-500" />

                  <span>
                    <span className="font-semibold text-gray-900">
                      Quantity:
                    </span>{" "}
                    {medicine.quantity}
                  </span>

                </div>


                {/* Location */}

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">

                  <MapPin className="w-4 h-4 text-rose-500" />

                  <span className="truncate">

                    <span className="font-semibold text-gray-900">
                      Location:
                    </span>{" "}
                    {medicine.city}, {medicine.state}

                  </span>

                </div>


                {/* View Button */}

                <button
                  type="button"
                  onClick={() =>
                    navigate(
                      `/needy/medicine/${medicine._id}`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-cyan-500 to-indigo-500 text-white py-2.5 rounded-xl font-bold hover:from-cyan-600 hover:to-indigo-600 transition-all duration-300"
                >

                  View & Request

                  <ArrowRight className="w-4 h-4" />

                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default RequestMedicine;