import React, { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OtpVerificationImage from "../assets/image4.png";
import Button from "../components/Button";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useVerifyOtpMutation } from "../services/authApi";

function OtpVerificationPage() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const location = useLocation();
  const email = location.state?.email;

  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const handleVerify = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    if (enteredOtp.length !== 6) {
      toast.error("Please enter a 6-digit OTP.");
      return;
    }
    if (!email) {
      toast.error("Email not found. Please go back and try again.");
      return;
    }

    try {
      const response = await verifyOtp({ email, otp: enteredOtp }).unwrap();
      const token = response?.token;
      toast.success("OTP verified successfully!");
      navigate("/reset-password", { state: { email, otp: enteredOtp, token } });
    } catch (err) {
      console.error("Failed to verify OTP:", err);
      toast.error(err?.data?.message || "Invalid OTP. Please try again.");
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (/[^0-9]/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleResendOtp = () => {
    if (!email) {
      toast.error("Email not found. Cannot resend OTP.");
      return;
    }
    console.log("Resend OTP triggered for:", email);
    toast.info("OTP has been resent to your email!");
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center font-sans relative"
      style={{ backgroundImage: `url(${OtpVerificationImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-4xl shadow-2xl backdrop-blur-xs bg-black/bg-opacity-30">
        <div className="flex flex-col items-center mb-6">
          <div className="mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-gray-100">OTP Verification</h1>
          <p className="text-sm text-gray-200 mt-2">
            We sent a code to <strong>{email || "your email"}</strong>
          </p>
        </div>

        {/* OTP Form */}
        <form onSubmit={handleVerify} className="flex flex-col items-center gap-y-4 w-full">
          <div className="flex justify-between gap-2 w-full p-3 border rounded-xl border-gray-100 h-16">
            {otp.map((digit, index) => (
              <div key={index} className="relative flex-1 flex items-center justify-center">
                <input
                  ref={(el) => (inputRefs.current[index] = el)}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-full h-full text-center text-white text-xl font-semibold focus:outline-none bg-transparent"
                  style={{ caretColor: 'white' }}
                />
                {!digit && (
                  <div className="absolute bottom-1/2 translate-y-1/2 w-6 h-px bg-gray-100"></div>
                )}
              </div>
            ))}
          </div>

          <div className="w-full text-left">
            <p className="text-xs text-gray-200">Enter 6-digit code</p>
          </div>

          <Button
            type="submit"
            className="w-full mt-2 rounded-2xl shadow-lg shadow-indigo-500/50"
            disabled={isLoading}
          >
            {isLoading ? "Verifying..." : "Verify"}
          </Button>
        </form>

        {/* Resend OTP */}
        <button
          type="button"
          onClick={handleResendOtp}
          className="w-full py-2 px-4 mt-4 text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Resend OTP
        </button>
      </div>
    </div>
  );
}

export default OtpVerificationPage;
