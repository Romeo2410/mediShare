import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Pill, Package, ShieldCheck, CalendarDays, MapPin, Sparkles, SlidersHorizontal, ArrowRight} from "lucide-react";

import DashboardNav from "../components/DashboardNavbar";
import api from "../data/api";

const FindMedicines = () => {

  const [medicines, setMedicines] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();


  const fetchMedicines = async () => {

    try {

      const response = await api.get("/medicines");

      setMedicines(response.data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch medicines"
      );

    } finally {

      setIsLoading(false);

    }
  };


  useEffect(() => {
    fetchMedicines();
  }, []);


  // Search + Filters

  const filteredMedicines = medicines.filter((medicine) => {

    const matchesSearch =
      medicine.medicineName
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchesCategory =
      category === "" || medicine.category === category;

    const matchesCondition =
      condition === "" || medicine.condition === condition;

    return matchesSearch && matchesCategory && matchesCondition;

  });


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="Find Medicines"
        dashboardPath="/needy/dashboard"
      />


      {/* Decorative Background */}

      <div className="relative overflow-hidden">

        <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl"></div>

        <div className="absolute top-60 -left-24 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl"></div>


        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-10">


          {/* Page Header */}

          <div className="mb-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-50 border border-cyan-100 mb-4">

              <Sparkles className="w-4 h-4 text-cyan-500" />

              <span className="text-sm font-bold text-cyan-600">
                MEDICINE COLLECTION
              </span>

            </div>


            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">

              <div>

                <h1 className="text-3xl md:text-4xl font-black text-gray-900">

                  Find{" "}

                  <span className="bg-linear-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">
                    Medicines
                  </span>

                </h1>

                <p className="text-gray-500 mt-3 text-lg">
                  Find medicines donated by people who want to help.
                </p>

              </div>


              <div className="hidden sm:flex items-center gap-2 px-4 py-3 bg-white/80 backdrop-blur-md rounded-2xl border border-white shadow-sm">

                <Pill className="w-5 h-5 text-cyan-500" />

                <span className="text-sm font-bold text-gray-700">
                  {filteredMedicines.length} Medicines Available
                </span>

              </div>

            </div>

          </div>


          {/* Search + Filters */}

          <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl shadow-lg p-5 md:p-6 mb-8">

            <div className="flex items-center gap-2 mb-5">

              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center">

                <SlidersHorizontal className="w-5 h-5" />

              </div>

              <div>

                <h2 className="font-black text-gray-900">
                  Search & Filter
                </h2>

                <p className="text-sm text-gray-500">
                  Narrow down the medicines you need.
                </p>

              </div>

            </div>


            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


              {/* Search */}

              <div className="relative">

                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                <input
                  type="text"
                  placeholder="Search medicine..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition"
                />

              </div>


              {/* Category */}

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3.5 bg-white outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
              >

                <option value="">
                  All Categories
                </option>

                <option value="Tablet">
                  Tablet
                </option>

                <option value="Capsule">
                  Capsule
                </option>

                <option value="Syrup">
                  Syrup
                </option>

                <option value="Injection">
                  Injection
                </option>

                <option value="Other">
                  Other
                </option>

              </select>


              {/* Condition */}

              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="border border-gray-200 rounded-xl px-4 py-3.5 bg-white outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition"
              >

                <option value="">
                  All Conditions
                </option>

                <option value="Sealed">
                  Sealed / Unopened
                </option>

                <option value="Opened">
                  Opened
                </option>

              </select>

            </div>

          </div>


          {/* Loading */}

          {isLoading ? (

            <div className="bg-white/90 rounded-3xl shadow-lg p-12 text-center">

              <div className="w-12 h-12 mx-auto rounded-full border-4 border-cyan-100 border-t-cyan-500 animate-spin"></div>

              <p className="text-gray-500 font-medium mt-4">
                Loading medicines...
              </p>

            </div>


          ) : filteredMedicines.length === 0 ? (

            /* Empty State */

            <div className="bg-white/90 rounded-3xl shadow-lg p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-gray-100 text-gray-400 flex items-center justify-center">

                <Pill className="w-8 h-8" />

              </div>

              <h2 className="text-xl font-black text-gray-900 mt-5">
                No medicines found
              </h2>

              <p className="text-gray-500 mt-2">
                Try changing your search or filters.
              </p>

            </div>


          ) : (

            /* Medicine Cards */

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

              {filteredMedicines.map((medicine) => (

                <div
                  key={medicine._id}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl transition-shadow duration-300"
                >


                  {/* Image */}

                  <div className="relative overflow-hidden">

                    <img
                      src={medicine.image}
                      alt={medicine.medicineName}
                      className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                    />


                    {/* Category */}

                    <div className="absolute top-3 left-3">

                      <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-xs font-bold text-violet-700 shadow-sm">
                        {medicine.category}
                      </span>

                    </div>


                    {/* Condition */}

                    <div className="absolute top-3 right-3">

                      <span
                        className={`
                          px-3 py-1.5
                          rounded-full
                          backdrop-blur-sm
                          text-xs
                          font-bold
                          shadow-sm
                          ${
                            medicine.condition === "Sealed"
                              ? "bg-emerald-50/95 text-emerald-700"
                              : "bg-amber-50/95 text-amber-700"
                          }
                        `}
                      >
                        {medicine.condition}
                      </span>

                    </div>

                  </div>


                  {/* Card Content */}

                  <div className="p-6">


                    {/* Medicine Name */}

                    <h2 className="text-xl font-black text-gray-900 mb-4 line-clamp-1">
                      {medicine.medicineName}
                    </h2>


                    {/* Information */}

                    <div className="space-y-3">


                      {/* Quantity */}

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-gray-500">

                          <Package className="w-4 h-4 text-cyan-500" />

                          <span className="text-sm">
                            Quantity
                          </span>

                        </div>

                        <span className="text-sm font-bold text-gray-800">
                          {medicine.quantity}
                        </span>

                      </div>


                      {/* Condition */}

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-gray-500">

                          <ShieldCheck className="w-4 h-4 text-emerald-500" />

                          <span className="text-sm">
                            Condition
                          </span>

                        </div>

                        <span className="text-sm font-bold text-gray-800">
                          {medicine.condition}
                        </span>

                      </div>


                      {/* Expiry */}

                      <div className="flex items-center justify-between">

                        <div className="flex items-center gap-2 text-gray-500">

                          <CalendarDays className="w-4 h-4 text-violet-500" />

                          <span className="text-sm">
                            Expiry
                          </span>

                        </div>

                        <span className="text-sm font-bold text-gray-800">
                          {new Date(
                            medicine.expiryDate
                          ).toLocaleDateString()}
                        </span>

                      </div>


                      {/* Location */}

                      <div className="pt-2 border-t border-gray-100">

                        <div className="flex items-center gap-2 text-gray-500 mb-1">

                          <MapPin className="w-4 h-4 text-rose-500" />

                          <span className="text-sm font-semibold">
                            Location
                          </span>

                        </div>

                        <p className="text-sm text-gray-700 pl-6">
                          {medicine.city}, {medicine.state}
                        </p>

                      </div>

                    </div>


                    {/* View Details */}

                    <button
                      type="button"
                      onClick={() =>
                        navigate(
                          `/needy/medicine/${medicine._id}`,
                          {
                            state: {
                              medicine
                            }
                          }
                        )
                      }
                      className="w-full mt-6 bg-linear-to-r from-cyan-500 to-violet-500 text-white py-3 rounded-xl font-bold shadow-sm hover:from-cyan-600 hover:to-violet-600 hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                    >

                      View Details

                      <ArrowRight className="w-4 h-4" />

                    </button>

                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </div>
  );
};

export default FindMedicines;