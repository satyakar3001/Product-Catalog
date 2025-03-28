import React from "react";

const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md p-4 rounded-md ${className}`}>{children}</div>
);

export default Card;
