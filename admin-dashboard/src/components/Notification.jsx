import React, { useEffect } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 animate-slide-in`}>
      <div className={`flex items-center p-4 rounded-lg shadow-sm backdrop-blur-sm ${
        type === 'success' ? 'bg-green-50/80 text-green-800' : 'bg-red-50/80 text-red-800'
      }`}>
        {type === 'success' ? (
          <FiCheckCircle className="w-6 h-6 mr-2 text-green-500" />
        ) : (
          <FiXCircle className="w-6 h-6 mr-2 text-red-500" />
        )}
        <p className="font-medium">{message}</p>
        <button
          onClick={onClose}
          className="ml-4 text-gray-500 hover:text-gray-700"
        >
          <FiXCircle className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification; 