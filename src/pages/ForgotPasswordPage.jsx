import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ForgotPasswordImage from "../assets/image3.png";
import InputWithIcon from "../components/InputWithIcon";
import Button from "../components/Button";
import { MdOutlineMail } from "react-icons/md";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSendOtpMutation } from "../services/AuthApi";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const [sendOtp, { isLoading }] = useSendOtpMutation();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSendOTP = async (e) => {
    e.preventDefault();

    // Validation
    if (email.trim() === "") {
      toast.error("Email is required.");
      return;
    }
    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    // API call
    try {
      await sendOtp({ email }).unwrap();
      toast.success("OTP sent successfully!");
      navigate("/verify-otp", { state: { email } });
    } catch (err) {
      console.error("Failed to send OTP:", err);
      toast.error(err?.data?.message || "Failed to send OTP. Please try again.");
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center font-sans relative"
      style={{ backgroundImage: `url(${ForgotPasswordImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-4xl shadow-2xl backdrop-blur-xs bg-black/bg-opacity-30">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-100 mb-3">Forgot Password</h1>
          <p className="text-sm sm:text-base text-gray-200">
            Don’t worry! Please enter the email address linked with your account, and we’ll send you an OTP.
          </p>
        </div>

        <form onSubmit={handleSendOTP} className="w-full flex flex-col gap-y-6">
          <div>
            <InputWithIcon
              label="Email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<MdOutlineMail className="h-6 w-6 text-gray-400" />}
            />
          </div>

          <div className="mt-4">
            <Button
              type="submit"
              className="w-full rounded-2xl shadow-lg shadow-indigo-500/50"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send OTP"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
