import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-gray-700 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Plant Admin</h1>
      <div>
        <a href="#" className="hover:text-green-400 mr-4">Profile</a>
        <a href="#" className="hover:text-green-400">Logout</a>
      </div>
    </div>
  );
};

export default Navbar; 