import { useState, useEffect } from "react";
import DashboardNav from "../components/DashboardNavbar";
import { useSearchParams } from "react-router-dom";
import { Upload, Image as ImageIcon, Pill, CalendarDays, MapPin, FileText, Package, Sparkles} from "lucide-react";
import statesAndUTs from "../data/statesAndUTs";
import api from "../data/api";

const PublishMedicine = () => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [medicineName, setMedicineName] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!editId) {
      return;
    }

    const fetchMedicine = async () => {
      try {
        const response = await api.get(
          `/medicine/edit/${editId}`
        );

        const data = response.data;

        setMedicineName(data.medicineName);
        setCategory(data.category);
        setQuantity(data.quantity);
        setExpiryDate(data.expiryDate.split("T")[0]);
        setCondition(data.condition);
        setDescription(data.description);
        setState(data.state);
        setCity(data.city);
        setImagePreview(data.image);

      } catch (error) {
        console.log(error);
        alert("Failed to fetch medicine");
      }
    };

    fetchMedicine();
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!medicineName.trim()) {
      alert("Please enter medicine name");
      return;
    }

    if (!category) {
      alert("Please select a category");
      return;
    }

    if (!quantity || quantity <= 0) {
      alert("Please enter a valid quantity");
      return;
    }

    if (!expiryDate) {
      alert("Please select expiry date");
      return;
    }

    const today = new Date();
    const expiry = new Date(expiryDate);

    if (expiry <= today) {
      alert("Medicine must not be expired");
      return;
    }

    if (!condition) {
      alert("Please select medicine condition");
      return;
    }

    if (!description.trim()) {
      alert("Please enter a description");
      return;
    }

    if (!image && !editId) {
      alert("Please upload medicine image");
      return;
    }

    if (!state) {
      alert("Please select state");
      return;
    }

    if (!city.trim()) {
      alert("Please enter city");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    // Check donor profile only when publishing a new medicine
    if (!editId) {

      try {

        await api.get(`/donor/profile/${user.email}`);

      } catch (error) {

        if (error.response?.status === 404) {
          alert("Please create your donor profile first.");
          return;
        }

        alert("Failed to check donor profile");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();

      formData.append("medicineName", medicineName);
      formData.append("category", category);
      formData.append("quantity", quantity);
      formData.append("expiryDate", expiryDate);
      formData.append("condition", condition);
      formData.append("description", description);
      formData.append("state", state);
      formData.append("city", city);
      formData.append("donorEmail", user.email);

      if (image) {
        formData.append("image", image);
      }

      const response = editId
        ? await api.put(`/medicine/${editId}`, formData)
        : await api.post("/medicine", formData);

      const data = response.data;

      alert(
        editId
          ? "Medicine updated successfully!"
          : "Medicine published successfully!"
      );

      setIsSubmitting(false);

      console.log(data);

    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Server error"
      );

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title={editId ? "Edit Medicine" : "Publish Medicine"}
        dashboardPath="/donor/dashboard"
      />

      <div className="relative overflow-hidden">

        {/* Background Decorations */}

        <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>

        <div className="absolute top-80 -left-24 w-72 h-72 bg-indigo-200/20 rounded-full blur-3xl"></div>

        <div className="relative py-10 px-4 md:px-6">

          <div className="max-w-4xl mx-auto">

            {/* Header */}

            <div className="text-center mb-8">

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">

                <Sparkles className="w-4 h-4 text-emerald-500" />

                <span className="text-sm font-bold text-emerald-600">
                  MEDICINE DONATION
                </span>

              </div>

              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">

                {editId
                  ? "Edit Medicine"
                  : "Publish Medicine"}

              </h1>

              <p className="text-gray-500 max-w-xl mx-auto">
                {editId
                  ? "Update the details of your published medicine."
                  : "Share a medicine you no longer need with someone who does."}
              </p>

            </div>


            {/* Form Card */}

            <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl shadow-xl p-6 md:p-10">

              <form
                onSubmit={handleSubmit}
                className="space-y-7"
              >

                {/* Medicine Name + Category */}

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                      <Pill className="w-4 h-4 text-emerald-500" />

                      Medicine Name

                    </label>

                    <input
                      type="text"
                      placeholder="Enter medicine name"
                      value={medicineName}
                      onChange={(e) =>
                        setMedicineName(e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    />

                  </div>


                  <div>

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                      <Package className="w-4 h-4 text-teal-500" />

                      Category

                    </label>

                    <select
                      value={category}
                      onChange={(e) =>
                        setCategory(e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                    >

                      <option value="">
                        Select category
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

                  </div>

                </div>


                {/* Quantity + Expiry */}

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                      <Package className="w-4 h-4 text-indigo-500" />

                      Quantity

                    </label>

                    <input
                      type="number"
                      min="1"
                      placeholder="Enter quantity"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>


                  <div>

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                      <CalendarDays className="w-4 h-4 text-rose-500" />

                      Expiry Date

                    </label>

                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      value={expiryDate}
                      onChange={(e) =>
                        setExpiryDate(e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none transition focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                    />

                  </div>

                </div>


                {/* Condition */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <Pill className="w-4 h-4 text-emerald-500" />

                    Medicine Condition

                  </label>

                  <select
                    value={condition}
                    onChange={(e) =>
                      setCondition(e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                  >

                    <option value="">
                      Select condition
                    </option>

                    <option value="Sealed">
                      Sealed / Unopened
                    </option>

                    <option value="Opened">
                      Opened
                    </option>

                  </select>

                </div>


                {/* Description */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <FileText className="w-4 h-4 text-indigo-500" />

                    Description

                  </label>

                  <textarea
                    rows="4"
                    placeholder="Add any useful information about the medicine..."
                    value={description}
                    onChange={(e) =>
                      setDescription(e.target.value)
                    }
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none resize-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                  />

                </div>


                {/* Medicine Image */}

                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <ImageIcon className="w-4 h-4 text-teal-500" />

                    Medicine Image

                  </label>

                  <label className="border-2 border-dashed border-gray-200 rounded-2xl p-7 flex flex-col items-center justify-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/40 transition">

                    {imagePreview ? (

                      <img
                        src={imagePreview}
                        alt="Medicine Preview"
                        className="w-44 h-44 object-cover rounded-2xl mb-4 shadow-md"
                      />

                    ) : (

                      <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-4">

                        <ImageIcon className="w-8 h-8" />

                      </div>

                    )}

                    <div className="flex items-center gap-2 text-emerald-600 font-bold">

                      <Upload className="w-5 h-5" />

                      {imagePreview
                        ? "Change Image"
                        : "Upload Image"}

                    </div>

                    <p className="text-sm text-gray-400 mt-2">
                      PNG, JPG or JPEG
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {

                        const selectedImage =
                          e.target.files[0];

                        if (selectedImage) {

                          setImage(selectedImage);

                          setImagePreview(
                            URL.createObjectURL(
                              selectedImage
                            )
                          );

                        }

                      }}
                    />

                  </label>

                </div>


                {/* State + City */}

                <div className="grid md:grid-cols-2 gap-6">

                  <div>

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                      <MapPin className="w-4 h-4 text-emerald-500" />

                      State

                    </label>

                    <select
                      value={state}
                      onChange={(e) =>
                        setState(e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                    >

                      <option value="">
                        Select state
                      </option>

                      {statesAndUTs.map((stateName) => (

                        <option
                          key={stateName}
                          value={stateName}
                        >
                          {stateName}
                        </option>

                      ))}

                    </select>

                  </div>


                  <div>

                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                      <MapPin className="w-4 h-4 text-indigo-500" />

                      City

                    </label>

                    <input
                      type="text"
                      placeholder="Enter city"
                      value={city}
                      onChange={(e) =>
                        setCity(e.target.value)
                      }
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                    />

                  </div>

                </div>


                {/* Notice */}

                <div className="bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-5">

                  <div className="flex gap-3">

                    <div className="w-9 h-9 shrink-0 rounded-xl bg-white text-emerald-600 flex items-center justify-center shadow-sm">

                      <Pill className="w-5 h-5" />

                    </div>

                    <div>

                      <p className="font-bold text-emerald-800 mb-1">
                        Important Notice
                      </p>

                      <p className="text-sm text-emerald-700 leading-relaxed">
                        Please publish only medicines that are
                        unexpired, properly stored, and appropriate
                        to share.
                      </p>

                    </div>

                  </div>

                </div>


                {/* Submit Button */}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-bold shadow-md shadow-emerald-200/50 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >

                  {isSubmitting
                    ? "Saving..."
                    : editId
                    ? "Update Medicine"
                    : "Publish Medicine"}

                </button>

              </form>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default PublishMedicine;