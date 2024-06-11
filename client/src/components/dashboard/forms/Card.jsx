// Card.jsx
import React from "react";

const Card = ({ color, title, value }) => {
  const cardStyle = {
    backgroundColor: color,
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
    margin: "10px",
    width: "100%",
  };

  return (
    <div style={cardStyle}>
      <h3>{title}</h3>
      <p>{value}</p>
    </div>
  );
};

export default Card;
