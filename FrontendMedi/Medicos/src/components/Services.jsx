import {Pill, Search, ClipboardList, UserRound} from "lucide-react";
const Services = () => {
  return (
    <section
      id="services"
      className="py-20 bg-linear-to-b from-emerald-50/40 via-white to-indigo-50/30"
    >

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="text-sm font-bold tracking-widest text-indigo-600 mb-3">
            OUR SERVICES
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            What We{" "}
            <span className="bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
              Offer
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            Simple tools that make medicine sharing easier,
            safer, and more accessible.
          </p>

        </div>


        {/* Service Cards */}

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">


          {/* Service 1 */}

          <div className="group bg-white p-7 rounded-3xl border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 group-hover:bg-emerald-500 transition-colors duration-300">

              <Pill
                className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300"
              />

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Donate Medicines
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Publish medicines you no longer need and make
              them available to someone who needs them.
            </p>

          </div>


          {/* Service 2 */}

          <div className="group bg-white p-7 rounded-3xl border border-teal-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center mb-6 group-hover:bg-teal-500 transition-colors duration-300">

              <Search
                className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-300"
              />

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Find Medicines
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Search for available medicines and find the
              support you are looking for.
            </p>

          </div>


          {/* Service 3 */}

          <div className="group bg-white p-7 rounded-3xl border border-indigo-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center mb-6 group-hover:bg-indigo-500 transition-colors duration-300">

              <ClipboardList
                className="w-8 h-8 text-indigo-600 group-hover:text-white transition-colors duration-300"
              />

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Request Medicines
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Request medicines from donors when you need
              help managing your healthcare needs.
            </p>

          </div>


          {/* Service 4 */}

          <div className="group bg-white p-7 rounded-3xl border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center mb-6 group-hover:bg-rose-500 transition-colors duration-300">

              <UserRound
                className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors duration-300"
              />

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Manage Profile
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Keep your personal information updated and
              manage your profile easily.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
};

export default Services;
