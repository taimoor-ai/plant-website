
import { useState } from "react"
import { X, Leaf } from "lucide-react"

export default function SignUpModal({ isOpen, onClose, onSwitchToSignIn }) {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden relative">
        <button
          onClick={onClose}
          className="absolute top-6 cursor-pointer right-6 z-10 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>

        <div className="flex min-h-[600px]">
          {/* Left Side - Brand Section */}
          <div
            className="flex-1 bg-cover bg-center relative"
            style={{
                backgroundImage: "url('https://media.istockphoto.com/id/682374404/photo/fern-background.jpg?s=612x612&w=0&k=20&c=su58fDNwExx6KbS1IlBSABuN7_qlZSyJeQHs06Xa0FI=')",
              }}     
          >
            <div className="absolute inset-0 text-white bg-black bg-opacity-20"></div>
            <div className="relative z-10 flex flex-col justify-center items-center h-full text-white p-12">
              <div className="flex items-center gap-3 mb-6">
                <Leaf size={32} className="text-white" />
                <h1 className="text-4xl font-bold tracking-wider">PLANTO</h1>
              </div>
              <p className="text-center text-lg opacity-90 max-w-sm leading-relaxed">
                Lorem ipsum dolor sit amet consectetur adipiscing.
              </p>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="flex-1 flex flex-col justify-center p-12 bg-gray-50">
            <div className="max-w-sm mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Join Us</h2>
                <p className="text-gray-500">Create your account</p>
              </div>

              <form className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="px-4 py-4 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="px-4 py-4 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                  />
                </div>

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

                <div>
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-4 bg-gray-200 border-0 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:bg-white transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full  bg-green-800 cursor-pointer hover:bg-green-900 text-white font-semibold py-4 rounded-4xl  transition-colors mt-6"
                >
                  Sign Up
                </button>
              </form>

              <div className="text-center mt-8">
                <span className="text-gray-500">Already have an account? </span>
                <button
                  onClick={onSwitchToSignIn}
                  className="text-gray-900 font-semibold hover:text-green-800 transition-colors"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
