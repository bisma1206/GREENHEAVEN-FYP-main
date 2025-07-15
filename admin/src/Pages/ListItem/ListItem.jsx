import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { backendUrl } from "../../App";
import axios from "axios";
import { toast } from "react-toastify";

const ListItems = ({ token }) => {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div
      className="p-6 min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/736x/0a/f9/72/0af9721bc5afb32a9f2a0cdf2fe84fd7.jpg')",
      }}
    >
      <div className="max-w-6xl mx-auto p-6 rounded-lg shadow-lg">
        <h1
          className="text-3xl font-extrabold text-green-800 mb-6 text-center"
          style={{
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)", // Shadow effect
          }}
        >
        Product Catalog
        </h1>

        {list.length > 0 ? (
          <div className=" bg-opacity-60  rounded-lg p-4 ">
            <table className="w-full  border border-green-400 shadow-md rounded-lg">
              <thead className="bg-green-100">
                <tr>
                  <th className="text-left py-3 px-4 text-green-800 font-extrabold">
                    Image
                  </th>
                  <th className="text-left py-3 px-4 text-green-800 font-extrabold">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 text-green-800 font-extrabold">
                    Category
                  </th>
                  <th className="text-left py-3 px-4 text-green-800 font-extrabold">
                    Price
                  </th>
                  <th className="text-left py-3 px-4 text-green-800 font-extrabold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="py-3 px-4">
                      <img
                        src={item.image || "https://via.placeholder.com/50"}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4 font-bold text-green-900">{item.name}</td>
                    <td className="py-3 px-4 font-bold text-green-900">
                      {item.category || "N/A"}
                    </td>
                    <td className="py-3 px-4 font-bold text-gray-800">
                      ${item.price}
                    </td>
                    <td className="py-3 px-4 flex gap-4">
                      <NavLink
                        to={`/edit/${item._id}`}
                        className="text-blue-600 hover:text-blue-800 font-extrabold"
                      >
                        ✏ Edit
                      </NavLink>
                      <button
                        onClick={() => removeProduct(item._id)}
                        className="text-red-600 hover:text-red-800 font-extrabold"
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500 text-center">No items found.</p>
        )}
      </div>
    </div>
  );
};

export default ListItems;
