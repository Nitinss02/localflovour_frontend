import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import ResetPasswordImage from "../assets/newimage3.png";
import Button from "../components/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useResetPasswordMutation } from "../services/AuthApi";

function CreateNewPasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;
  const otp = location.state?.otp;

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleContinue = async (e) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Both password fields are required.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return;
    }
    const passwordContentRegex = /^(?=.*[A-Za-z])(?=.*\d)/;
    if (!passwordContentRegex.test(newPassword)) {
      toast.error("Password must include both letters and numbers.");
      return;
    }
    if (!email || !otp) {
      toast.error("Something went wrong. Please start the process again.");
      return;
    }

    try {
      await resetPassword({ email, otp, newPassword, confirmPassword }).unwrap();
      toast.success("Password updated successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Failed to reset password:", err);
      toast.error(err?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center font-sans bg-cover bg-center relative"
      style={{ backgroundImage: `url(${ResetPasswordImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-4xl shadow-2xl backdrop-blur-xs bg-black/bg-opacity-30">
        <div className="mb-4">
          <Logo />
        </div>

        <div className="text-center gap-2 mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2 text-gray-100">
            Create New Password
          </h1>
          <p className="text-sm text-gray-200 mb-6 text-center">
            Your new password must be unique from those previously used.
          </p>
        </div>

        <form onSubmit={handleContinue} className="flex flex-col gap-y-4 w-full">
          {/* New Password */}
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter New Password"
              className="w-full p-3 pr-10 border text-white border-gray-100 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-100"
              onClick={() => setShowNewPassword(!showNewPassword)}
            >
              {showNewPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm Password"
              className="w-full p-3 pr-10 border text-white border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 placeholder-gray-400"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-100"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit Button */}
          <div className="mt-4 w-full">
            <Button
              type="submit"
              className="w-full rounded-2xl shadow-lg shadow-indigo-500/50"
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Continue"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateNewPasswordPage;
