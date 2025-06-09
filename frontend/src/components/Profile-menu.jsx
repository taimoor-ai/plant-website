

import { User, Settings, HelpCircle, LogOut, Shield, Bell } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ProfileMenu({ isOpen, onClose, user, onLogout }) {
  if (!isOpen) return null
  const navigate = useNavigate();
  const handleonClick=()=>{
    onClose()
    navigate("/contact-us")
  }
  return (
    <>
      {/* Backdrop */}
      <div className="fixed  inset-0 z-40" onClick={onClose}></div>

      {/* Profile Menu */}
      <div className="absolute ml-20 right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden">
        {/* User Info Section */}
        <div className="p-6 bg-gradient-to-r from-green-50 to-green-100 border-b border-gray-100">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center text-white text-xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">{user.name}</h3>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-green-600 font-medium">Online</span>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div className="py-2">
          <MenuItem icon={User} label="My Profile" description="View and edit your profile" />
          <MenuItem icon={Settings} label="Account Settings" description="Privacy, security, and preferences" />
          <MenuItem icon={Bell} label="Notifications" description="Manage your notifications" />
          {/* <MenuItem icon={Shield} label="Privacy & Security" description="Control your privacy settings" /> */}
          <MenuItem icon={HelpCircle}  onClick={handleonClick} label="Help & Support" description="Get help and contact support" />
        </div>

        {/* Logout Section */}
        <div className="border-t border-gray-100 p-2">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors"
          >
            <LogOut size={20} />
            <div className="text-left">
              <div className="font-medium">Sign Out</div>
              <div className="text-xs text-gray-500">Sign out of your account</div>
            </div>
          </button>
        </div>
      </div>
    </>
  )
}

function MenuItem({ icon: Icon, label, description, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-6 py-3 hover:bg-gray-50 transition-colors">
      <Icon size={20} className="text-gray-600" />
      <div className="text-left cursor-pointer  flex-1" >
        <div className="font-medium text-gray-900">{label}</div>
        <div className="text-xs text-gray-500">{description}</div>
      </div>
    </button>
  )
}
