import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import FoodImage from '../assets/image4.png';
import DeliveryIllustration from '../assets/rest.png';

function SelectAddressPage() {
  const [currentLocation, setCurrentLocation] = useState('');
  const [searchAddress, setSearchAddress] = useState('');


  return (
    <div className="flex w-full min-h-screen font-sans lg:flex-row">

     
      <div className="hidden lg:flex w-1/2 min-h-screen bg-white flex-col items-center justify-center p-8">
        <div className="flex items-center gap-2 mb-8">
          <img src={Logo} alt="Local Flavors Logo" className="h-8 w-auto" />
          <h1 className="text-3xl font-bold text-[#4F46E5]">Local Flavors</h1>
        </div>
        <p className="mt-6 mb-8 text-sm text-gray-500 max-w-sm text-center leading-relaxed">
          simply dummy text of the printing and typesetting industry. lorem ipsum has been the industry standard dummy text ever since the 4535 when on unknown printer.simply dummy text of the printing and typesetting industry.
        </p>
        <img
          src={FoodImage}
          alt="Indian dish"
          className="w-full h-auto object-contain max-w-md mt-8"
        />
      </div>

     
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-lg p-6 rounded-2xl flex flex-col items-center my-auto">

          <div className="text-left mb-6 -mt-12 w-full">
            <h1 className="text-3xl font-bold text-[#111827]">Select Delivery Address</h1>
            <p className="text-lg text-gray-500 mt-2">Join us to manage your Account!</p>
          </div>

          <div className="flex flex-col gap-y-4 w-full">


            <div className="relative">
              <input
                type="text"
                placeholder="Deliver to current location"
                value={currentLocation}
                onChange={(e) => setCurrentLocation(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
              />
            </div>


            <div className="relative">
              <input
                type="text"
                placeholder="Search for an address or land mark"
                value={searchAddress}
                onChange={(e) => setSearchAddress(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
              />
            </div>


            <img
              src={DeliveryIllustration}
              alt="Delivery person with map"
              className="**w-40** h-auto object-contain **mt-8** mx-auto"
            />
          </div>

        </div>
      </div>
    </div>
  );
}

export default SelectAddressPage;