// import axios from "axios";
// import { useState } from "react";
// import PropTypes from "prop-types";
// import { backendUrl } from "../../App";
// import { toast } from "react-toastify";

// const AddItem = ({ token }) => {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [price, setPrice] = useState("");
//   const [plantImage, setPlantImage] = useState(null);
//   const [category, setCategory] = useState("");
//   const [bestSeller, setBestSeller] = useState(false);
//   const [sizes, setSizes] = useState([]);
//   const [specifications, setSpecifications] = useState({
//     sunlight: "",
//     water: "",
//     soil: "",
//     height: "",
//     lifespan: "",
//   });

//   const handleSpecificationChange = (key, value) => {
//     setSpecifications((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const formData = new FormData();
//       formData.append("name", name);
//       formData.append("description", description);
//       formData.append("price", price);
//       formData.append("image", plantImage);
//       formData.append("category", category);
//       formData.append("bestSeller", bestSeller);
//       formData.append("sizes", JSON.stringify(sizes));
//       formData.append("specifications", JSON.stringify(specifications));

//       const response = await axios.post(
//         backendUrl + "/api/product/add",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       toast.error(error.message);
//     }
//   };

//   const toggleSize = (size) => {
//     setSizes((prev) =>
//       prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
//     );
//   };

//   return (
//     <div className="p-6 bg-green-100 min-h-screen flex justify-center items-center">
//       <div className="max-w-3xl w-full">
//         <h1
//           className="text-3xl font-bold text-green-800 mb-6 text-center"
//           style={{
//             textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
//           }}
//         >
//           Add Plant
//         </h1>

//         <form
//           className="space-y-6 bg-white p-6 rounded-lg shadow-lg"
//           onSubmit={handleSubmit}
//         >
//           {/* Name */}
//           <div>
//             <label className="block text-sm font-bold text-green-700 mb-1">
//               Name
//             </label>
//             <input
//               type="text"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter plant name"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-bold text-green-700 mb-1">
//               Description
//             </label>
//             <textarea
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               rows="4"
//               placeholder="Enter plant description"
//             ></textarea>
//           </div>

//           {/* Price */}
//           <div>
//             <label className="block text-sm font-bold text-green-700 mb-1">
//               Price
//             </label>
//             <input
//               type="number"
//               value={price}
//               onChange={(e) => setPrice(e.target.value)}
//               className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//               placeholder="Enter price"
//             />
//           </div>

//           {/* Plant Image */}
//           <div>
//             <label className="block text-sm font-bold text-green-700 mb-1">
//               Plant Image
//             </label>
//             {plantImage && (
//               <img
//                 src={URL.createObjectURL(plantImage)}
//                 alt="Preview"
//                 className="w-20 h-20 mb-2 object-cover rounded-md"
//               />
//             )}
//             <input
//               type="file"
//               onChange={(e) => setPlantImage(e.target.files[0])}
//               className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             />
//           </div>

//           {/* Category */}
//           <div>
//             <label className="block text-sm font-bold text-green-700 mb-1">
//               Category
//             </label>
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//             >
//               <option value="">Select a category</option>
//               <option value="Indoor">Indoor Plants</option>
//               <option value="Outdoor">Outdoor Plants</option>
//               <option value="Succulents">Succulents</option>
//               <option value="Herbs">Herbs</option>
//               <option value="Housing">Housing Plants</option>
//               <option value="Flowering">Flowering Plants</option>
//             </select>
//           </div>

//           {/* Bestseller */}
//           <div>
//             <label className="flex items-center space-x-2 text-sm font-bold text-green-700">
//               <input
//                 type="checkbox"
//                 checked={bestSeller}
//                 onChange={(e) => setBestSeller(e.target.checked)}
//                 className="w-4 h-4 border-green-300 focus:ring-green-500"
//               />
//               <span>Mark as Bestseller</span>
//             </label>
//           </div>

//           {/* Sizes */}
//           <div>
//             <label className="block text-sm font-bold text-green-700 mb-1">
//               Sizes
//             </label>
//             <div className="flex flex-wrap gap-2">
//               {["Small", "Medium", "Large"].map((size) => (
//                 <span
//                   key={size}
//                   onClick={() => toggleSize(size)}
//                   className={`px-4 py-2 rounded-md cursor-pointer ${
//                     sizes.includes(size)
//                       ? "bg-green-500 text-white"
//                       : "bg-slate-200"
//                   }`}
//                 >
//                   {size}
//                 </span>
//               ))}
//             </div>
//           </div>

//           {/* Specifications */}
//           <div>
//             <label className="block text-sm font-bold text-green-700 mb-1">
//               Specifications
//             </label>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-bold text-green-600 mb-1">
//                   Sunlight
//                 </label>
//                 <input
//                   type="text"
//                   value={specifications.sunlight}
//                   onChange={(e) =>
//                     handleSpecificationChange("sunlight", e.target.value)
//                   }
//                   className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="E.g., Low to bright indirect light"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-green-600 mb-1">
//                   Water
//                 </label>
//                 <input
//                   type="text"
//                   value={specifications.water}
//                   onChange={(e) =>
//                     handleSpecificationChange("water", e.target.value)
//                   }
//                   className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="E.g., Once every 2 weeks"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-green-600 mb-1">
//                   Soil
//                 </label>
//                 <input
//                   type="text"
//                   value={specifications.soil}
//                   onChange={(e) =>
//                     handleSpecificationChange("soil", e.target.value)
//                   }
//                   className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="E.g., Well-draining potting mix"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-green-600 mb-1">
//                   Height
//                 </label>
//                 <input
//                   type="text"
//                   value={specifications.height}
//                   onChange={(e) =>
//                     handleSpecificationChange("height", e.target.value)
//                   }
//                   className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="E.g., 30-120 cm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-bold text-green-600 mb-1">
//                   Lifespan
//                 </label>
//                 <input
//                   type="text"
//                   value={specifications.lifespan}
//                   onChange={(e) =>
//                     handleSpecificationChange("lifespan", e.target.value)
//                   }
//                   className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
//                   placeholder="E.g., 5-10 years"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             className="w-full bg-green-700 text-white font-bold px-6 py-3 rounded-md hover:bg-green-800 transition-all"
//             style={{
//               textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
//             }}
//           >
//             Add Plant
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// AddItem.propTypes = {
//   token: PropTypes.string.isRequired,
// };

// export default AddItem;


import { useState } from "react";
import PropTypes from "prop-types";
import { backendUrl } from "../../App";
import { toast } from "react-toastify";
import axios from "axios";

const AddItem = ({ token }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [plantImage, setPlantImage] = useState(null);
  const [category, setCategory] = useState("");
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);
  const [specifications, setSpecifications] = useState({
    sunlight: "",
    water: "",
    soil: "",
    height: "",
    lifespan: "",
  });

  const handleSpecificationChange = (key, value) => {
    setSpecifications((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("image", plantImage);
      formData.append("category", category);
      formData.append("bestSeller", bestSeller);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("specifications", JSON.stringify(specifications));

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="p-6 bg-cover bg-center min-h-screen flex justify-center items-center"
         style={{
           backgroundImage: "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
         }}>
      <div className="max-w-3xl w-full  bg-opacity-10 p-6 rounded-lg shadow-lg">
        <h1 className="text-4xl font-extrabold text-green-800 mb-6 text-center"
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
         Add New Greenery
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label className="block text-lg  font-bold  text-green-700 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter plant name"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-bold text-green-700 mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              placeholder="Enter plant description"
            ></textarea>
          </div>

          {/* Price */}
          <div>
            <label className="block text-lg font-bold text-green-700 mb-1">
              Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Enter price"
            />
          </div>

          {/* Plant Image */}
          <div>
            <label className="block text-lg font-bold text-green-700 mb-1">
              Plant Image
            </label>
            {plantImage && (
              <img
                src={URL.createObjectURL(plantImage)}
                alt="Preview"
                className="w-20 h-20 mb-2 object-cover rounded-md"
              />
            )}
            <input
              type="file"
              onChange={(e) => setPlantImage(e.target.files[0])}
              className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-lg font-bold text-green-700 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a category</option>
              <option value="Indoor">Indoor Plants</option>
              <option value="Outdoor">Outdoor Plants</option>
              <option value="Succulents">Succulents</option>
              <option value="Herbs">Herbs</option>
              <option value="Housing">Housing Plants</option>
              <option value="Flowering">Flowering Plants</option>
            </select>
          </div>

          {/* Bestseller */}
          <div>
            <label className="flex items-center space-x-2 text-lg font-bold text-green-700">
              <input
                type="checkbox"
                checked={bestSeller}
                onChange={(e) => setBestSeller(e.target.checked)}
                className="w-4 h-4 border-green-300 focus:ring-green-500"
              />
              <span>Mark as Bestseller</span>
            </label>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-lg font-bold text-green-700 mb-1">
              Sizes
            </label>
            <div className="flex flex-wrap gap-2">
              {["Small", "Medium", "Large"].map((size) => (
                <span
                  key={size}
                  onClick={() => toggleSize(size)}
                  className={`px-4 py-2 rounded-md cursor-pointer ${
                    sizes.includes(size)
                      ? "bg-green-500 text-white"
                      : "bg-slate-200"
                  }`}
                >
                  {size}
                </span>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div>
            <label className="block text-lg font-bold text-green-700 mb-1">
              Specifications
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-green-600 mb-1">
                  Sunlight
                </label>
                <input
                  type="text"
                  value={specifications.sunlight}
                  onChange={(e) =>
                    handleSpecificationChange("sunlight", e.target.value)
                  }
                  className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="E.g., Low to bright indirect light"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-green-600 mb-1">
                  Water
                </label>
                <input
                  type="text"
                  value={specifications.water}
                  onChange={(e) =>
                    handleSpecificationChange("water", e.target.value)
                  }
                  className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="E.g., Once every 2 weeks"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-green-600 mb-1">
                  Soil
                </label>
                <input
                  type="text"
                  value={specifications.soil}
                  onChange={(e) =>
                    handleSpecificationChange("soil", e.target.value)
                  }
                  className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="E.g., Well-draining potting mix"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-green-600 mb-1">
                  Height
                </label>
                <input
                  type="text"
                  value={specifications.height}
                  onChange={(e) =>
                    handleSpecificationChange("height", e.target.value)
                  }
                  className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="E.g., 30-120 cm"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-green-600 mb-1">
                  Lifespan
                </label>
                <input
                  type="text"
                  value={specifications.lifespan}
                  onChange={(e) =>
                    handleSpecificationChange("lifespan", e.target.value)
                  }
                  className="w-full p-3 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="E.g., 5-10 years"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-900 text-white font-bold px-6 py-3 rounded-md hover:bg-green-600 transition-all"
            style={{
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
            }}
          >
            Register New Greenery
          </button>
        </form>
      </div>
    </div>
  );
};

AddItem.propTypes = {
  token: PropTypes.string.isRequired,
};

export default AddItem;
