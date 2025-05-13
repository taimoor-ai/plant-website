import React from 'react';

const PlantLoader = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="bg-white/90 rounded-2xl p-8 flex flex-col items-center shadow-lg">
        <div className="relative w-24 h-24 mb-4">
          {/* Plant pot */}
          <div className="absolute bottom-0 w-24 h-12 bg-[#8B4513] rounded-b-2xl"></div>
          {/* Growing plant animation */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2">
            <div className="w-8 h-16 bg-green-500 rounded-t-full animate-[grow_1.5s_ease-in-out_infinite] origin-bottom"></div>
            <div className="w-6 h-12 bg-green-400 rounded-t-full animate-[grow_1.5s_ease-in-out_infinite_0.5s] origin-bottom absolute -left-4 bottom-0"></div>
            <div className="w-6 h-12 bg-green-400 rounded-t-full animate-[grow_1.5s_ease-in-out_infinite_1s] origin-bottom absolute -right-4 bottom-0"></div>
          </div>
        </div>
        <p className="text-green-700 font-medium">Adding your plant...</p>
      </div>
    </div>
  );
};

export default PlantLoader; 