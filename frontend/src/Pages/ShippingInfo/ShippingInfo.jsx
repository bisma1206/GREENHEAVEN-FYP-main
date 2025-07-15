// import { HiOutlineTruck, HiOutlineInformationCircle } from "react-icons/hi";
// import Footer from "../../Components/Footer/Footer";
// import Navbar from "../../Components/Navbar/Navbar";
// import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";

// const ShippingInfo = () => {
//   return (
//     <>
//       <Navbar />

//       {/* Background Header with Image */}
//       <div className="relative w-full h-[300px]">
//         <div
//           className="absolute inset-0"
//           style={{
//             backgroundImage:
//               "url('https://png.pngtree.com/thumb_back/fh260/background/20231228/pngtree-close-up-of-a-green-flower-house-showcasing-a-beautiful-texture-image_13837958.png')",
//             height: "380px",
//             // backgroundSize: "cover",
//             // backgroundPosition: "center",
//             clipPath: "polygon(0 0, 100% 0, 100% 70%, 50% 85%, 0 70%)",
//           }}
//         ></div>

//         {/* Title on Top of Background */}
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
//           <h1 className="text-4xl font-extrabold flex items-center gap-3 drop-shadow-lg">
//             📖 Plant Delivery Guide
//           </h1>
//           <p className="mt-2 text-lg drop-shadow-md">
//             We deliver plants safely across Pakistan with affordable and
//             efficient shipping options.
//           </p>
//         </div>
//       </div>

//       {/* Main Content with White Background */}
//       <div className="relative z-10 bg-white px-6 py-12">
//         {/* Shipping Table */}
//         <div className="overflow-x-auto mt-6">
//           <table className="w-full border-collapse border border-gray-300 text-center text-sm shadow-lg rounded-lg overflow-hidden">
//             <thead>
//               <tr className="bg-green-700 text-white text-lg">
//                 <th className="border border-gray-300 px-6 py-3">
//                   Order Total
//                 </th>
//                 <th className="border border-gray-300 px-6 py-3">
//                   Standard Shipping
//                 </th>
//                 <th className="border border-gray-300 px-6 py-3">
//                   Express Delivery
//                 </th>
//                 <th className="border border-gray-300 px-6 py-3">
//                   Same-Day Delivery
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white text-gray-700">
//               <tr className="hover:bg-green-100 transition-all">
//                 <td className="border border-gray-300 px-6 py-3">
//                   Up to $ 2,000
//                 </td>
//                 <td className="border border-gray-300 px-6 py-3">$ 200</td>
//                 <td className="border border-gray-300 px-6 py-3">$ 500</td>
//                 <td className="border border-gray-300 px-6 py-3">$ 1,000</td>
//               </tr>
//               <tr className="hover:bg-green-100 transition-all">
//                 <td className="border border-gray-300 px-6 py-3">
//                 $ 2,001 - PKR 10,000
//                 </td>
//                 <td className="border border-gray-300 px-6 py-3">$ 150</td>
//                 <td className="border border-gray-300 px-6 py-3">$ 400</td>
//                 <td className="border border-gray-300 px-6 py-3">$ 800</td>
//               </tr>
//               <tr className="hover:bg-green-100 transition-all">
//                 <td className="border border-gray-300 px-6 py-3">
//                   Above $ 10,000
//                 </td>
//                 <td className="border border-gray-300 px-6 py-3 font-bold text-green-700">
//                   FREE
//                 </td>
//                 <td className="border border-gray-300 px-6 py-3">$ 300</td>
//                 <td className="border border-gray-300 px-6 py-3">$ 700</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>

//         {/* Key Information */}
//         <section className="mt-10 px-6 py-6 bg-white shadow-md rounded-lg">
//           <h2 className="text-2xl font-bold text-green-800 flex items-center gap-2">
//             <HiOutlineInformationCircle className="w-7 h-7 text-green-700" />
//             Key Information
//           </h2>
//           <ul className="mt-4 space-y-3 text-gray-700">
//             <li>
//               ✅ Standard delivery takes 3-5 business days within Pakistan.
//             </li>
//             <li>
//               ✅ Express delivery ensures your plants arrive within 1-2 business
//               days.
//             </li>
//             <li>
//               ✅ Same-day delivery is available in major cities, including
//               Karachi, Lahore, and Islamabad.
//             </li>
//             <li>
//               ✅ Orders above $ 10,000 qualify for free standard shipping.
//             </li>
//             <li>
//               ✅ Carefully packaged plants to ensure freshness and safety during
//               transit.
//             </li>
//             <li>
//               ✅ Each plant comes with detailed care instructions to keep them
//               thriving.
//             </li>
//           </ul>
//         </section>

//         {/* Important Note */}
//         <section className="mt-10 bg-green-50 p-6 rounded-lg shadow-lg">
//           <h3 className="text-2xl font-bold text-green-900">
//             An Important Note About Our Delivery Service
//           </h3>
//           <p className="mt-2 text-gray-700 leading-relaxed">
//             As we strive to provide the best service, our delivery team takes
//             the utmost care in handling and packaging your plants. For cities
//             outside major urban centers, delivery times may vary slightly.
//             Please feel free to contact us if you have any specific delivery
//             requirements or concerns.
//           </p>
//         </section>

//         {/* Contact Section */}
//         <section className="mt-12 text-center">
//           <h4 className="text-xl font-bold text-gray-900">Need Assistance?</h4>
//           <p className="text-gray-700 mt-2 text-lg">
//             Reach out to our support team at{" "}
//             <span className="text-green-800 font-semibold">
//               greenheaven@gmail.com
//             </span>{" "}
//             or call us at{" "}
//             <span className="text-green-800 font-semibold">
//               +92-300-1234567
//             </span>
//             .
//           </p>
//         </section>
//       </div>

//       <FloatingButtons />
//       <Footer />
//     </>
//   );
// };

// export default ShippingInfo;

import { HiOutlineTruck, HiOutlineInformationCircle } from "react-icons/hi";
import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import FloatingButtons from "../../Components/FloatingButtons/FloatingButtons";

const ShippingInfo = () => {
  return (
    <>
      <div className="relative z-12">
        <Navbar className="z-10" />
      </div>

      {/* Background Image Applied to the Entire Page */}
      <div
        className="relative w-full min-h-screen bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
        }}
      >
        {/* Background Overlay to improve text visibility */}
        <div className="absolute inset-0"></div>

        {/* Content Area */}
        <div className="relative z-10 px-6 py-12">
          {/* Title on Top of Background */}
          <div className="text-center text-white">
            <h1 className="text-4xl font-extrabold text-green-800 text-center gap-3 drop-shadow-lg">
              📖 Plant Delivery Guide
            </h1>
            <p className="mt-10 text-green-800 text-lg drop-shadow-md">
              At Green Heaven, we prioritize the safe delivery of your plants
              across Pakistan. We partner with reliable logistics providers to
              ensure your order is securely packed and shipped, preserving the
              health and freshness of each plant for your enjoyment upon
              arrival.
            </p>
          </div>

          {/* Main Content with White Background */}
          <div className="relative z-10  px-6 py-12 rounded-lg shadow-lg">
            {/* Shipping Table with Glass Effect */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-green-500 text-center text-lg shadow-lg rounded-lg ">
                <thead>
                  <tr className="bg-green-700 text-white text-lg">
                    <th className="border border-green-500 px-6 py-3">
                      Order Total
                    </th>
                    <th className="border border-green-500 px-6 py-3">
                      Standard Shipping
                    </th>
                    <th className="border border-green-500 px-6 py-3">
                      Express Delivery
                    </th>
                    <th className="border border-green-500 px-6 py-3">
                      Same-Day Delivery
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-transparent text-gray-700">
                  <tr className="hover:bg-green-100 transition-all">
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      Up to $ 2,000
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 200
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 500
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 1,000
                    </td>
                  </tr>
                  <tr className="hover:bg-green-100 transition-all">
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 3,500 - $ 10,000
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 150
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 400
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 800
                    </td>
                  </tr>
                  <tr className="hover:bg-green-100 transition-all">
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      Above $ 10,000
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3 font-bold text-green-700">
                      FREE
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 300
                    </td>
                    <td className="border border-green-500 font-extrabold px-6 py-3">
                      $ 700
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Key Information */}
            <section className="mt-10 px-6 py-6 bg-transparent shadow-md rounded-lg">
              <h2 className="text-2xl font-extrabold text-green-800 flex items-center gap-2">
                <HiOutlineInformationCircle className="w-7 h-7 text-green-900" />
                Key Information
              </h2>
              <ul className="mt-4 space-y-3 font-bold text-gray-700">
                <li>
                  ✅ Standard delivery takes 3-5 business days within Pakistan.
                </li>
                <li>
                  ✅ Express delivery ensures your plants arrive within 1-2
                  business days.
                </li>
                <li>
                  ✅ Same-day delivery is available in major cities, including
                  Karachi, Lahore, and Islamabad.
                </li>
                <li>
                  ✅ Orders above $ 10,000 qualify for free standard shipping.
                </li>
                <li>
                  ✅ Carefully packaged plants to ensure freshness and safety
                  during transit.
                </li>
                <li>
                  ✅ Each plant comes with detailed care instructions to keep
                  them thriving.
                </li>
              </ul>
            </section>

            {/* Important Note */}
            <section className="mt-10 bg-transparent p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold text-green-900">
                An Important Note About Our Delivery Service
              </h3>
              <p className="mt-2 text-gray-700 leading-relaxed">
                As we strive to provide the best service, our delivery team
                takes the utmost care in handling and packaging your plants. For
                cities outside major urban centers, delivery times may vary
                slightly. Please feel free to contact us if you have any
                specific delivery requirements or concerns.
              </p>
            </section>

            {/* Contact Section */}
            <section className="mt-12 text-center">
              <h4 className="text-xl font-extrabold text-green-900">
                Need Assistance?
              </h4>
              <p className="text-gray-700 mt-2 text-lg">
                Reach out to our support team at{" "}
                <span className="text-green-800 font-semibold">
                  greenheaven@gmail.com
                </span>{" "}
                or call us at{" "}
                <span className="text-green-800 font-semibold">
                  +92-300-1234567
                </span>
                .
              </p>
            </section>
          </div>
        </div>
      </div>

      <FloatingButtons />
      <Footer />
    </>
  );
};

export default ShippingInfo;
