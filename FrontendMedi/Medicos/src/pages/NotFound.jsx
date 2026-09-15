import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, HeartPulse, Plus,} from "lucide-react";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 via-white to-indigo-50 flex flex-col overflow-hidden relative">

      {/* Decorative Background */}
      <div className="fixed -top-32 -right-32 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl" />
      <div className="fixed -bottom-32 -left-32 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl" />
      <div className="fixed top-1/2 right-1/4 w-64 h-64 bg-rose-100/30 rounded-full blur-3xl" />

      {/* Header */}
      <header className="relative z-10 px-6 sm:px-10 lg:px-16 py-5">
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="w-11 h-11 rounded-xl bg-linear-to-br from-emerald-500 to-teal-500 text-white flex items-center justify-center shadow-md">
              <HeartPulse className="w-6 h-6" />
            </div>

            <div className="text-left">
              <p className="font-black text-lg text-gray-900 tracking-tight">
                MediShare
              </p>

              <p className="text-xs text-gray-400 uppercase tracking-widest">
                Healthcare Network
              </p>
            </div>
          </button>

          <div className="hidden sm:flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            <span className="text-xs text-gray-400">
              Healthcare for everyone
            </span>
          </div>

        </div>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center">

        <div className="max-w-7xl w-full mx-auto px-6 sm:px-10 lg:px-16 py-6">

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

            {/* LEFT SIDE */}
            <div>

              {/* Error Label */}
              <div className="flex items-center gap-3 mb-5">

                <span className="text-xs font-bold text-rose-500 uppercase tracking-widest">
                  Error
                </span>

                <span className="w-12 h-px bg-gray-200" />

                <span className="text-xs font-mono text-gray-400">
                  404
                </span>

              </div>

              {/* 404 */}
              <div className="relative">

                <h1 className="text-8xl sm:text-9xl lg:text-9xl font-black tracking-tighter leading-none text-gray-900">

                  4
                  <span className="text-emerald-500">
                    0
                  </span>
                  4

                </h1>

                {/* Medical Plus */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2">

                  <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center rotate-12 shadow-lg shadow-rose-200">

                    <Plus className="w-6 h-6" />

                  </div>

                </div>

              </div>

              {/* Accent Line */}
              <div className="w-32 h-1 bg-linear-to-r from-emerald-500 to-teal-500 rounded-full mt-7" />

              {/* Heading */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mt-6 leading-tight max-w-xl text-gray-900">

                The page you're looking for
                <span className="text-gray-400">
                  {" "}isn't here.
                </span>

              </h2>

              {/* Description */}
              <p className="text-gray-500 mt-4 max-w-md leading-relaxed">

                The address may be incorrect or the page may have
                been moved. Let's get you back to MediShare.

              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-6">

                {/* Go Back */}
                <button
                  onClick={() => navigate(-1)}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-md shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >

                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />

                  Go Back

                </button>

                {/* Home */}
                <button
                  onClick={() => navigate("/")}
                  className="group flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-gray-200 bg-white text-gray-700 font-bold shadow-sm hover:border-indigo-300 hover:text-indigo-600 hover:shadow-md transition-all duration-300"
                >

                  MediShare Home

                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                </button>

              </div>

            </div>

            {/* RIGHT SIDE */}
            <div className="relative h-80 sm:h-96 lg:h-112 flex items-center justify-center">

              {/* Medical Route */}
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-72 lg:h-72">

                {/* Outer Rings */}
                <div className="absolute inset-0 rounded-full border-2 border-emerald-200" />

                <div className="absolute inset-6 rounded-full border border-teal-200" />

                <div className="absolute inset-12 rounded-full border border-indigo-100" />

                {/* Medical Cross */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="relative">

                    {/* Vertical */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-20 h-56 sm:h-64 lg:h-72 rounded-2xl bg-linear-to-b from-emerald-500 via-teal-500 to-indigo-500 shadow-2xl shadow-emerald-200" />

                    {/* Horizontal */}
                    <div className="absolute top-1/2 -translate-y-1/2 h-20 w-56 sm:w-64 lg:w-72 rounded-2xl bg-linear-to-r from-emerald-500 via-teal-500 to-indigo-500 shadow-2xl shadow-emerald-200" />

                  </div>

                </div>

                {/* Centre Circle */}
                <div className="absolute inset-0 flex items-center justify-center">

                  <div className="w-24 h-24 rounded-full bg-white border-2 border-rose-100 shadow-xl flex items-center justify-center">

                    <HeartPulse className="w-10 h-10 text-rose-500" />

                  </div>

                </div>

              </div>

              {/* Route Line */}
              <div className="absolute left-0 top-1/2 w-28 sm:w-40 lg:w-48">

                <div className="border-t-2 border-dashed border-teal-300" />

                <div className="absolute -top-1.5 right-0 w-3 h-3 rounded-full bg-rose-500 shadow-sm" />

              </div>

              {/* Route Badge */}
              <div className="absolute top-4 right-4 sm:right-10 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">

                <span className="text-xs font-mono font-semibold text-gray-400">
                  ROUTE / 404
                </span>

              </div>

              {/* MediShare Badge */}
              <div className="absolute bottom-3 left-4 sm:left-8 flex items-center gap-3">

                <div className="w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center">

                  <HeartPulse className="w-4 h-4 text-emerald-500" />

                </div>

                <div>

                  <p className="text-xs uppercase tracking-widest text-gray-400">
                    MediShare
                  </p>

                  <p className="text-xs font-bold text-gray-600">
                    Care continues.
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Footer */}
          <div className="mt-4 pt-5 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-2">

            <p className="text-xs text-gray-400">
              Connecting medicines with those who need them.
            </p>

            <p className="text-xs uppercase tracking-widest text-gray-300 font-bold">
              MediShare
            </p>

          </div>

        </div>

      </main>

    </div>
  );
};

export default NotFound;