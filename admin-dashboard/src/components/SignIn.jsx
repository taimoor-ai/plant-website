import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignIn = ({ setUserToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
const handleSignIn = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post("http://localhost:3000/staff/login", {
      email,
      password,
    });

    console.log("Response data:", response.data); // ✅ Should show full object
    const { success, token, message } = response.data;

    if (success) {
      console.log("Received token:", token);
      localStorage.setItem("token", token);
      console.log("Saved token:", localStorage.getItem("token")); // ✅ Check immediately
      setUserToken(token)
      // navigate("/");
    } else {
      alert(message);
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error("Login error:", error);
  }
};

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="flex w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Left - Welcome Message */}
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

        {/* Right - Sign In Form */}
        <div className="w-1/2 p-12 flex flex-col justify-center bg-green-50">
          <h2 className="text-3xl font-semibold text-green-900 mb-8">
            Sign in to your account
          </h2>
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
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold text-lg shadow-lg transition duration-200"
            >
              SIGN IN
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
