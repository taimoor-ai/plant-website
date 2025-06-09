import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BlurText from "./BlurText";
import { jwtDecode } from "jwt-decode";
import { PlantContext } from "../../context/plantsContext";

const SignIn = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);

  const { setUserGlobal, userProfile, user, fetchUserProfile } =
    useContext(PlantContext);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await axios.post("http://localhost:3000/staff/login", {
        email,
        password,
      });

      const { success, token, message } = response.data;

      if (success) {
        localStorage.setItem("token", token);
        try {
          const decoded = jwtDecode(token);
          setUserGlobal(decoded);
          fetchUserProfile(decoded.id);
          setShowWelcome(true);
          
        } catch (err) {
          console.error("Token decoding error:", err);
          localStorage.removeItem("token");
          setUserToken(null);
          setErrorMsg("Invalid token received. Please try again.");
        }
      } else {
        setErrorMsg(message || "Login failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        // Known error from server
        const serverMessage = error.response.data?.message || "Login failed.";
        setErrorMsg(serverMessage);
      } else {
        // Network or unexpected error
        setErrorMsg("Network error. Please check your connection.");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnimationComplete = () => {
    setUserToken(localStorage.getItem("token"));
  };

  if (showWelcome)
    return (
      <div className="min-h-screen flex items-center justify-center bg-green-100">
        <BlurText
          text={
            user.role === "admin"
              ? `Welcome back, Admin ${userProfile.name} 🌿`
              : `Welcome back, Team Member ${userProfile.name} 🌱`
          }
          delay={250}
          animateBy="words"
          direction="top"
          onAnimationComplete={handleAnimationComplete}
          className="text-6xl font-extrabold tracking-wide text-green-900 text-center px-4"
        />
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 bg-green-100 p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-green-900 mb-6 leading-tight">
            Welcome to <br /> Plantify Dashboard
          </h1>
          <p className="text-green-800 text-lg mb-8 leading-relaxed">
            Empowering your green journey — <br />
            <span className="font-semibold">Admins manage, Employees grow</span>
          </p>
          <div className="flex items-center gap-8">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2909/2909769.png"
              alt="plant icon"
              className="w-20 h-20 object-contain"
            />
            <img
              src="https://cdn-icons-png.flaticon.com/512/766/766284.png"
              alt="plant illustration"
              className="w-28 h-28 rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-green-50">
          <h2 className="text-3xl font-semibold text-green-900 mb-8">
            Sign in to your account
          </h2>

          {errorMsg && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 text-sm">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSignIn}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-400"
                required
              />
            </div>
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center text-green-900 text-sm">
                <input type="checkbox" className="mr-2" />
                Remember me
              </label>
              <a href="#" className="text-sm text-green-700 hover:underline">
                Forgot Password?
              </a>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center items-center bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg shadow-lg transition duration-200 ${
                loading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <svg
                  className="animate-spin h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                  ></path>
                </svg>
              ) : (
                "SIGN IN"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
