import { useState } from "react";
import PropTypes from "prop-types";
import Star from "../Star/Star";

const StarRating = ({
  maxRating = 5,
  color = "green",
  size = "28px",
  rating = 0,
  setRating = () => {},
}) => {
  const textStyle = {
    marginLeft: "8px",
    color,
    fontSize: `${parseInt(size) / 1.2}px`,
    fontWeight: "bold",
  };

  const [tempRating, setTempRating] = useState(0);

  return (
    <div className="flex items-center space-x-2">
      {Array.from({ length: maxRating }, (_, i) => (
        <Star
          key={i}
          onRate={() => setRating(i + 1)}
          fill={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          onHover={() => setTempRating(i + 1)}
          onHoverOut={() => setTempRating(0)}
          color={color}
          size={size}
        />
      ))}
      <span style={textStyle}>{tempRating || rating}</span>
    </div>
  );
};

StarRating.propTypes = {
  maxRating: PropTypes.number,
  color: PropTypes.string,
  size: PropTypes.string,
  rating: PropTypes.number,
  setRating: PropTypes.func,
};

export default StarRating;
