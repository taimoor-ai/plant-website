import React, { useContext, useState, useEffect } from "react";
import { PlantContext } from "../../context/plantsContext";
import { FiEdit2, FiSave, FiX } from "react-icons/fi";
import axios from "axios";

const Profile = () => {
  const { userProfile } = useContext(PlantContext);

  const originalData = {
    _id: userProfile._id || "",
    name: userProfile.name || "",
    email: userProfile.email || "",
    profileImage: userProfile.profileImage || "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(originalData);
  const [hasChanges, setHasChanges] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    setHasChanges(
      profileData.name !== originalData.name ||
      profileData.email !== originalData.email ||
      profileData.profileImage !== originalData.profileImage
    );
  }, [profileData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "profileImage" && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData((prev) => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(files[0]);
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData();
    formData.append("name", profileData.name);
    formData.append("email", profileData.email);

    if (profileData.profileImage) {
      formData.append("profileImage", profileData.profileImage);
    }

    try {
       await axios.put(
        `http://localhost:3000/staff/${profileData._id}`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setMessage({ type: "success", text: "Profile updated successfully!" });
      setIsEditing(false);
      setHasChanges(false);
    } catch (error) {
      console.error("Profile update error", error);
      setMessage({
        type: "error",
        text: error?.response?.data?.message || "Something went wrong!",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setProfileData(originalData);
    setIsEditing(false);
    setHasChanges(false);
    setMessage({ type: "", text: "" });
  };

  return (
    <div className="flex justify-center items-center min-h-[85vh] bg-gradient-to-r from-green-100 to-green-200 p-6">
      <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md border border-green-100 rounded-3xl shadow-2xl p-8 transition duration-300 hover:shadow-green-300">
        <h2 className="text-4xl font-extrabold text-green-900 text-center mb-6">My Profile</h2>

        <div className="flex flex-col items-center gap-6">
          {/* Profile image */}
          <div className="relative group w-32 h-32">
            <img
              src={profileData.profileImage}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md transition-transform duration-200 group-hover:scale-105"
            />
            {isEditing && (
              <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white rounded-full cursor-pointer group-hover:opacity-100 opacity-0 transition">
                <FiEdit2 size={20} />
                <input
                  type="file"
                  name="profileImage"
                  accept="image/*"
                  className="hidden"
                  onChange={handleChange}
                />
              </label>
            )}
          </div>

          {/* Form */}
          <div className="w-full space-y-4 mt-2">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profileData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-300 outline-none bg-white"
                />
              ) : (
                <p className="text-lg font-semibold text-green-800">{profileData.name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 ring-green-300 outline-none bg-white"
                />
              ) : (
                <p className="text-green-800">{profileData.email}</p>
              )}
            </div>
          </div>

          {/* Message */}
          {message.text && (
            <p className={`mt-4 text-center font-semibold ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
              {message.text}
            </p>
          )}

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  disabled={!hasChanges || isLoading}
                  className={`flex items-center justify-center gap-2 px-5 py-2 rounded-lg shadow-md transition 
                    ${hasChanges && !isLoading ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
                >
                  {isLoading ? (
                    // Spinner: simple CSS animation
                    <svg
                      className="animate-spin h-5 w-5 text-white"
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
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                  ) : (
                    <>
                      <FiSave />
                      Save
                    </>
                  )}
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-2 px-5 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
                  disabled={isLoading}
                >
                  <FiX /> Cancel
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-2 px-5 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition"
              >
                <FiEdit2 /> Edit Profile
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
