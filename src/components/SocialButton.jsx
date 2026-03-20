import React from 'react';

const SocialButton = ({ icon, children, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-x-3 py-2.5 px-4 bg-white text-gray-700 font-medium border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition-colors"
    >
      {icon}
      
      {children}
    </button>
  );
};

export default SocialButton;