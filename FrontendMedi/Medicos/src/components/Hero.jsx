import { Pill, Heart, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-linear-to-br from-emerald-50 via-white to-indigo-50"
    >

      {/* Background Decorations */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl"></div>

      <div className="absolute top-32 -right-32 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>

      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-teal-200/20 rounded-full blur-3xl"></div>


      <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-20 lg:py-28">

        <div className="grid lg:grid-cols-2 gap-16 items-center">


          {/* LEFT CONTENT */}

          <div className="max-w-2xl">

            {/* Small Label */}

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-emerald-200 shadow-sm mb-6">

              <Sparkles
                size={16}
                className="text-emerald-500"
              />

              <span className="text-sm font-semibold text-emerald-700">
                MEDICINE SHARING PLATFORM
              </span>

            </div>


            {/* Heading */}

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.08] tracking-tight">

              Medicine You Don't Need

              <span className="block bg-linear-to-r from-emerald-600 via-teal-500 to-indigo-600 bg-clip-text text-transparent mt-2">
                Can Help Someone Who Does.
              </span>

            </h1>


            {/* Description */}

            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-7 max-w-xl">

              Donate unused medicines and connect them with people who
              genuinely need them. Together, we can reduce medicine wastage
              and make healthcare more accessible.

            </p>


            {/* Buttons */}

            <div className="flex flex-col sm:flex-row gap-4 mt-9">

              <button
                onClick={() => navigate("/signup")}
                className="group flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-linear-to-r from-emerald-500 to-teal-500 text-white font-bold shadow-lg shadow-emerald-200 hover:from-emerald-600 hover:to-teal-600 hover:shadow-xl transition-all duration-300"
              >
                Donate Medicine

                <ArrowRight
                  size={19}
                  className="group-hover:translate-x-1 transition"
                />
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white border-2 border-indigo-200 text-indigo-600 font-bold hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 shadow-sm"
              >
                <Pill size={19} />

                Find Medicine
              </button>

            </div>


            {/* Trust Points */}

            <div className="flex flex-wrap gap-6 mt-9">

              <div className="flex items-center gap-2 text-sm text-gray-600">

                <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center">
                  <ShieldCheck
                    size={17}
                    className="text-emerald-600"
                  />
                </div>

                Safe & Secure
              </div>


              <div className="flex items-center gap-2 text-sm text-gray-600">

                <div className="w-8 h-8 rounded-full bg-rose-100 flex items-center justify-center">
                  <Heart
                    size={17}
                    className="text-rose-500"
                  />
                </div>

                Community Driven
              </div>

            </div>

          </div>


          {/* RIGHT VISUAL */}

          <div className="relative flex justify-center items-center">

            {/* Main Glow */}

            <div className="absolute w-80 h-80 md:w-96 md:h-96 bg-emerald-300/20 rounded-full blur-3xl"></div>


            {/* Main Card */}

            <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-[3rem] bg-white/80 backdrop-blur-md border border-white shadow-2xl flex items-center justify-center">

              {/* Decorative Ring */}

              <div className="absolute inset-7 rounded-[2.5rem] border border-emerald-100"></div>


              {/* Pill Circle */}

              <div className="relative text-center">

                <div className="mx-auto w-28 h-28 rounded-3xl bg-linear-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-xl shadow-emerald-200 rotate-3 hover:rotate-0 transition-transform duration-300">

                  <Pill
                    size={58}
                    className="text-white"
                  />

                </div>


                <h2 className="text-3xl font-black text-gray-900 mt-7">
                  Share. Care.
                </h2>

                <h2 className="text-3xl font-black bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
                  Heal.
                </h2>

                <p className="text-gray-500 mt-3 text-sm max-w-xs mx-auto">
                  Every medicine can make a difference.
                </p>

              </div>


              {/* Floating Heart */}

              <div className="absolute -top-5 -right-5 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center rotate-12">

                <Heart
                  size={27}
                  className="text-rose-500 fill-rose-500"
                />

              </div>


              {/* Floating Shield */}

              <div className="absolute -bottom-5 -left-5 w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center -rotate-12">

                <ShieldCheck
                  size={27}
                  className="text-indigo-500"
                />

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;
