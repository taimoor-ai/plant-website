import React from 'react';
import Lottie from "lottie-react"
import loader from "../assets/animation/loading.json"

const PlantLoader = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-sm flex items-center justify-center z-20">
      <div className="flex justify-center items-center h-64">
            <Lottie
              animationData={loader}
              loop
              autoplay
              className="w-32 h-32"
            />
          </div>
    </div>
  );
};

export default PlantLoader; 