
import React from 'react';

const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  
  const baseClasses = "py-3 text-base font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75 transition-colors";

  const variantClasses = {
    primary: "bg-[#6A3EA7] text-white hover:bg-indigo-700",
    secondary: "bg-white text-[#4F46E5] border-2 border-[#4F46E5] hover:bg-indigo-50",
  };
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <button
      onClick={onClick}
      className={combinedClasses}
    >
      {children}
    </button>
  );
};

export default Button;