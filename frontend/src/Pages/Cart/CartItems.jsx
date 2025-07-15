import PropTypes from "prop-types";
import { HiOutlineTrash } from "react-icons/hi";

const CartItems = ({ item, onRemove, onUpdate }) => {
  const itemId = item.itemId || item.id || item._id; // Handle all possible ID formats

  console.log("Cart item (with itemId):", { itemId, ...item });

  //make a fetchPrdctbyid function in product context to get all data related to item

  return (
    <div
      className="flex items-center rounded-lg p-4 space-x-4 transition hover:shadow-lg"
      style={{ background: "#e8f5e9" }}
    >
      {/* Product Image */}
      <img
        src={item.image}
        alt={item.name}
        className="w-20 h-20 object-cover rounded-lg border hover:scale-105 transition-transform duration-300"
      />

      {/* Product Details */}
      <div className="flex-1">
        <h2 className="text-lg font-bold text-green-800">{item.name}</h2>
        <p className="text-sm text-gray-500 font-bold mb-2">Size: {item.size}</p>
        <p className="text-lg font-bold text-green-500">${item.price}</p>

        {/* Quantity Selector */}
        <div className="flex items-center mt-4">
          <label className="text-gray-600 font-bold mr-2">Quantity:</label>
          <input
            type="number"
            value={Number(item.quantity)}
            min="1"
            onChange={(e) =>
              onUpdate(
                itemId,
                item.size,
                Math.max(1, parseInt(e.target.value) || 1)
              )
            }
            className="border border-gray-300 rounded-md p-1 w-16 text-center focus:ring-2 focus:ring-green-400 transition"
          />
        </div>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(itemId, item.size)}
        className="text-red-600 hover:text-red-800 transition"
      >
        <HiOutlineTrash className="w-6 h-6" />
      </button>
    </div>
  );
};

// PropTypes validation
CartItems.propTypes = {
  item: PropTypes.shape({
    itemId: PropTypes.string,
    id: PropTypes.string,
    _id: PropTypes.string, // Handle MongoDB default ID
    name: PropTypes.string.isRequired,
    size: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default CartItems;
