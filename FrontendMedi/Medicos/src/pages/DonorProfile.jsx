import { useEffect, useState } from "react";
import { Mail, Search, UserRound, Phone, MapPin, BriefcaseBusiness, CalendarDays, Map, Camera, FileImage, Save, RefreshCw, Sparkles} from "lucide-react";

import statesAndUTs from "../data/statesAndUTs";
import DashboardNav from "../components/DashboardNavbar";
import api from "../data/api";

const DonorProfile = () => {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [occupation, setOccupation] = useState("");
  const [dob, setDob] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [aadhar, setAadhar] = useState(null);
  const [profilePreview, setProfilePreview] = useState("");
  const [aadharPreview, setAadharPreview] = useState("");
  const [profileExists, setProfileExists] = useState(false);


  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setEmail(user.email);
    }

  }, []);


  const handleProfilePic = (e) => {

    const file = e.target.files[0];

    if (file) {
      setProfilePic(file);
      setProfilePreview(URL.createObjectURL(file));
    }

  };


  const handleAadhar = (e) => {

    const file = e.target.files[0];

    if (file) {
      setAadhar(file);
      setAadharPreview(URL.createObjectURL(file));
    }

  };


  const handleSearch = async () => {

    if (!email) {
      alert("Please enter email");
      return;
    }

    try {

      const response = await api.get(
        `/donor/profile/${email}`
      );

      const data = response.data;

      setName(data.name);
      setContact(data.contact);
      setAddress(data.address);
      setOccupation(data.occupation);
      setDob(data.dob.split("T")[0]);
      setCity(data.city);
      setState(data.state);

      if (data.profilePic) {
        setProfilePreview(data.profilePic);
      }

      if (data.aadharImage) {
        setAadharPreview(data.aadharImage);
      }

      setProfileExists(true);

      alert("Profile found!");

    } catch (error) {

      console.log(error);

      if (error.response?.status === 404) {

        setProfileExists(false);

        alert(
          "Profile not found. You can create a new profile."
        );

      } else {

        alert(
          error.response?.data?.message ||
          "Server error"
        );

      }

    }

  };


  const validateForm = () => {

    if (!email) {
      alert("Email is required");
      return false;
    }

    if (!name.trim()) {
      alert("Name is required");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(name.trim())) {
      alert("Name can contain only letters and spaces");
      return false;
    }

    if (!/^[0-9]{10}$/.test(contact)) {
      alert("Contact must be exactly 10 digits");
      return false;
    }

    if (!address.trim()) {
      alert("Address is required");
      return false;
    }

    if (!occupation) {
      alert("Please select occupation");
      return false;
    }

    if (!dob) {
      alert("Date of birth is required");
      return false;
    }

    if (new Date(dob) > new Date()) {
      alert("Date of birth cannot be in the future");
      return false;
    }

    if (!city.trim()) {
      alert("City is required");
      return false;
    }

    if (!/^[A-Za-z ]+$/.test(city.trim())) {
      alert("City can contain only letters and spaces");
      return false;
    }

    if (!state) {
      alert("Please select state");
      return false;
    }

    return true;

  };


  const handleSave = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {

      const formData = new FormData();

      formData.append("email", email);
      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("occupation", occupation);
      formData.append("dob", dob);
      formData.append("city", city);
      formData.append("state", state);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      if (aadhar) {
        formData.append("aadhar", aadhar);
      }

      const response = await api.post(
        "/donor/profile",
        formData
      );

      const data = response.data;

      alert("Donor profile saved successfully!");

      setProfileExists(true);

      console.log(data);

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Server error"
      );

    }

  };


  const handleUpdate = async () => {

    if (!validateForm()) {
      return;
    }

    try {

      const formData = new FormData();

      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("occupation", occupation);
      formData.append("dob", dob);
      formData.append("city", city);
      formData.append("state", state);

      if (profilePic) {
        formData.append("profilePic", profilePic);
      }

      if (aadhar) {
        formData.append("aadhar", aadhar);
      }

      await api.put(
        `/donor/profile/${email}`,
        formData
      );

      alert("Profile updated successfully!");

    } catch (error) {

      console.log(error);

      alert("Server error");

    }

  };


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50">

      <DashboardNav
        title="Donor Profile"
        dashboardPath="/donor/dashboard"
      />


      {/* Page Header */}

      <div className="max-w-5xl mx-auto px-6 md:px-8 pt-10">

        <div className="mb-8">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-100 mb-4">

            <Sparkles className="w-4 h-4 text-emerald-500" />

            <span className="text-sm font-bold tracking-wide text-emerald-600">
              DONOR PROFILE
            </span>

          </div>

          <h1 className="text-3xl md:text-4xl font-black text-gray-900">
            Complete Your{" "}
            <span className="bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
              Profile
            </span>
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Complete your profile to start donating medicines.
          </p>

        </div>


        {/* Main Form */}

        <form
          onSubmit={handleSave}
          className="bg-white rounded-3xl shadow-xl border border-white p-6 md:p-10 mb-12"
        >

          {/* Email + Fetch */}

          <div className="mb-7">

            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email Address
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative flex-1">

                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />

                <input
                  type="email"
                  value={email}
                  readOnly
                  placeholder="Enter your email"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50 text-gray-600 outline-none"
                />

              </div>

              <button
                type="button"
                onClick={handleSearch}
                className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 shadow-md shadow-emerald-100 transition-all duration-300"
              >

                <Search className="w-4 h-4" />

                Fetch

              </button>

            </div>

          </div>


          <div className="border-t border-gray-100 pt-7">


            {/* Name + Contact */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Name
                </label>

                <div className="relative">

                  <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50/50 outline-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
                  />

                </div>

              </div>


              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Contact
                </label>

                <div className="relative">

                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />

                  <input
                    type="tel"
                    value={contact}
                    maxLength="10"
                    onChange={(e) => {

                      const value = e.target.value;

                      if (/^[0-9]*$/.test(value)) {
                        setContact(value);
                      }

                    }}
                    placeholder="Enter 10 digit contact number"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50/50 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition"
                  />

                </div>

              </div>

            </div>


            {/* Address */}

            <div className="mb-6">

              <label className="block text-sm font-bold text-gray-700 mb-2">
                Address
              </label>

              <div className="relative">

                <MapPin className="absolute left-3.5 top-4 w-5 h-5 text-rose-500" />

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your address"
                  rows="3"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50/50 outline-none resize-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition"
                />

              </div>

            </div>


            {/* Occupation + DOB */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Occupation
                </label>

                <div className="relative">

                  <BriefcaseBusiness className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500 pointer-events-none" />

                  <select
                    value={occupation}
                    onChange={(e) => setOccupation(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50/50 outline-none appearance-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                  >

                    <option value="">
                      Select Occupation
                    </option>

                    <option value="Transporter">
                      Transporter
                    </option>

                    <option value="Businessman">
                      Businessman
                    </option>

                    <option value="Seller">
                      Seller
                    </option>

                  </select>

                </div>

              </div>


              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  Date of Birth
                </label>

                <div className="relative">

                  <CalendarDays className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500 pointer-events-none" />

                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50/50 outline-none focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                  />

                </div>

              </div>

            </div>


            {/* State + City */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-7">

              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  State / UT
                </label>

                <div className="relative">

                  <Map className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500 pointer-events-none" />

                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50/50 outline-none appearance-none focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
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

              </div>


              <div>

                <label className="block text-sm font-bold text-gray-700 mb-2">
                  City
                </label>

                <div className="relative">

                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />

                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Enter city"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3.5 pl-11 bg-gray-50/50 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition"
                  />

                </div>

              </div>

            </div>


            {/* Profile Picture */}

            <div className="mb-7 p-5 rounded-2xl bg-emerald-50/50 border border-emerald-100">

              <div className="flex items-center gap-2 mb-3">

                <Camera className="w-5 h-5 text-emerald-600" />

                <label className="font-bold text-gray-800">
                  Profile Picture
                </label>

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePic}
                className="w-full border border-emerald-100 bg-white rounded-xl p-2.5 text-sm"
              />

              {profilePreview && (

                <div className="mt-5">

                  <p className="text-sm font-semibold text-gray-500 mb-3">
                    Profile Preview
                  </p>

                  <img
                    src={profilePreview}
                    alt="Profile Preview"
                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-lg"
                  />

                </div>

              )}

            </div>


            {/* Aadhaar */}

            <div className="mb-8 p-5 rounded-2xl bg-indigo-50/50 border border-indigo-100">

              <div className="flex items-center gap-2 mb-3">

                <FileImage className="w-5 h-5 text-indigo-600" />

                <label className="font-bold text-gray-800">
                  Aadhaar Card Image
                </label>

              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleAadhar}
                className="w-full border border-indigo-100 bg-white rounded-xl p-2.5 text-sm"
              />

              {aadharPreview && (

                <div className="mt-5">

                  <p className="text-sm font-semibold text-gray-500 mb-3">
                    Aadhaar Preview
                  </p>

                  <img
                    src={aadharPreview}
                    alt="Aadhaar Preview"
                    className="max-w-md max-h-64 object-contain rounded-xl border-4 border-white shadow-md"
                  />

                </div>

              )}

            </div>


            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-3">

              {!profileExists ? (

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-teal-500 text-white px-8 py-3.5 rounded-xl font-bold shadow-md shadow-emerald-100 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >

                  <Save className="w-4 h-4" />

                  Save Profile

                </button>

              ) : (

                <button
                  type="button"
                  onClick={handleUpdate}
                  className="flex items-center justify-center gap-2 bg-linear-to-r from-indigo-500 to-purple-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-md shadow-indigo-100 hover:from-indigo-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >

                  <RefreshCw className="w-4 h-4" />

                  Update Profile

                </button>

              )}

            </div>

          </div>

        </form>

      </div>

    </div>
  );
};

export default DonorProfile;