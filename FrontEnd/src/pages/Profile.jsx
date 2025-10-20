import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';
import { dummyAPI } from '../services/dummyData';

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
      // Disabled authentication check for demo
      // const authToken = sessionStorage.getItem('accessToken');

      // if (!authToken) {
      //   showAlert('Please login to view your profile', 'error');
      //   navigate('/signup');
      //   return;
      // }

      try {
        const response = await dummyAPI.getMe();

        setUser({
          email: response.email,
          username: response.name,
          role: response.role,
        });
      } catch (err) {
        console.error('Error fetching profile:', err);
        showAlert('Error loading profile. Please try again.', 'error');
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
