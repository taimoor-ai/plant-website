import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PlantLoader from './PlantLoader';
import Notification from './Notification';
import { FiUpload, FiX, FiPlus } from 'react-icons/fi';

const AddAccessory = () => {
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
    setFormData(prev => ({ ...prev, imageUrl: newImageUrls }));
  };

  const addImageUrlField = () => {
    setFormData(prev => ({ ...prev, imageUrl: [...prev.imageUrl, ''] }));
  };

  const removeImageUrlField = (index) => {
    setFormData(prev => ({
      ...prev,
      imageUrl: prev.imageUrl.filter((_, i) => i !== index)
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
      if (imageInputType === 'file') {
        const formDataToSend = new FormData();
        Object.keys(formData).forEach(key => {
          if (key !== 'imageUrl') {
            formDataToSend.append(key, formData[key]);
          }
        });
        selectedFiles.forEach((file) => {
          formDataToSend.append('images', file);
        });
        formDataToSend.append('commonName', JSON.stringify(
          formData.commonName.split(',').map(name => name.trim()).filter(name => name !== '')
        ));
        formDataToSend.append('stock', Number(formData.stock));
        formDataToSend.append('price', Number(formData.price));
        const response = await axios.post('http://localhost:3000/accessory/add/', formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(response.data)
        if (response.data.success) {
          setNotification({ show: true, message: 'Accessory added successfully!', type: 'success' });
          setTimeout(() => navigate('/accessories'), 1500);
        } else {
          setNotification({ show: true, message: 'Failed to add accessory. Please try again.', type: 'error' });
        }
        setIsLoading(false);
        return;
      }
      // URL input
      const submitData = {
        ...formData,
        commonName: formData.commonName.split(',').map(name => name.trim()).filter(name => name !== ''),
        stock: Number(formData.stock),
        price: Number(formData.price),
        imageUrl: formData.imageUrl.filter(url => url.trim() !== ''),
      };
      const response = await axios.post('http://localhost:3000/accessory/add', submitData);
      if (response.data.success) {
        setNotification({ show: true, message: 'Accessory added successfully!', type: 'success' });
        setTimeout(() => navigate('/accessories'), 1500);
      } else {
        setNotification({ show: true, message: 'Failed to add accessory. Please try again.', type: 'error' });
      }
      setIsLoading(false);
    } catch (error) {
      setErrors(error.response?.data?.errors || {});
      setNotification({ show: true, message: 'Error adding accessory. Please try again.', type: 'error' });
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-8">
      {notification.show && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification({ show: false, message: '', type: '' })}
        />
      )}
      <div className="bg-white rounded-3xl shadow-lg p-8 relative">
        {isLoading && <PlantLoader />}
        <h2 className="text-2xl font-bold text-green-900 mb-6">Add New Accessory</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter accessory name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Common Names</label>
              <input type="text" name="commonName" value={formData.commonName} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter common names separated by commas" />
              <p className="text-xs text-gray-500 mt-1">Example: Watering Can, Sprayer</p>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea name="description" value={formData.description} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 h-24" placeholder="Describe the accessory..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
              <input type="number" name="stock" value={formData.stock} onChange={handleChange} required min="0" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter stock" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} required min="0" step="0.01" className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter price" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Size *</label>
              <select name="size" value={formData.size} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <input type="text" name="category" value={formData.category} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter category" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Accessory Images</label>
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
                  {formData.imageUrl.map((url, idx) => (
                    <div key={idx} className="flex gap-2 mb-2">
                      <input type="url" value={url} onChange={e => handleImageUrlChange(idx, e.target.value)} required className="flex-1 p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500" placeholder="Enter image URL" />
                      {formData.imageUrl.length > 1 && (
                        <button type="button" onClick={() => removeImageUrlField(idx)} className="text-red-500 font-bold px-2">X</button>
                      )}
                    </div>
                  ))}
                  <button type="button" onClick={addImageUrlField} className="text-green-600 hover:text-green-800 mt-2 flex items-center"><FiPlus className="mr-1" /> Add Image URL</button>
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
                    <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
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
          </div>
          <div className="flex items-center">
            <input type="checkbox" name="isavailable" checked={formData.isavailable} onChange={handleChange} className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500" />
            <label className="ml-2 text-gray-700">Available for Purchase</label>
          </div>
          <div className="flex gap-4">
            <button type="button" onClick={() => navigate('/accessories')} className="flex-1 py-3 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700">Add Accessory</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAccessory;
