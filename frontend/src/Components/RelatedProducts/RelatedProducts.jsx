import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const RelatedProducts = ({ currentProduct, allProducts }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const filteredProducts = allProducts
      .filter(
        (product) =>
          product.category === currentProduct.category &&
          product._id !== currentProduct.id
      )
      .slice(0, 4);

    setRelatedProducts(filteredProducts);
  }, [currentProduct, allProducts]);

  return (
    <div className="mt-12 text-center">
      <h3 className="text-3xl font-bold text-green-600 mb-8 relative inline-block">
        YOU MAY ALSO LIKE
        <span className="absolute left-0 right-0 -bottom-2 h-1 bg-green-400 rounded"></span>
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white shadow-lg rounded-lg p-5 flex flex-col items-center transition-transform transform hover:scale-105 hover:bg-green-100"
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover w-[100px] h-[100px] mb-4 rounded-lg"
              />
              <h4 className="text-lg font-semibold text-gray-900">{product.name}</h4>
              <p className="text-[#438A4B] font-bold text-lg">${product.price}</p>
              <Link
                to={`/product/${product._id}`}
                className="mt-4 px-4 py-2 bg-[#438A4B] text-white rounded-lg hover:bg-[#2C6C35] transition"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No related products found.</p>
        )}
      </div>
    </div>
  );
};

RelatedProducts.propTypes = {
  currentProduct: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
  }).isRequired,
  allProducts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default RelatedProducts;