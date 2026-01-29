
import {jwtDecode} from "jwt-decode";
import { useState } from "react"
import { X, Leaf } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useCart } from "../context/Cartcontext";
export default function SignInModal({ isOpen, onClose, onSwitchToSignUp }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError]=useState("")
  const navigate =useNavigate()
  const {handleSetUser} = useCart();
  if (!isOpen) return null
//   if(localStorage.getItem("access_token")){
//     return <h1>Taimooor profile </h1>
//   }
  const handleSubmit = async (e) => {
    setError("")
    e.preventDefault();
    console.log(email);
    console.log(password);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json(); // ✅ parse the response before checking
  
      if (!data.success) {
        setError(data.msg); // Show error if login failed
      } else {
        // Store token if login successful
        localStorage.setItem("access_token", data.access_token);
        const decoded = jwtDecode( data.access_token);
        handleSetUser(decoded)
        console.log("Login successful");
        onClose()
       navigate("/")
        // Navigate or do something else...
      }
    } catch (err) {
      console.log("Login error:", err);
      setError("Something went wrong. Please try again.");
    }
  };
  
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-6  cursor-pointer right-6 z-10 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex min-h-[600px]">
          {/* Left Side - Brand Section */}
          <div
            className="flex-1  w-full bg-cover bg-center relative"
            style={{
                backgroundImage: "url('https://media.istockphoto.com/id/682374404/photo/fern-background.jpg?s=612x612&w=0&k=20&c=su58fDNwExx6KbS1IlBSABuN7_qlZSyJeQHs06Xa0FI=')",
              }}              
          >
            <div className="absolute  inset-0   bg-opacity-20"></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-green text-white p-12">
              <div className="flex items-center gap-3 mb-6">
                <Leaf size={32} className="text-white" />
                <h1 className="text-4xl font-bold tracking-wider ">PLANTIFY</h1>
              </div>
              <p className="text-center text-lg opacity-90 max-w-sm text-white leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing.
              </p>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="flex-1 flex flex-col justify-center p-12 bg-gray-50">
            <div className="max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome</h2>
                <p className="text-gray-500">Log in to your account</p>
              </div>

              <form className="space-y-6">
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                  />
                </div>
                 <span className="text-rose-600"> 
                    {
                        error
                    }
                    
                 </span>
                <div className="text-right">
                  <button type="button" className=" cursor-pointer text-gray-900  hover:text-gray-800 text-sm transition-colors">
                    Forgot Password?
                  </button>
                </div>

                <button
                 type="submit"
                  onClick={handleSubmit}
                  className="w-full bg-green-800 cursor-pointer hover:bg-green-900 text-white font-semibold py-4 rounded-4xl transition-colors"
                >
                  Login
                </button>
              </form>

              <div className="text-center mt-8">
                <span className="text-gray-500">{"Don't have an account, "}</span>
                <button
                  onClick={onSwitchToSignUp}
                  className="text-gray-900 cursor-pointer font-semibold hover:text-green-800 transition-colors"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
