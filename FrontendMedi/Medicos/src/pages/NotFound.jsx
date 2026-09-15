import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft, ShieldAlert, Sparkles} from "lucide-react";

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex items-center justify-center px-5 py-10">

      <div className="max-w-2xl w-full text-center">

        {/* Small Badge */}

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 mb-5">

          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />

          <span className="text-xs font-bold text-indigo-600">
            MEDISHARE
          </span>

        </div>

        {/* 404 Illustration */}

        <div className="relative mb-6">

          <div className="text-[130px] sm:text-[170px] md:text-[200px] font-black leading-none bg-linear-to-r from-emerald-100 via-teal-100 to-indigo-100 bg-clip-text text-transparent select-none">

            404

          </div>

          <div className="absolute inset-0 flex items-center justify-center">

            <div className="w-24 h-24 md:w-28 md:h-28 rounded-3xl bg-white shadow-xl shadow-indigo-100/50 flex items-center justify-center border border-gray-100">

              <ShieldAlert
                size={52}
                className="text-indigo-500"
              />

            </div>

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4">

          Page Not Found

        </h1>

        {/* Description */}

        <p className="text-gray-500 text-base md:text-lg max-w-lg mx-auto leading-relaxed mb-8">

          Oops! The page you're looking for doesn't exist,
          may have been moved, or the URL might be incorrect.

        </p>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 shadow-sm"
          >

            <ArrowLeft className="w-4 h-4" />

            Go Back

          </button>

          <button
            onClick={() => navigate("/")}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-emerald-500 to-indigo-600 text-white font-bold shadow-md shadow-emerald-200/40 hover:from-emerald-600 hover:to-indigo-700 hover:shadow-lg transition-all duration-300"
          >

            <Home className="w-4 h-4" />

            Back to Home

          </button>

        </div>

        {/* Branding */}

        <div className="mt-12">

          <div className="inline-flex items-center gap-2">

            <div className="w-7 h-7 rounded-lg bg-linear-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center">

              <ShieldAlert className="w-4 h-4" />

            </div>

            <span className="font-black bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
              MediShare
            </span>

          </div>

          <p className="text-xs text-gray-400 mt-2">
            Connecting medicines with those who need them.
          </p>

        </div>

      </div>

    </div>
  );
};

export default NotFound;