import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    type: 'info',
  });

  const navigate = useNavigate();

  const showAlert = (message, type = 'info') => {
    setSnackbar({ open: true, message, type });
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = sessionStorage.getItem('accessToken');

      if (!authToken) {
        showAlert('Please login to view your profile', 'error');
        navigate('/signup');
        return;
      }

      try {
        // Verify token expiration
        const decodedToken = jwtDecode(authToken);
        const currentTime = Date.now() / 1000;
        
        if (decodedToken.exp < currentTime) {
          sessionStorage.removeItem('accessToken');
          showAlert('Your session has expired. Please login again.', 'error');
          navigate('/signup');
          return;
        }

        const response = await axios.get('https://localhost:7043/api/Auth/me', {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json'
          }
        });

        setUser({
          email: response.data.email,
          username: response.data.displayName,
          role: response.data.role,
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        if (err.response?.status === 401) {
          sessionStorage.removeItem('accessToken');
          showAlert('Your session has expired. Please login again.', 'error');
          navigate('/signup');
        } else {
          showAlert('Error loading profile. Please try again.', 'error');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate]);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center p-4">
        <UserProfile
          user={user}
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
      </div>
      <Footer />
    </>
  );
};

export default Profile;
