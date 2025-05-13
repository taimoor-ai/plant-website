import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUpload, FiX, FiPlus } from 'react-icons/fi';
import PlantLoader from './PlantLoader';
import Notification from './Notification';

const AddPlant = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [formData, setFormData] = useState({
    name: '',
    commonName: '',
    description: '',
    stock: '',
    size: 'small',
    price: '',
    imageUrl: [''],
    category: '',
    isavailable: true,
    light: 'low',
    water: 'low'
  });

  const [errors, setErrors] = useState({});
  const [imageInputType, setImageInputType] = useState('url');
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageUrlChange = (index, value) => {
    const newImageUrls = [...formData.imageUrl];
    newImageUrls[index] = value;
    setFormData(prev => ({
      ...prev,
      imageUrl: newImageUrls
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      let finalImageUrls = [];

      if (imageInputType === 'url') {
        finalImageUrls = formData.imageUrl.filter(url => url.trim() !== '');
      } else {
        const formDataToSend = new FormData();
        
        Object.keys(formData).forEach(key => {
          if (key !== 'imageUrl') {
            formDataToSend.append(key, formData[key]);
          }
        });

        selectedFiles.forEach((file, index) => {
          formDataToSend.append('images', file);
        });

        formDataToSend.append('commonName', JSON.stringify(
          formData.commonName.split(',').map(name => name.trim()).filter(name => name !== '')
        ));

        formDataToSend.append('stock', Number(formData.stock));
        formDataToSend.append('price', Number(formData.price));

        const response = await axios.post('http://localhost:3000/product/plants/add', formDataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        
        if (response.data.success) {
          setNotification({
            show: true,
            message: 'Plant added successfully!',
            type: 'success'
          });
          setTimeout(() => {
            navigate('/plants');
          }, 1500);
        } else {
          setNotification({
            show: true,
            message: 'Failed to add plant. Please try again.',
            type: 'error'
          });
        }
        setIsLoading(false);
        return;
      }

      const submitData = {
        ...formData,
        commonName: formData.commonName.split(',').map(name => name.trim()).filter(name => name !== ''),
        stock: Number(formData.stock),
        price: Number(formData.price),
        imageUrl: finalImageUrls
      };

      const response = await axios.post('http://localhost:3000/product/plants/add', submitData);
      
      if (response.data.success) {
        setNotification({
          show: true,
          message: 'Plant added successfully!',
          type: 'success'
        });
        setTimeout(() => {
          navigate('/plants');
        }, 1500);
      } else {
        setNotification({
          show: true,
          message: 'Failed to add plant. Please try again.',
          type: 'error'
        });
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(error.response?.data?.errors || {});
      setNotification({
        show: true,
        message: 'Error adding plant. Please try again.',
        type: 'error'
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-8">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
      <div className="bg-white rounded-3xl shadow-lg p-8 relative">
        {isLoading && <PlantLoader />}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-green-900">Add New Plant</h2>
            <p className="text-gray-500 mt-1">Fill in the details to add a new plant to your collection</p>
          </div>
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Information */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Plant Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                  placeholder="Enter plant name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Common Names</label>
                <input
                  type="text"
                  name="commonName"
                  value={formData.commonName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Enter common names separated by commas"
                />
                <p className="text-sm text-gray-500 mt-1">Example: Snake Plant, Mother-in-law's Tongue, Sansevieria</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 h-32"
                  required
                  placeholder="Describe the plant..."
                />
              </div>
            </div>

            {/* Plant Details */}
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
                  <input
                    type="number"
                    name="stock"
                    value={formData.stock}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    min="0"
                    placeholder="Enter stock"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    required
                    min="0"
                    step="0.01"
                    placeholder="Enter price"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
                <select
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <input
                  type="text"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                  placeholder="Enter category"
                />
              </div>
            </div>
          </div>

          {/* Care Requirements */}
          <div className="bg-green-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-green-900 mb-4">Care Requirements</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Light Requirements *</label>
                <select
                  name="light"
                  value={formData.light}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="low">Low Light</option>
                  <option value="medium">Medium Light</option>
                  <option value="high">High Light</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Water Requirements *</label>
                <select
                  name="water"
                  value={formData.water}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  required
                >
                  <option value="low">Low Water</option>
                  <option value="medium">Medium Water</option>
                  <option value="high">High Water</option>
                </select>
              </div>
            </div>
          </div>

          {/* Images Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Plant Images</h3>
            <div className="flex gap-4 mb-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imageInputType"
                  value="url"
                  checked={imageInputType === 'url'}
                  onChange={() => setImageInputType('url')}
                  className="mr-2"
                />
                URL Input
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="imageInputType"
                  value="file"
                  checked={imageInputType === 'file'}
                  onChange={() => setImageInputType('file')}
                  className="mr-2"
                />
                File Upload
              </label>
            </div>

            {imageInputType === 'url' ? (
              <div>
                {formData.imageUrl.map((url, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="url"
                      value={url}
                      onChange={(e) => handleImageUrlChange(index, e.target.value)}
                      className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      required
                      placeholder="Enter image URL"
                    />
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setImageInputType('file')}
                  className="flex items-center text-green-600 hover:text-green-700 mt-2"
                >
                  <FiPlus className="mr-1" /> Add Image URL
                </button>
              </div>
            ) : (
              <div>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                  <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                    multiple
                    className="hidden"
                    id="file-upload"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <FiUpload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-gray-600">Click to upload or drag and drop</span>
                    <span className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</span>
                  </label>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <FiX />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              name="isavailable"
              checked={formData.isavailable}
              onChange={handleChange}
              className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
            />
            <label className="ml-2 text-gray-700">Available for Purchase</label>
          </div>

          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => navigate('/plants')}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700"
            >
              Add Plant
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlant;
