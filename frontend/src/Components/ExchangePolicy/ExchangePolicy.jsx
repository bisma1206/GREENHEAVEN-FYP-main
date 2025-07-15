import { FaExchangeAlt, FaUndo, FaHeadset } from "react-icons/fa";

const ExchangePolicy = () => {
  return (
    <div className="py-20 bg-gradient-to-br from-[#f0fdf4] to-white">
      <h1 className="text-4xl font-bold text-green-900 mb-12 text-center tracking-wide">
        Why Shop with Green Heaven?
      </h1>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 px-6">
        {/* Exchange Policy Card */}
        <div className="flex flex-col items-center bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-green-300">
          <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-green-[#e8f5e9] shadow-inner">
            <FaExchangeAlt className="text-green-700 text-5xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            Easy Exchange
          </h2>
          <p className="text-gray-600 text-center text-md mt-3">
            Hassle-free exchanges to ensure your satisfaction.
          </p>
        </div>

        {/* 7-Day Return Card */}
        <div className="flex flex-col items-center bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-green-300">
          <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-green-50 shadow-inner">
            <FaUndo className="text-green-700 text-5xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            7-Day Return
          </h2>
          <p className="text-gray-600 text-center text-md mt-3">
            Return your product within 7 days if you're not satisfied.
          </p>
        </div>

        {/* Customer Support Card */}
        <div className="flex flex-col items-center bg-white/60 backdrop-blur-xl p-8 rounded-3xl shadow-lg hover:shadow-2xl transition transform hover:-translate-y-2 border border-green-300">
          <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-green-50 shadow-inner">
            <FaHeadset className="text-green-700 text-5xl" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mt-6">
            24/7 Support
          </h2>
          <p className="text-gray-600 text-center text-md mt-3">
            We're here to help you with all your queries, anytime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ExchangePolicy;