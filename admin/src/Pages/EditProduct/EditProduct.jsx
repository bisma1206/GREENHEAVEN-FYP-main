// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import { backendUrl } from "../../App";

// const EditProduct = ({ token }) => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const location = useLocation();
//   const [product, setProduct] = useState(location.state?.product || null);
//   const [imagePreview, setImagePreview] = useState(product?.image || "");

//   useEffect(() => {
//     if (!product) {
//       axios
//         .post(
//           `${backendUrl}/api/product/single`,
//           { productId: id },
//           {
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         )
//         .then((response) => {
//           if (response.data.success) {
//             setProduct(response.data.product);
//             setImagePreview(response.data.product.image);
//           } else {
//             toast.error("Product not found.");
//             navigate("/list");
//           }
//         })
//         .catch(() => {
//           toast.error("Error fetching product.");
//           navigate("/list");
//         });
//     }
//   }, [id, navigate, product, token]);

//   const [formData, setFormData] = useState({
//     name: product?.name || "",
//     category: product?.category || "",
//     price: product?.price || "",
//     description: product?.description || "",
//     bestSeller: product?.bestSeller || false,
//     sizes: product?.sizes ? product.sizes.join(", ") : "",
//     specifications: product?.specifications || {
//       sunlight: "",
//       water: "",
//       soil: "",
//       height: "",
//       lifespan: "",
//     },
//     image: null,
//   });

//   useEffect(() => {
//     if (product) {
//       setFormData({
//         name: product.name,
//         category: product.category,
//         price: product.price,
//         description: product.description,
//         bestSeller: product.bestSeller,
//         sizes: product.sizes.join(", "),
//         specifications: product.specifications,
//         image: null,
//       });
//     }
//   }, [product]);

//   const onChangeHandler = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === "checkbox") {
//       setFormData({ ...formData, [name]: checked });
//     } else if (name.includes("specifications")) {
//       setFormData({
//         ...formData,
//         specifications: {
//           ...formData.specifications,
//           [name.split(".")[1]]: value,
//         },
//       });
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const onImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFormData({ ...formData, image: file });
//       setImagePreview(URL.createObjectURL(file));
//     }
//   };

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     const updatedFormData = new FormData();

//     updatedFormData.append("id", id);
//     updatedFormData.append("name", formData.name);
//     updatedFormData.append("category", formData.category);
//     updatedFormData.append("price", formData.price);
//     updatedFormData.append("description", formData.description);
//     updatedFormData.append("bestSeller", formData.bestSeller);
//     updatedFormData.append(
//       "sizes",
//       JSON.stringify(formData.sizes.split(", ").map((size) => size.trim()))
//     );
//     updatedFormData.append(
//       "specifications",
//       JSON.stringify(formData.specifications)
//     );

//     if (formData.image) {
//       updatedFormData.append("image", formData.image);
//     }

//     try {
//       const response = await axios.put(
//         `${backendUrl}/api/product/edit`,
//         updatedFormData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.data.success) {
//         toast.success("Product updated successfully!");
//         navigate("/list");
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.log(error);
//       toast.error("Error updating product.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
//       <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
//         <h2 className="text-2xl font-bold text-center text-green-800 mb-6">
//           Edit Product
//         </h2>

//         {product ? (
//           <form onSubmit={onSubmitHandler} className="space-y-4">
//             <div>
//               <label className="block text-gray-700 font-semibold">Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={onChangeHandler}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold">
//                 Category
//               </label>
//               <input
//                 type="text"
//                 name="category"
//                 value={formData.category}
//                 onChange={onChangeHandler}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold">Price</label>
//               <input
//                 type="number"
//                 name="price"
//                 value={formData.price}
//                 onChange={onChangeHandler}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={onChangeHandler}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               ></textarea>
//             </div>

//             <label className="flex items-center space-x-2">
//               <input
//                 type="checkbox"
//                 name="bestSeller"
//                 checked={formData.bestSeller}
//                 onChange={onChangeHandler}
//               />
//               <span>Mark as Best Seller</span>
//             </label>

//             <div>
//               <label className="block text-gray-700 font-semibold">Sizes</label>
//               <input
//                 type="text"
//                 name="sizes"
//                 value={formData.sizes}
//                 onChange={onChangeHandler}
//                 className="w-full p-2 border border-gray-300 rounded"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-gray-700 font-semibold">
//                 Specifications
//               </label>
//               {Object.keys(formData.specifications).map((key) => (
//                 <input
//                   key={key}
//                   type="text"
//                   name={`specifications.${key}`}
//                   value={formData.specifications[key]}
//                   onChange={onChangeHandler}
//                   placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
//                   className="w-full p-2 border border-gray-300 rounded mb-2"
//                   required
//                 />
//               ))}
//             </div>

//             <div className="flex flex-col items-center">
//               <label className="block text-gray-700 font-semibold mb-2">
//                 Product Image
//               </label>
//               {imagePreview && (
//                 <img
//                   src={imagePreview}
//                   alt="Product"
//                   className="w-32 h-32 object-cover rounded mb-2"
//                 />
//               )}
//               <input
//                 type="file"
//                 name="image"
//                 accept="image/*"
//                 onChange={onImageChange}
//                 className="w-full border border-gray-300 rounded p-2"
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
//             >
//               Update Product
//             </button>
//           </form>
//         ) : (
//           <p className="text-center text-gray-500">
//             Loading product details...
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default EditProduct;


import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backendUrl } from "../../App";

const EditProduct = ({ token }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.product || null);
  const [imagePreview, setImagePreview] = useState(product?.image || "");

  useEffect(() => {
    if (!product) {
      axios
        .post(
          `${backendUrl}/api/product/single`,
          { productId: id },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((response) => {
          if (response.data.success) {
            setProduct(response.data.product);
            setImagePreview(response.data.product.image);
          } else {
            toast.error("Product not found.");
            navigate("/list");
          }
        })
        .catch(() => {
          toast.error("Error fetching product.");
          navigate("/list");
        });
    }
  }, [id, navigate, product, token]);

  const [formData, setFormData] = useState({
    name: product?.name || "",
    category: product?.category || "",
    price: product?.price || "",
    description: product?.description || "",
    bestSeller: product?.bestSeller || false,
    sizes: product?.sizes ? product.sizes.join(", ") : "",
    specifications: product?.specifications || {
      sunlight: "",
      water: "",
      soil: "",
      height: "",
      lifespan: "",
    },
    image: null,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price,
        description: product.description,
        bestSeller: product.bestSeller,
        sizes: product.sizes.join(", "),
        specifications: product.specifications,
        image: null,
      });
    }
  }, [product]);

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (name.includes("specifications")) {
      setFormData({
        ...formData,
        specifications: {
          ...formData.specifications,
          [name.split(".")[1]]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const updatedFormData = new FormData();

    updatedFormData.append("id", id);
    updatedFormData.append("name", formData.name);
    updatedFormData.append("category", formData.category);
    updatedFormData.append("price", formData.price);
    updatedFormData.append("description", formData.description);
    updatedFormData.append("bestSeller", formData.bestSeller);
    updatedFormData.append(
      "sizes",
      JSON.stringify(formData.sizes.split(", ").map((size) => size.trim()))
    );
    updatedFormData.append(
      "specifications",
      JSON.stringify(formData.specifications)
    );

    if (formData.image) {
      updatedFormData.append("image", formData.image);
    }

    try {
      const response = await axios.put(
        `${backendUrl}/api/product/edit`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Product updated successfully!");
        navigate("/list");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error updating product.");
    }
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
      }}
    >
      <div className="max-w-2xl w-full mt-6 mb-8 p-6 rounded-lg shadow-lg">
        <h2 className="text-4xl font-extrabold text-center text-green-800 mb-6"
        style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)" }}>
        Product Modification
        </h2>

        {product ? (
          <form onSubmit={onSubmitHandler} className="space-y-4">
            <div>
              <label className="block text-green-800 font-extrabold mb-3">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={onChangeHandler}
                className="w-full p-2 border border-gray-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-green-800 font-extrabold mb-3">
                Category
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={onChangeHandler}
                className="w-full p-2 border border-green-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-green-800 font-extrabold mb-3">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={onChangeHandler}
                className="w-full p-2 border border-green-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-green-800 font-extrabold mb-3">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={onChangeHandler}
                className="w-full p-2 border border-green-300 rounded"
                required
              ></textarea>
            </div>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="bestSeller"
                checked={formData.bestSeller}
                onChange={onChangeHandler}
              />
              <span className="text-green-800 font-bold">Mark as Best Seller</span>
            </label>

            <div>
              <label className="block text-green-800 font-extrabold mb-3">Sizes</label>
              <input
                type="text"
                name="sizes"
                value={formData.sizes}
                onChange={onChangeHandler}
                className="w-full p-2 border border-green-300 rounded"
                required
              />
            </div>

            <div>
              <label className="block text-green-800 font-extrabold mb-3">
                Specifications
              </label>
              {Object.keys(formData.specifications).map((key) => (
                <input
                  key={key}
                  type="text"
                  name={`specifications.${key}`}
                  value={formData.specifications[key]}
                  onChange={onChangeHandler}
                  placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                  className="w-full p-2 border border-green-300 rounded mb-3"
                  required
                />
              ))}
            </div>

            <div className="flex flex-col items-center">
              <label className="block text-green-800 font-extrabold mb-3">
                Product Image
              </label>
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Product"
                  className="w-32 h-32 object-cover rounded mb-2"
                />
              )}
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={onImageChange}
                className="w-full border border-green-300 rounded p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-800 font-bold text-white py-2 rounded hover:bg-green-600"
            >
              Save Changes
            </button>
          </form>
        ) : (
          <p className="text-center text-gray-500">
            Loading product details...
          </p>
        )}
      </div>
    </div>
  );
};

export default EditProduct;
