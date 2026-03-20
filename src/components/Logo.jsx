import React from 'react';
import logoImage from '../assets/logo.png';

const Logo = () => {
  return (
    <div className="flex items-center justify-center ">
      <img src={logoImage} alt="Local Flavors Logo" className="h-8  w-auto" />
      <h1 className="text-2xl lg:text-3xl font-bold text-[#6A3EA7]">Local Flavors</h1>
    </div>
  );
};

export default Logo;