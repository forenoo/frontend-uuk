import React from "react";

const Button = ({ children, className, ...props }) => {
  return (
    <button
      className={`w-full bg-primary-500 text-white rounded-lg px-4 text-sm font-medium hover:bg-primary-600 transition-colors duration-300 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
