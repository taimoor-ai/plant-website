import React from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';

const MainContent = () => {
  return (
    <div className="w-[700px] bg-white rounded-3xl shadow-lg p-10 min-h-[80vh]">
      {/* Top bar: Welcome, date, search, notification */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-row justify-items-start ">
          <h2 className="text-2xl font-bold text-green-900 mb-2">Wellcome Back, <span className="text-green-600">Sumarti !</span></h2>
          <div className="text-gray-400 text-sm mb-1">Saturday, 27 Jul 2022</div>
        </div>
        <div className="flex gap-4">
          <button className="bg-[#F6FAF7] p-3 rounded-xl text-gray-400 hover:text-green-600"><FaSearch size={18} /></button>
          <button className="bg-[#F6FAF7] p-3 rounded-xl text-gray-400 hover:text-green-600"><FaBell size={18} /></button>
        </div>
      </div>
      {/* Plant Card */}
      <div className="bg-[#F6FAF7] rounded-2xl p-6 flex items-center gap-6 mb-8 shadow-sm">
        <img src="https://img.icons8.com/color/48/000000/tomato.png" alt="Tomato" className="w-16 h-16 rounded-full border-4 border-white shadow" />
        <div>
          <div className="font-bold text-lg text-green-900">Tomatoes</div>
          <div className="text-gray-400 text-sm italic">Solanum lycopersicum</div>
        </div>
        <div className="flex-1 flex justify-end gap-4">
          <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
            <span className="text-green-600 font-bold text-lg">72%</span>
            <span className="text-xs text-gray-400 mt-1">Humidity</span>
          </div>
          <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
            <span className="text-green-600 font-bold text-lg">3.4</span>
            <span className="text-xs text-gray-400 mt-1">Daily Water pH</span>
          </div>
          <div className="bg-white rounded-xl p-4 flex flex-col items-center shadow">
            <span className="text-green-600 font-bold text-lg">18 - 24°C</span>
            <span className="text-xs text-gray-400 mt-1">Temperature</span>
          </div>
        </div>
      </div>
      {/* Plant Details and Water Level */}
      <div className="flex gap-6">
        <div className="flex-1 bg-[#F6FAF7] rounded-2xl p-6 shadow-sm">
          <div className="font-bold text-green-900 mb-2">Plant Details</div>
          <div className="h-32 flex items-center justify-center text-gray-400">[Chart Placeholder]</div>
        </div>
        <div className="w-1/3 bg-[#F6FAF7] rounded-2xl p-6 shadow-sm">
          <div className="font-bold text-green-900 mb-2">Water Level</div>
          <div className="h-32 flex items-center justify-center text-gray-400">[Water Chart]</div>
        </div>
      </div>
    </div>
  );
};

export default MainContent; 