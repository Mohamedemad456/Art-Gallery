import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faTimes } from '@fortawesome/free-solid-svg-icons';
import SnackbarAlert from '../SnackbarAlert/snackbarAlert';

const ProfileImageUpload = ({ registrationData }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info'
  });
  const navigate = useNavigate();

  const showAlert = (message, type = 'info') => {
    setSnackbar({ open: true, message, type });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSkip = async () => {
    await completeRegistration(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedImage) {
      showAlert('Please select an image or skip this step', 'warning');
      return;
    }
    await completeRegistration(selectedImage);
  };

  const completeRegistration = async (imageFile) => {
    setLoading(true);
    try {
      const formData = new FormData();
      
      // Add all registration data as strings
      formData.append('DisplayName', registrationData.displayName);
      formData.append('UserName', registrationData.userName);
      formData.append('Email', registrationData.email);
      formData.append('Password', registrationData.password);
      formData.append('Role', registrationData.role);
      
      // Add bio if it exists
      if (registrationData.bio) {
        formData.append('Bio', registrationData.bio);
      }

      // Add image if selected
      if (imageFile) {
        formData.append('Image', imageFile);
      }

      // Log the registration data for debugging
      console.log('Registration Data:', {
        displayName: registrationData.displayName,
        userName: registrationData.userName,
        email: registrationData.email,
        role: registrationData.role,
        bio: registrationData.bio,
        hasImage: !!imageFile
      });

      // Log FormData contents
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      const response = await axios.post('https://localhost:7043/api/Auth/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json'
        }
      });

      if (response.data.token) {
        sessionStorage.setItem('accessToken', response.data.token);
        showAlert('Registration successful!', 'success');
        navigate('/profile');
      }
    } catch (error) {
      console.error('Registration error:', error);
      // Log the detailed error response
      if (error.response) {
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      }
      showAlert(
        error.response?.data?.message || 
        error.response?.data?.error || 
        'Registration failed. Please try again.', 
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Add Profile Picture
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            This step is optional. You can add a profile picture now or skip this step.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="relative">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-32 w-32 rounded-full object-cover border-4 border-[#3D2B1F]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedImage(null);
                        setPreviewUrl(null);
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </button>
                  </div>
                ) : (
                  <div className="h-32 w-32 rounded-full border-4 border-dashed border-gray-300 flex items-center justify-center">
                    <FontAwesomeIcon icon={faImage} className="text-gray-400 text-4xl" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center">
              <label className="cursor-pointer bg-[#3D2B1F] text-white px-4 py-2 rounded-md hover:bg-[#C08B6F] transition-colors">
                <span>Choose Image</span>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#3D2B1F] hover:bg-[#C08B6F] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D2B1F] disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Complete Registration'}
            </button>
            <button
              type="button"
              onClick={handleSkip}
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#3D2B1F] disabled:opacity-50"
            >
              Skip This Step
            </button>
          </div>
        </form>
      </div>

      {snackbar.open && (
        <SnackbarAlert
          open={snackbar.open}
          message={snackbar.message}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          alertType={snackbar.type}
        />
      )}
    </div>
  );
};

export default ProfileImageUpload; 