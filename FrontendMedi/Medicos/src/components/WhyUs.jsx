import {ShieldCheck, Recycle, HeartHandshake} from "lucide-react";
const WhyUs = () => {
  return (
    <section
      id="why-us"
      className="py-20 bg-linear-to-b from-white to-emerald-50/40"
    >

      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Heading */}

        <div className="text-center mb-14">

          <p className="text-sm font-bold tracking-widest text-emerald-600 mb-3">
            WHY CHOOSE US
          </p>

          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-5">
            Why Choose{" "}
            <span className="bg-linear-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
              MediShare?
            </span>
          </h2>

          <p className="text-gray-600 max-w-2xl mx-auto text-lg leading-relaxed">
            We make it easier to share unused medicines with people
            who genuinely need them.
          </p>

        </div>


        {/* Cards */}

        <div className="grid md:grid-cols-3 gap-8">


          {/* Card 1 */}

          <div className="group bg-white rounded-3xl p-8 text-center border border-emerald-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors duration-300">

              <ShieldCheck
                className="w-8 h-8 text-emerald-600 group-hover:text-white transition-colors duration-300"
              />

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Safe & Verified
            </h3>

            <p className="text-gray-600 leading-relaxed">
              We focus on verified user profiles to create a
              safer and more trustworthy medicine-sharing community.
            </p>

          </div>


          {/* Card 2 */}

          <div className="group bg-white rounded-3xl p-8 text-center border border-teal-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-teal-100 flex items-center justify-center group-hover:bg-teal-500 transition-colors duration-300">

              <Recycle
                className="w-8 h-8 text-teal-600 group-hover:text-white transition-colors duration-300"
              />

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Reduce Medicine Waste
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Instead of letting unused medicines go to waste,
              give them a chance to help someone who needs them.
            </p>

          </div>


          {/* Card 3 */}

          <div className="group bg-white rounded-3xl p-8 text-center border border-rose-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">

            <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-rose-100 flex items-center justify-center group-hover:bg-rose-500 transition-colors duration-300">

              <HeartHandshake
                className="w-8 h-8 text-rose-500 group-hover:text-white transition-colors duration-300"
              />

            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Help Those in Need
            </h3>

            <p className="text-gray-600 leading-relaxed">
              Connect available medicines with people who are
              looking for support and make a meaningful difference.
            </p>

          </div>


        </div>

      </div>

    </section>
  );
};

export default WhyUs;
