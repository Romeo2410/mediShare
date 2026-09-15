import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Pill, Mail, Lock, ShieldCheck, HeartHandshake, Eye, EyeOff, Sparkles} from "lucide-react";
import api from "../data/api";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {

    if (location.state?.loggedOut) {

      window.history.replaceState(null, "", "/");
      window.history.pushState(null, "", "/login");

      const handleBack = () => {
        navigate("/", { replace: true });
      };

      window.addEventListener("popstate", handleBack);

      return () => {
        window.removeEventListener("popstate", handleBack);
      };

    }

  }, [location, navigate]);


  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const response = await api.post(
        "/login",
        {
          email,
          password
        }
      );

      const data = response.data;

      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);

      alert("Login successful!");

      if (data.user.usertype === "Donor") {
        navigate("/donor/dashboard");
      } else {
        navigate("/needy/dashboard");
      }

    } catch (error) {

      console.log(error);

      alert(
        error.response?.data?.message ||
        "Server error"
      );

    }

  };


  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-4 py-10">

      {/* Decorative Background */}

      <div className="fixed -top-32 -left-32 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>

      <div className="fixed -bottom-32 -right-32 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>


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
                Welcome to MediShare
              </span>

            </div>


            <h1 className="text-4xl lg:text-5xl font-black leading-tight mb-5">

              Welcome
              <br />

              <span className="text-emerald-100">
                Back!
              </span>

            </h1>


            <p className="text-emerald-50/90 text-lg leading-relaxed mb-9 max-w-md">

              Continue helping connect unused medicines
              with people who need them.

            </p>


            {/* Benefits */}

            <div className="space-y-5">

              <div className="flex items-center gap-4">

                <div className="w-11 h-11 bg-white/15 border border-white/10 rounded-full flex items-center justify-center shrink-0">

                  <HeartHandshake className="w-5 h-5" />

                </div>

                <div>

                  <p className="font-semibold">
                    Make a meaningful difference
                  </p>

                  <p className="text-sm text-emerald-100/80">
                    Help medicines reach those in need
                  </p>

                </div>

              </div>


              <div className="flex items-center gap-4">

                <div className="w-11 h-11 bg-white/15 border border-white/10 rounded-full flex items-center justify-center shrink-0">

                  <ShieldCheck className="w-5 h-5" />

                </div>

                <div>

                  <p className="font-semibold">
                    Safe and trusted community
                  </p>

                  <p className="text-sm text-emerald-100/80">
                    Connecting people with care
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* ================= LOGIN FORM ================= */}

        <div className="p-8 md:p-12 lg:p-14">

          <div className="mb-8">

            <div className="md:hidden w-12 h-12 rounded-xl bg-linear-to-br from-emerald-500 to-indigo-600 text-white flex items-center justify-center mb-5 shadow-md">

              <Pill className="w-6 h-6" />

            </div>


            <p className="text-sm font-bold tracking-widest text-emerald-600 mb-2">
              ACCOUNT LOGIN
            </p>

            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3">
              Welcome Back
            </h2>

            <p className="text-gray-500">
              Login to continue to your MediShare account.
            </p>

          </div>


          <form onSubmit={handleLogin} className="space-y-5">

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>

              <div className="relative">

                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl py-3.5 pl-11 pr-4 outline-none bg-gray-50/50 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition"
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
                  placeholder="Enter your password"
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


            {/* Login Button */}

            <button
              type="submit"
              className="w-full bg-linear-to-r from-emerald-500 to-teal-500 text-white py-3.5 rounded-xl font-bold shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Login
            </button>

          </form>


          {/* Signup */}

          <p className="text-center text-sm text-gray-500 mt-8">

            Don't have an account?{" "}

            <Link
              to="/signup"
              className="text-emerald-600 font-bold hover:text-indigo-600 transition"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
};

export default Login;