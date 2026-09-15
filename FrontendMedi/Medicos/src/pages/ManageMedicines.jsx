import { useEffect, useState } from "react";
import DashboardNav from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import { Pill, Package, CalendarDays, Pencil, Trash2, Sparkles, ClipboardList} from "lucide-react";
import api from "../data/api";

const ManageMedicines = () => {

  const [medicines, setMedicines] = useState([]);
  const navigate = useNavigate();

  const fetchMedicines = async () => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      const response = await api.get(
        `/medicine/${user.email}`
      );

      const data = response.data;

      setMedicines(data);

    } catch (error) {

      console.log(error);
      alert("Failed to fetch medicines");

    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  const handleDelete = async (medicineId) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this medicine?"
    );

    if (!confirmDelete) {
      return;
    }

    try {

      const response = await api.delete(
        `/medicine/${medicineId}`
      );

      const data = response.data;

      alert(data.message);

      setMedicines((prevMedicines) =>
        prevMedicines.filter(
          (medicine) => medicine._id !== medicineId
        )
      );

    } catch (error) {

      console.log(error);
      alert("Failed to delete medicine");

    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="Manage Medicines"
        dashboardPath="/donor/dashboard"
      />

      <div className="relative overflow-hidden">

        {/* Background Decorations */}

        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="absolute top-96 -left-24 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-10">

          {/* Page Header */}

          <div className="mb-9">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">

              <Sparkles className="w-4 h-4 text-emerald-500" />

              <span className="text-sm font-bold text-emerald-600">
                YOUR MEDICINES
              </span>

            </div>

            <div className="flex items-center gap-3 mb-2">

              <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md shadow-emerald-200">

                <ClipboardList className="w-6 h-6" />

              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                Manage Medicines
              </h1>

            </div>

            <p className="text-gray-500 text-lg">
              View, edit and manage the medicines you have published.
            </p>

          </div>


          {/* Empty State */}

          {medicines.length === 0 ? (

            <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl shadow-lg p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-5">

                <Pill className="w-8 h-8" />

              </div>

              <h2 className="text-xl font-black text-gray-900 mb-2">
                No Medicines Yet
              </h2>

              <p className="text-gray-500">
                You have not published any medicines yet.
              </p>

            </div>

          ) : (

            /* Medicine Grid */

            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

              {medicines.map((medicine) => (

                <div
                  key={medicine._id}
                  className="group bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >

                  {/* Medicine Image */}

                  <div className="relative h-52 bg-gray-100 overflow-hidden">

                    <img
                      src={medicine.image}
                      alt={medicine.medicineName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                  </div>


                  {/* Medicine Details */}

                  <div className="p-6">

                    <div className="flex items-center justify-between gap-3 mb-4">

                      <h2 className="text-xl font-black text-gray-900 line-clamp-1">
                        {medicine.medicineName}
                      </h2>

                      <span className="shrink-0 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-700">
                        {medicine.category}
                      </span>

                    </div>


                    {/* Details */}

                    <div className="space-y-3">

                      <div className="flex items-center gap-3">

                        <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">

                          <Package className="w-4 h-4" />

                        </div>

                        <div>

                          <p className="text-xs text-gray-400 font-medium">
                            Quantity
                          </p>

                          <p className="text-sm font-bold text-gray-700">
                            {medicine.quantity}
                          </p>

                        </div>

                      </div>


                      <div className="flex items-center gap-3">

                        <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center shrink-0">

                          <Pill className="w-4 h-4" />

                        </div>

                        <div>

                          <p className="text-xs text-gray-400 font-medium">
                            Condition
                          </p>

                          <p className="text-sm font-bold text-gray-700">
                            {medicine.condition}
                          </p>

                        </div>

                      </div>


                      <div className="flex items-center gap-3">

                        <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">

                          <CalendarDays className="w-4 h-4" />

                        </div>

                        <div>

                          <p className="text-xs text-gray-400 font-medium">
                            Expiry
                          </p>

                          <p className="text-sm font-bold text-gray-700">
                            {new Date(
                              medicine.expiryDate
                            ).toLocaleDateString()}
                          </p>

                        </div>

                      </div>

                    </div>


                    {/* Description */}

                    <p className="text-sm text-gray-500 leading-relaxed mt-5 line-clamp-2">
                      {medicine.description}
                    </p>


                    {/* Buttons */}

                    <div className="mt-6 space-y-3">

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/donor/publish-medicine?edit=${medicine._id}`
                          )
                        }
                        className="w-full flex items-center justify-center gap-2 bg-indigo-500 text-white py-3 rounded-xl font-bold shadow-sm hover:bg-indigo-600 hover:shadow-md transition-all duration-300"
                      >

                        <Pencil className="w-4 h-4" />

                        Edit Medicine

                      </button>


                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(medicine._id)
                        }
                        className="w-full flex items-center justify-center gap-2 bg-rose-50 text-rose-600 border border-rose-100 py-3 rounded-xl font-bold hover:bg-rose-500 hover:text-white transition-all duration-300"
                      >

                        <Trash2 className="w-4 h-4" />

                        Delete Medicine

                      </button>

                    </div>

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

export default ManageMedicines;
