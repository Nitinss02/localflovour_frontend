import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginImage from "../assets/image3.png";
import Button from "../components/Button";
import InputWithIcon from "../components/InputWithIcon";
import { MdOutlineEmail, MdOutlineVisibility } from "react-icons/md";
import Logo from "../components/Logo";
import { toast } from "react-toastify";
import { useLoginMutation } from "../services/authApi";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const navigate = useNavigate();
  const [loginUser, { isLoading, error }] = useLoginMutation();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const validateEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    setEmailError("");
    setPasswordError("");

    if (username.trim() === "") {
      setEmailError("Email is required.");
      toast.error("Email is required.");
      valid = false;
    } else if (!validateEmail(username)) {
      setEmailError("Please enter a valid email address.");
      toast.error("Please enter a valid email address.");
      valid = false;
    }

    if (password.trim() === "") {
      setPasswordError("Password is required.");
      toast.error("Password is required.");
      valid = false;
    }

    if (valid) {
      try {
        const res = await loginUser({ username, password }).unwrap();
        console.log("Login success:", res);
        login(localStorage.getItem("accessToken"), "user");
        toast.success("Login successful!");
        navigate("/");
      } catch (err) {
        console.error("Login failed:", err);

        toast.error(
          err?.data?.message ||
          "Oh no! Your email or password is incorrect. Please try again."
        );
      }
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

      <div className="relative z-10  w-full max-w-md py-8 px-6 sm:px-10 p-2 rounded-4xl shadow-2xl  backdrop-blur-xs bg-black/bg-opacity-30">
        <div className="text-center mb-4">
          <div className="mb-4">

            <Logo />
          </div>
          <h1 className="text-4xl font-bold text-white">Login</h1>
          <p className="text-base text-gray-100 mt-2">Welcome</p>
          <p className="text-base text-gray-100">
            Please enter your details to continue.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
          {/* Email */}
          <div>
            <InputWithIcon
              label="Email"
              type="email"
              name="login-email"
              placeholder="Enter your email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={<MdOutlineEmail className="h-6 w-6 text-gray-100" />}
            />

          </div>

          {/* Password */}
          <div>
            <InputWithIcon
              label="Password"
              type="password"
              name="login-password"
              placeholder="••••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<MdOutlineVisibility className="h-6 w-6 text-white" />}
            />

          </div>

          {/* Remember me & Forgot password */}
          <div className="flex items-center justify-between text-base mt-2">
            <label className="flex items-center gap-2 text-gray-100">
              <input
                type="checkbox"
                className="h-5 w-5 rounded border-gray-100 text-indigo-600 focus:ring-indigo-500"
              />
              Remember me
            </label>
            <Link
              to="/forgot-password"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Forgot password
            </Link>
          </div>

          {/* Submit Button */}
          <div className="mt-3">
            <Button
              type="submit"
              className="w-full rounded-2xl shadow-lg shadow-indigo-500/50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </div>

          {/* Sign up link */}
          <p className="text-center text-base text-gray-100 mt-2 mb-5">
            Don't have an account?
            <Link
              to="/signup"
              className="font-medium text-indigo-600 hover:text-indigo-700 ml-1"
            >
              Create new
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
