import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "../components/Button";
import Logo from "../components/Logo";
import InputWithIcon from "../components/InputWithIcon";
import {
  MdOutlinePerson,
  MdOutlinePhone,
  MdOutlineEmail,
  MdOutlineVisibility,
} from "react-icons/md";
import BackgroundImage from "../assets/image6.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRegisterUserMutation } from "../services/authApi";

function SignupPage() {
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);
  const validateMobile = (mobile) => /^\d{10}$/.test(mobile);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let valid = true;

    // Validation
    if (name.trim() === "") { valid = false; toast.error("Your Name is required."); }
    if (mobile.trim() === "") { valid = false; toast.error("Mobile Number is required."); }
    else if (!validateMobile(mobile)) { valid = false; toast.error("Please enter a valid 10-digit number."); }
    if (email.trim() === "") { valid = false; toast.error("Email Address is required."); }
    else if (!validateEmail(email)) { valid = false; toast.error("Please enter a valid email address."); }
    if (password.trim() === "") { valid = false; toast.error("Password is required."); }
    else if (password.length < 6) { valid = false; toast.error("Password must be at least 6 characters long."); }
    if (confirmPassword.trim() === "") { valid = false; toast.error("Please confirm your password."); }
    else if (password !== confirmPassword) { valid = false; toast.error("Passwords do not match."); }
    if (!termsAccepted) { valid = false; toast.error("You must accept the terms."); }

    if (!valid) return;

    // API call
    try {
      await registerUser({ name, mobileNo: mobile, email, password, roles: "USER" }).unwrap();
      toast.success("Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("Failed to register the user: ", err);
      toast.error(err?.data?.message || "Registration failed. Please try again.");
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center font-sans bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-10 w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-2xl shadow-2xl bg-black/bg-opacity-30">
        <div className="mb-4">
          <Logo />
        </div>
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-100">Create Account</h2>
          <p className="text-sm text-gray-100 mt-2">
            Sign up to get started! It’s free and only takes a minute.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-3 text-sm">
          <InputWithIcon
            label="Your Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            icon={<MdOutlinePerson className="h-5 w-5 text-gray-100" />}
          />

          <InputWithIcon
            label="Mobile Number"
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            icon={<MdOutlinePhone className="h-5 w-5 text-gray-100" />}
          />

          <InputWithIcon
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MdOutlineEmail className="h-5 w-5 text-gray-100" />}
          />

          <InputWithIcon
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<MdOutlineVisibility className="h-5 w-5 text-gray-100" />}
          />

          <InputWithIcon
            label="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            icon={<MdOutlineVisibility className="h-5 w-5 text-gray-100" />}
          />

          <div className="flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={(e) => setTermsAccepted(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <span className="text-xs text-gray-200">
              I agree to the processing of <span className="text-indigo-600 font-medium">Personal data</span>
            </span>
          </div>

          <Button
            type="submit"
            className="mt-4 w-full rounded-full shadow-md py-2 text-sm"
            disabled={isLoading}
          >
            {isLoading ? "Signing Up..." : "Sign Up"}
          </Button>

          <p className="text-center text-xs text-gray-200 mt-3">
            Already have an account?
            <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500 ml-1">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignupPage;
