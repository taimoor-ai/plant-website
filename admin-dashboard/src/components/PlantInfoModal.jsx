import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';

const PlantInfoModal = ({ plant, onClose }) => {


  const [fullPlant, setFullPlant] = useState(plant);

  useEffect(() => {
    fetchPlantById();
  }, []);

  const fetchPlantById = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/product/plants/${plant._id}`);
      setFullPlant(res.data);
    } catch (err) {
      console.error("Error fetching plant:", err);
    }
  };

  if (!plant) {return null};
  return (
   
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{ backgroundColor: 'rgba(27, 43, 43, 0.6)' }}
  className="fixed inset-0 backdrop-blur-md z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.5 }}
          className="bg-white rounded-3xl max-w-xs w-full relative"
          onClick={e => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          >
            <FiX size={22} />
          </button>

          {/* Plant Image */}
          <div className="bg-[#C4E8C2] rounded-t-3xl pt-6 flex justify-center">
            <img
              src={fullPlant.imageUrl[0]}
              alt={fullPlant.name}
              className="h-50 w-full object-contain"
            />
          </div>

          {/* Content */}
          <div className="px-5 py-4 relative">
            {/* Heart Icon */}
            <div className="absolute top-3 right-5">
              <FaHeart className="text-red-500 text-xl" />
            </div>

            {/* Title */}
            <h2 className="text-lg font-bold text-green-800 uppercase mb-2">
              {fullPlant.name}
            </h2>

            {/* Description */}
            <p className="text-sm text-gray-600 mb-3">
              {fullPlant.description}
            </p>

            {/* Price */}
            <div className="text-right mb-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                ₹ {fullPlant.price}
              </span>
            </div>

            {/* Tags */}
            <div className="space-y-2 text-sm text-gray-700 mb-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                <span>{fullPlant.category} Plants</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                <span>{fullPlant.water}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-green-600 rounded-full"></span>
                <span>{fullPlant.light} sun</span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PlantInfoModal;
