import PropTypes from "prop-types";

const Star = ({
  onRate,
  fill,
  onHover = () => {}, // Default empty function
  onHoverOut = () => {}, // Default empty function
  color = "green", // Default green color
  size,
}) => {
  const starStyle = {
    height: `${size}`,
    width: `${size}`,
    display: "inline-block",
    margin: "6px 3px",
    cursor: "pointer",
  };

  return (
    <span
      style={starStyle}
      role="button"
      onClick={onRate}
      onMouseEnter={onHover}
      onMouseLeave={onHoverOut}
    >
      {fill ? (
        <svg
          viewBox="0 0 24 24"
          fill={color} // This sets the color of the filled star
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none" // This ensures the unfilled star remains transparent
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14l-5-4.87 6.91-1.01L12 2z"
            stroke={color} // This sets the border color for unfilled stars
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </span>
  );
};

Star.propTypes = {
  onRate: PropTypes.func.isRequired, // Callback when the star is clicked
  fill: PropTypes.bool.isRequired, // Whether the star is filled or not
  onHover: PropTypes.func, // Callback when hovering over the star
  onHoverOut: PropTypes.func, // Callback when hovering out of the star
  color: PropTypes.string, // Color of the star
  size: PropTypes.string.isRequired, // Size of the star
};

export default Star;
