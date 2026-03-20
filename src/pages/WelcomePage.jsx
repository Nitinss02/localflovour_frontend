import React from "react";
import { useNavigate } from "react-router-dom";
import WelcomeImage from "../assets/image2.png";
import Button from "../components/Button";

function WelcomePage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center font-sans relative"
      style={{
        backgroundImage: `url(${WelcomeImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 text-center  w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-4xl shadow-2xl  backdrop-blur-xs bg-black/bg-opacity-30">
        <h1 className="text-4xl mb-8 font-bold text-white">Welcome Back</h1>

        <div className="w-full flex flex-col gap-y-6">
          <Button onClick={handleLogin}>Login</Button>
          <Button onClick={handleSignup} variant="secondary">
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
}

export default WelcomePage;
