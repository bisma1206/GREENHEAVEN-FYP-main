import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes for type checking

const ProductDetail = ({ product }) => {
  return (
    <div className="flex flex-col items-center text-center p-4 sm:p-5 rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-gradient-to-br from-green-50 to-green-200">
      <div className="w-full flex justify-center">
        <img
          src={product.image}
          alt={product.name}
          className="w-[22vh] h-[22vh] object-cover rounded-lg transition-transform duration-300 ease-in-out hover:scale-110"
        />
      </div>
      <p className="mt-3 sm:mt-5 text-base sm:text-lg font-semibold text-gray-900">
        {product.name}
      </p>
      <p className="text-[#438A4B] text-lg sm:text-xl font-bold">${product.price}</p>
      <Link 
        to={`/product/${product._id}`} className="mt-3 sm:mt-4 px-3 sm:px-4 py-2 bg-[#438A4B] text-white rounded-md hover:bg-[#2C6C35] active:bg-green-500 transition-colors">
        View Details
      </Link>
    </div>
  );
};

ProductDetail.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
};

export default ProductDetail;
