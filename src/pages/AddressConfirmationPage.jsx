import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.png';
import FoodImage from '../assets/image6.png'; 
import MapImage from '../assets/image4.png'; 
import Button from '../components/Button';

function AddressConfirmationPage() {
  const navigate = useNavigate();

  const handleConfirmLocation = () => {
    console.log('Location Confirmed!');
    
    navigate('/home'); 
  };

  return (
    <div className="flex w-full min-h-screen font-sans lg:flex-row">
      
     
      <div className="hidden lg:flex w-1/2 min-h-screen bg-white flex-col items-center justify-center p-8">
        <div className="flex items-center gap-2 mb-4 -mt-12 ">
          <img src={Logo} alt="Local Flavors Logo" className="h-8 w-auto" />
          <h1 className="text-3xl font-bold text-[#4F46E5]">Local Flavors</h1>
        </div>
        <p className="mt-6 text-sm text-gray-500 max-w-sm text-center leading-relaxed">
          simply dummy text of the printing and typesetting industry. lorem ipsum has been the industry standard dummy text ever since the 4535 when on unknown printer.simply dummy text of the printing and typesetting industry.
        </p>
        <img
          src={FoodImage}
          alt="Indian dish"
          className="w-full h-auto object-contain max-w-md mt-15" 
        />
      </div>

    
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="bg-white w-full max-w-lg p-6 rounded-2xl flex flex-col items-center my-auto">
          
          <div className="w-full mb-6">
            <img
              src={MapImage}
              alt="Map illustration"
              className="w-full h-auto object-contain rounded-lg"
            />
          </div>

          <div className="w-full max-w-sm p-4 border border-gray-300 rounded-2xl flex flex-col gap-2 shadow-sm">
            <h2 className="text-lg font-semibold text-[#111827]">Savitri's Homemade Delights</h2>
            <p className="text-sm text-[#111827]">Plot No. 23, Gokul Nagar, Pune - 411038,<br/>Maharashtra, India</p>
            <p className="text-sm text-[#111827]">Contact: +91 9876543210</p>
            <p className="text-sm text-[#111827]">Email: savitri.homemade@gmail.com</p>
          </div>
          
          <div className="mt-6 w-full max-w-sm">
            <Button
              onClick={handleConfirmLocation}
              className="w-full rounded-2xl shadow-lg shadow-indigo-500/50"
            >
              Confirm Location
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default AddressConfirmationPage;