import { useEffect, useState } from "react";
import { Mail, Search, UserRound, Phone, MapPin, UsersRound, HeartPulse, FileImage, Save, RefreshCw, Sparkles} from "lucide-react";

import statesAndUTs from "../data/statesAndUTs";
import DashboardNav from "../components/DashboardNavbar";
import api from "../data/api";

const NeedyProfile = () => {

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    state: "",
    city: "",
    userType: "",
    healthProblems: ""
  });

  const [idProof, setIdProof] = useState(null);
  const [idProofPreview, setIdProofPreview] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [profileExists, setProfileExists] = useState(false);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setEmail(user.email);
    }

    setIsLoading(false);

  }, []);


  const handleFetchProfile = async () => {

    if (!email) {
      alert("Email not found");
      return;
    }

    try {

      const response = await api.get(
        `/needy/profile/${email}`
      );

      const data = response.data;

      setFormData({
        name: data.name,
        contact: data.contact,
        address: data.address,
        state: data.state,
        city: data.city,
        userType: data.userType,
        healthProblems: data.healthProblems
      });

      setIdProofPreview(data.idProof);
      setProfileExists(true);

      alert("Profile fetched successfully");

    } catch (error) {

      console.log(error);

      if (error.response?.status === 404) {
        alert("Profile not found");
        setProfileExists(false);
        return;
      }

      alert("Failed to fetch profile");

    }
  };


  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });

  };


  const handleImageChange = (e) => {

    const file = e.target.files[0];

    if (!file) return;

    setIdProof(file);
    setIdProofPreview(URL.createObjectURL(file));

  };


  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    if (!/^[A-Za-z\s]+$/.test(formData.name)) {
      alert("Name should contain only letters");
      return;
    }

    if (!/^[0-9]{10}$/.test(formData.contact)) {
      alert("Contact number must be exactly 10 digits");
      return;
    }

    if (!formData.address.trim()) {
      alert("Address is required");
      return;
    }

    if (!formData.state) {
      alert("Please select a state");
      return;
    }

    if (!formData.city.trim()) {
      alert("City is required");
      return;
    }

    if (!formData.userType) {
      alert("Please select user type");
      return;
    }

    if (!formData.healthProblems.trim()) {
      alert("Health problems are required");
      return;
    }

    if (!idProof && !idProofPreview) {
      alert("Please upload ID proof");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      alert("Please login first");
      return;
    }

    try {

      setIsSubmitting(true);

      const data = new FormData();

      data.append("email", user.email);
      data.append("name", formData.name);
      data.append("contact", formData.contact);
      data.append("address", formData.address);
      data.append("state", formData.state);
      data.append("city", formData.city);
      data.append("userType", formData.userType);
      data.append("healthProblems", formData.healthProblems);

      if (idProof) {
        data.append("idProof", idProof);
      }

      const response = await api.post(
        "/needy/profile",
        data
      );

      alert(response.data.message);

      setIdProof(null);

    } catch (error) {

      console.log(error);
      alert("Failed to save profile");

    } finally {

      setIsSubmitting(false);

    }
  };


  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center">

        <div className="bg-white rounded-3xl shadow-xl p-8 text-center">

          <div className="w-12 h-12 mx-auto rounded-full border-4 border-emerald-100 border-t-emerald-500 animate-spin"></div>

          <p className="text-gray-500 font-medium mt-4">
            Loading profile...
          </p>

        </div>

      </div>
    );
  }


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="Needy Profile"
        dashboardPath="/needy/dashboard"
      />


      {/* Decorative Background */}
      <div className="relative overflow-hidden">

        <div className="absolute -top-24 -right-24 w-72 h-72 bg-violet-200/30 rounded-full blur-3xl"></div>

        <div className="absolute top-40 -left-24 w-72 h-72 bg-cyan-200/20 rounded-full blur-3xl"></div>


        <div className="relative max-w-4xl mx-auto px-6 md:px-8 py-10">

          {/* Header */}
          <div className="mb-8">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-50 border border-violet-100 mb-4">

              <Sparkles className="w-4 h-4 text-violet-500" />

              <span className="text-sm font-bold text-violet-600">
                NEEDY PROFILE
              </span>

            </div>

            <h1 className="text-3xl md:text-4xl font-black text-gray-900">
              Complete Your{" "}
              <span className="bg-linear-to-r from-violet-600 to-cyan-600 bg-clip-text text-transparent">
                Profile
              </span>
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Provide your details so donors can better understand
              your medicine requirements.
            </p>

          </div>


          {/* Form Card */}
          <div className="bg-white/90 backdrop-blur-md border border-white rounded-3xl shadow-xl p-6 md:p-10">

            <form onSubmit={handleSubmit} className="space-y-7">


              {/* Email */}
              <div>

                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                  <Mail className="w-4 h-4 text-violet-500" />

                  Email

                </label>

                <div className="flex flex-col sm:flex-row gap-3">

                  <div className="relative flex-1">

                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-12 pr-4 py-3.5 text-gray-600 outline-none"
                    />

                  </div>

                  <button
                    type="button"
                    onClick={handleFetchProfile}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-violet-500 text-white font-bold shadow-sm hover:bg-violet-600 hover:shadow-md transition-all duration-300"
                  >
                    <Search className="w-4 h-4" />
                    Fetch Profile
                  </button>

                </div>

              </div>


              {/* Name + Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Name */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <UserRound className="w-4 h-4 text-violet-500" />

                    Name

                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100 transition"
                  />

                </div>


                {/* Contact */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <Phone className="w-4 h-4 text-cyan-500" />

                    Contact

                  </label>

                  <input
                    type="tel"
                    name="contact"
                    value={formData.contact}
                    onChange={handleChange}
                    maxLength="10"
                    inputMode="numeric"
                    placeholder="Enter contact number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition"
                  />

                </div>

              </div>


              {/* Address */}
              <div>

                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                  <MapPin className="w-4 h-4 text-rose-500" />

                  Address

                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete address"
                  rows="3"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition resize-none"
                />

              </div>


              {/* State + City */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* State */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <MapPin className="w-4 h-4 text-cyan-500" />

                    State / UT

                  </label>

                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 bg-white outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 transition"
                  >

                    <option value="">
                      Select State / UT
                    </option>

                    {statesAndUTs.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}

                  </select>

                </div>


                {/* City */}
                <div>

                  <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                    <MapPin className="w-4 h-4 text-indigo-500" />

                    City

                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition"
                  />

                </div>

              </div>


              {/* User Type */}
              <div>

                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">

                  <UsersRound className="w-4 h-4 text-violet-500" />

                  User Type

                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <label
                    className={`
                      flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition
                      ${
                        formData.userType === "NGO"
                          ? "border-violet-300 bg-violet-50"
                          : "border-gray-200 bg-white hover:border-violet-200"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="userType"
                      value="NGO"
                      checked={formData.userType === "NGO"}
                      onChange={handleChange}
                      className="accent-violet-600"
                    />

                    <div>
                      <p className="font-bold text-gray-800">
                        NGO
                      </p>

                      <p className="text-sm text-gray-500">
                        Requesting on behalf of an organization
                      </p>
                    </div>

                  </label>


                  <label
                    className={`
                      flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition
                      ${
                        formData.userType === "Self"
                          ? "border-cyan-300 bg-cyan-50"
                          : "border-gray-200 bg-white hover:border-cyan-200"
                      }
                    `}
                  >

                    <input
                      type="radio"
                      name="userType"
                      value="Self"
                      checked={formData.userType === "Self"}
                      onChange={handleChange}
                      className="accent-cyan-600"
                    />

                    <div>
                      <p className="font-bold text-gray-800">
                        Self
                      </p>

                      <p className="text-sm text-gray-500">
                        Requesting medicine for yourself
                      </p>
                    </div>

                  </label>

                </div>

              </div>


              {/* Health Problems */}
              <div>

                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                  <HeartPulse className="w-4 h-4 text-rose-500" />

                  Health Problems

                </label>

                <textarea
                  name="healthProblems"
                  value={formData.healthProblems}
                  onChange={handleChange}
                  placeholder="Describe your health problems"
                  rows="4"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-100 transition resize-none"
                />

              </div>


              {/* ID Proof */}
              <div>

                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-3">

                  <FileImage className="w-4 h-4 text-amber-500" />

                  ID Proof

                </label>

                <label className="block border-2 border-dashed border-amber-200 bg-amber-50/40 rounded-2xl p-6 cursor-pointer hover:border-amber-300 hover:bg-amber-50 transition">

                  <div className="flex flex-col items-center justify-center text-center">

                    <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-3">

                      <FileImage className="w-7 h-7" />

                    </div>

                    <p className="font-bold text-gray-700">
                      Upload ID Proof
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Click here to select an image
                    </p>

                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />

                </label>


                {idProofPreview && (
                  <div className="mt-4">

                    <p className="text-sm font-semibold text-gray-600 mb-2">
                      ID Proof Preview
                    </p>

                    <img
                      src={idProofPreview}
                      alt="ID proof preview"
                      className="w-52 h-36 object-cover rounded-2xl border border-gray-200 shadow-sm"
                    />

                  </div>
                )}

              </div>


              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-violet-500 to-cyan-500 text-white py-3.5 rounded-xl font-bold shadow-md shadow-violet-200 hover:from-violet-600 hover:to-cyan-600 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >

                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />

                    {profileExists
                      ? "Updating..."
                      : "Saving..."
                    }
                  </>
                ) : (
                  <>
                    {profileExists ? (
                      <RefreshCw className="w-5 h-5" />
                    ) : (
                      <Save className="w-5 h-5" />
                    )}

                    {profileExists
                      ? "Update Profile"
                      : "Save Profile"
                    }
                  </>
                )}

              </button>

            </form>

          </div>

        </div>

      </div>

    </div>
  );
};

export default NeedyProfile;