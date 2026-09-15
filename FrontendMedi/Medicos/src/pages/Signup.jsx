import { useState } from "react";
import { Link } from "react-router-dom";
import { Pill, UserRound, Mail, Lock, Users, Eye, EyeOff, Sparkles, ShieldCheck} from "lucide-react";
import api from "../data/api";

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usertype, setUsertype] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/signup",
        {
          name,
          email,
          password,
          usertype
        }
      );

      alert("Signup successful!");

      setName("");
      setEmail("");
      setPassword("");
      setUsertype("");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Server error"
      );

    }

  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-4 py-8">

      {/* Decorative Background */}

      <div className="fixed -top-32 -right-32 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>

      <div className="fixed -bottom-32 -left-32 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>


      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2 border border-white">

        {/* ================= LEFT SIDE ================= */}

        <div className="hidden md:flex relative overflow-hidden bg-linear-to-br from-emerald-600 via-teal-600 to-indigo-700 text-white p-12 flex-col justify-center">

          {/* Decorative circles */}

          <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"></div>

          <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/10 rounded-full"></div>


          <div className="relative">

            {/* Logo Icon */}

            <div className="w-16 h-16 bg-white/15 border border-white/20 rounded-2xl flex items-center justify-center mb-8 shadow-lg">

              <Pill className="w-9 h-9" />

            </div>


            {/* Small Label */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-5">

              <Sparkles className="w-4 h-4 text-emerald-200" />

              <span className="text-sm font-semibold">
                Join the MediShare Community
              </span>

            </div>


            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-5">

              Create Your
              <br />

              <span className="text-emerald-100">
                Account
              </span>

            </h1>


            <p className="text-emerald-50/90 text-lg leading-relaxed mb-9 max-w-md">

              Be part of a community that helps connect
              unused medicines with people who genuinely need them.

            </p>


            {/* Benefits */}

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 bg-white/15 border border-white/10 rounded-full flex items-center justify-center shrink-0">

                  <Users className="w-5 h-5" />

                </div>

                <div>

                  <p className="font-semibold">
                    Connect with the community
                  </p>

                  <p className="text-sm text-emerald-100/80">
                    Be part of something meaningful
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-11 h-11 bg-white/15 border border-white/10 rounded-full flex items-center justify-center shrink-0">

                  <ShieldCheck className="w-5 h-5" />

                </div>

                <div>

                  <p className="font-semibold">
                    Share medicines responsibly
                  </p>

                  <p className="text-sm text-emerald-100/80">
                    Help make a positive difference
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= SIGNUP FORM ================= */}

        <div className="p-7 md:p-10 lg:p-12">

          <div className="mb-7">

            {/* Mobile Logo */}

            <div className="md:hidden w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-indigo-600 text-white flex items-center justify-center mb-5 shadow-md">

              <Pill className="w-6 h-6" />

            </div>


            <p className="text-sm font-bold tracking-widest text-emerald-600 mb-2">
              GET STARTED
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Create Account
            </h2>

            <p className="text-gray-500">
              Create your MediShare account to get started.
            </p>

          </div>


          <form onSubmit={handleSignup} className="space-y-4">

            {/* Name */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <div className="relative">

                <UserRound className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />

                <input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
                />

              </div>

            </div>


            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-teal-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none bg-gray-50/50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-100 transition"
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-11 outline-none bg-gray-50/50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                >

                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}

                </button>

              </div>

            </div>


            {/* User Type */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Account Type
              </label>

              <div className="relative">

                <Users className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-rose-500 pointer-events-none" />

                <select
                  value={usertype}
                  onChange={(e) => setUsertype(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 bg-gray-50/50 outline-none focus:bg-white focus:border-rose-500 focus:ring-4 focus:ring-rose-100 transition"
                >

                  <option value="">
                    Select account type
                  </option>

                  <option value="Donor">
                    Donor
                  </option>

                  <option value="Needy">
                    Needy
                  </option>

                </select>

              </div>

            </div>


            {/* Button */}

            <button
              type="submit"
              className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-bold shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Create Account
            </button>

          </form>


          {/* Login */}

          <p className="text-center text-sm text-gray-500 mt-7">

            Already have an account?{" "}

            <Link
              to="/login"
              className="text-emerald-600 font-bold hover:text-indigo-600 transition"
            >
              Login
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Signup;