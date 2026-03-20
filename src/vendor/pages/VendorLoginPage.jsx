import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../../assets/image3.png";
import Button from "../../components/Button";
import InputWithIcon from "../../components/InputWithIcon";
import { MdOutlineEmail, MdOutlineVisibility } from "react-icons/md";
import Logo from "../../components/Logo";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../services/AuthApi";
import { useAuth } from "../../context/AuthContext";

function VendorLoginPage() {
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginMutation();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      toast.error("Please fill in all fields.");
      return;
    }
    if (!validateEmail(username)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    try {
      const res = await loginUser({ username, password }).unwrap();
      console.log("Vendor login success:", res);
      login(localStorage.getItem("accessToken"), "vendor");
      toast.success("Vendor login successful!");
      navigate("/vendor/dashboard");
    } catch (err) {
      console.error("Vendor login failed:", err);
      toast.error(
        err?.data?.message ||
        "Invalid credentials. Please check your email or password."
      );
    }
  };

  return (
    <div
      className="w-screen h-screen flex items-center justify-center bg-cover bg-center font-sans"
      style={{
        backgroundImage: `url(${LoginImage})`,
      }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-4xl shadow-2xl backdrop-blur-xs bg-black/bg-opacity-30">
        <div className="text-center mb-4">
          <div className="mb-4">
            <Logo />
          </div>
          <h1 className="text-3xl font-bold text-white">Vendor Login</h1>
          <p className="text-sm text-gray-100 mt-2">
            Welcome back, Vendor! Please sign in to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          {/* Email */}
          <InputWithIcon
            label="Email"
            type="email"
            name="vendor-login-email"
            placeholder="Enter your vendor email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            icon={<MdOutlineEmail className="h-6 w-6 text-gray-100" />}
          />

          {/* Password */}
          <InputWithIcon
            label="Password"
            type="password"
            name="vendor-login-password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            icon={<MdOutlineVisibility className="h-6 w-6 text-white" />}
          />

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-sm mt-2">
            <label className="flex items-center gap-2 text-gray-100">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-100 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>
            <Link
              to="/vendor/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"

            className="w-full mt-4 rounded-2xl shadow-lg shadow-indigo-500/50"
          >
            {isLoading ? "Logging in..." : "Login as Vendor"}
          </Button>

          {/* Vendor Signup Link */}
          <p className="text-center text-xs text-gray-100 mt-3 mb-5">
            Not registered as a vendor?
            <Link
              to="/vendor/signup"
              className="font-medium text-indigo-600 hover:text-indigo-700 ml-1"
            >
              Sign Up Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default VendorLoginPage;
