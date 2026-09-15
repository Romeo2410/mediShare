import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ShieldCheck, Mail, Sparkles} from "lucide-react";

import api from "../data/api";

const AdminLogin = () => {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    const fetchAdminEmail = async () => {

      try {

        const response = await api.get("/admin/email");

        setEmail(response.data.email);

      } catch (error) {

        console.log(error);

      }

    };

    fetchAdminEmail();

  }, []);

  const handleLogin = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await api.post("/admin/login", {
        email,
        password
      });

      localStorage.setItem(
        "adminToken",
        response.data.token
      );

      alert("Admin login successful!");

      navigate("/admin/users");

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Admin login failed"
      );

    } finally {

      setLoading(false);

    }

  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-5 py-10">

      {/* Main Card */}

      <div className="w-full max-w-md">

        {/* Brand */}

        <div className="text-center mb-6">

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100">

            <Sparkles className="w-3.5 h-3.5 text-indigo-500" />

            <span className="text-xs font-bold text-indigo-600">
              MEDISHARE ADMIN
            </span>

          </div>

        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-indigo-100/40 p-7 md:p-8">

          {/* Header */}

          <div className="text-center mb-8">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-linear-to-br from-emerald-500 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-emerald-200/50">

              <ShieldCheck className="w-9 h-9" />

            </div>

            <h1 className="text-3xl font-black text-gray-900 mt-5">
              Admin Login
            </h1>

            <p className="text-sm text-gray-500 mt-2">
              Secure access to manage MediShare users
            </p>

          </div>

          {/* Form */}

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="mb-5">

              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                <Mail className="w-4 h-4 text-emerald-500" />

                Admin Email

              </label>

              <input
                type="email"
                value={email}
                readOnly
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 outline-none cursor-not-allowed"
              />

            </div>

            {/* Password */}

            <div className="mb-6">

              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">

                <Lock className="w-4 h-4 text-indigo-500" />

                Password

              </label>

              <div className="relative">

                <Lock
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  size={19}
                />

                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                  className="w-full pl-11 pr-12 py-3 rounded-xl border border-gray-200 bg-white text-gray-800 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 transition"
                >

                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}

                </button>

              </div>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-linear-to-r from-emerald-500 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-md shadow-emerald-200/40 hover:from-emerald-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >

              <ShieldCheck className="w-5 h-5" />

              {loading ? "Logging in..." : "Admin Login"}

            </button>

          </form>

          {/* Security Note */}

          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-400">

            <Lock className="w-3.5 h-3.5" />

            <span>Authorized administrator access only</span>

          </div>

        </div>

        {/* Footer */}

        <p className="text-center text-xs text-gray-400 mt-5">
          MediShare • Secure Administration
        </p>

      </div>

    </div>
  );
};

export default AdminLogin;