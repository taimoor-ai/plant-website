import React from 'react';
import { FiX } from 'react-icons/fi';

const ConfirmCardRight = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed top-1/2 right-6 transform -translate-y-1/2 z-50">
      <div className="bg-white border border-gray-200 shadow-xl rounded-xl p-6 w-80">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-md font-semibold text-gray-800">{title || 'Confirm?'}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={18} />
          </button>
        </div>

        <p className="text-sm text-gray-600 mb-5">
          {message || 'Are you sure you want to proceed with this action?'}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCardRight;
