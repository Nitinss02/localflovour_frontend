import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import OnboardingImage from "../assets/image1.png";

function OnboardingPage() {
  const navigate = useNavigate();
  const skipClickedRef = useRef(false);

  const handleSkip = () => {
    skipClickedRef.current = true;
    navigate("/welcome");
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!skipClickedRef.current) {
        navigate("/welcome");
      }
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center font-sans relative"
      style={{
        backgroundImage: `url(${OnboardingImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>


      {/* Skip Button */}
      <button
        onClick={handleSkip}
        className="absolute top-6 right-8 text-white font-semibold text-lg hover:opacity-80 transition-opacity z-20"
      >
        Skip
      </button>

      {/* Onboarding Card */}
      <div className="relative z-10  w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-4xl shadow-2xl  backdrop-blur-xs bg-black/bg-opacity-30">
        <div className="flex flex-col text-center items-center gap-6">
          <Logo />
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-100 leading-tight">
            Taste Your Region, <br />
            Anywhere in India
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed mt-4">
            Local Flavours is your one-stop destination to explore and buy
            authentic regional foods and homemade products from every corner of
            India, delivered fresh to your doorstep.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OnboardingPage;
