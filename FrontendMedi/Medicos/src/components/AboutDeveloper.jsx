import {Code2, Database, Server, Sparkles} from "lucide-react";

import profileImage from "../assets/profile.jpeg";

const AboutDeveloper = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-20 bg-linear-to-br from-indigo-50 via-white to-emerald-50"
    >

      {/* Background Decorations */}

      <div className="absolute -top-24 -right-24 w-80 h-80 bg-indigo-200/30 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl"></div>


      <div className="relative max-w-7xl mx-auto px-6 md:px-8">


        {/* Heading */}

        <div className="text-center mb-14">

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-indigo-100 shadow-sm mb-4">

            <Sparkles
              size={16}
              className="text-indigo-500"
            />

            <span className="text-sm font-bold tracking-widest text-indigo-600">
              ABOUT THE DEVELOPER
            </span>

          </div>


          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">

            Meet the{" "}
            <span className="bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
              Developer
            </span>

          </h2>


          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            The idea behind this platform is to use technology to
            create a simple way of connecting medicine donors with
            people who need support.
          </p>

        </div>


        {/* Developer Card */}

        <div className="relative max-w-5xl mx-auto">

          <div className="bg-white/80 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white shadow-xl">

            <div className="flex flex-col md:flex-row items-center gap-10">


              {/* Profile Image */}

              <div className="relative shrink-0">

                {/* Glow */}

                <div className="absolute inset-0 rounded-full bg-linear-to-r from-emerald-400 to-indigo-400 blur-xl opacity-30 scale-110"></div>


                <img
                  src={profileImage}
                  alt="Rupak Gur"
                  className="relative w-40 h-40 md:w-44 md:h-44 rounded-full object-cover border-4 border-white shadow-xl"
                />

              </div>


              {/* Developer Information */}

              <div className="text-center md:text-left flex-1">

                <p className="text-sm font-semibold text-emerald-600 mb-2">
                  BUILDING WITH PURPOSE
                </p>


                <h3 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">
                  Rupak Gur
                </h3>


                <p className="text-indigo-600 font-bold text-lg mb-5">
                  Full Stack Developer
                </p>


                <p className="text-gray-600 leading-relaxed mb-7 max-w-2xl">
                  I am the developer behind this platform, focused on
                  building practical and meaningful web applications
                  using modern technologies.
                </p>


                {/* Technology Badges */}

                <div className="flex flex-wrap justify-center md:justify-start gap-3">


                  {/* React */}

                  <span className="group bg-emerald-50 border border-emerald-100 px-4 py-2.5 rounded-xl text-sm font-semibold text-emerald-700 flex items-center gap-2 hover:bg-emerald-500 hover:text-white transition-all duration-300">

                    <Code2 className="w-4 h-4" />

                    React

                  </span>


                  {/* Node */}

                  <span className="group bg-teal-50 border border-teal-100 px-4 py-2.5 rounded-xl text-sm font-semibold text-teal-700 flex items-center gap-2 hover:bg-teal-500 hover:text-white transition-all duration-300">

                    <Server className="w-4 h-4" />

                    Node.js

                  </span>


                  {/* Express */}

                  <span className="group bg-indigo-50 border border-indigo-100 px-4 py-2.5 rounded-xl text-sm font-semibold text-indigo-700 flex items-center gap-2 hover:bg-indigo-500 hover:text-white transition-all duration-300">

                    <Code2 className="w-4 h-4" />

                    Express

                  </span>


                  {/* MongoDB */}

                  <span className="group bg-rose-50 border border-rose-100 px-4 py-2.5 rounded-xl text-sm font-semibold text-rose-600 flex items-center gap-2 hover:bg-rose-500 hover:text-white transition-all duration-300">

                    <Database className="w-4 h-4" />

                    MongoDB

                  </span>


                </div>

              </div>

            </div>

          </div>

        </div>


      </div>

    </section>
  );
};

export default AboutDeveloper;
