import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile/UserProfile';
import UserModal from '../components/UserProfile/UserModal';
import Footer from '../components/Footer/Footer';
import Loader from '../components/Loader/Loader';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState(null);
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
    const authToken = sessionStorage.getItem('authToken');

    if (!authToken) {
      navigate('/');
      return;
    }

    const fetchUserProfile = async () => {
      try {
        const res = await fetch('http://localhost:5093/api/User/profile', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!res.ok) {
          if (res.status === 401) {
            navigate('/login');
          }
          throw new Error('Failed to fetch user profile');
        }

        const data = await res.json();
        setUser({
          name: data.username,
          email: data.email,
          username: data.username,
        });
      } catch (err) {
        console.error(err);
        showAlert('Error loading profile. Please try again.', 'error');
      }
    };

    fetchUserProfile();
  }, [navigate]);

  const handlePasswordChange = async (oldPassword, newPassword) => {
    const authToken = sessionStorage.getItem('authToken');
    try {
      const res = await fetch('http://localhost:5093/api/User/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Password change failed');
      }

      showAlert('Password changed successfully!', 'success');
      setShowModal(false);
    } catch (error) {
      showAlert(error.message, 'error');
    }
  };

  if (!user) {
    return <Loader />;
  }

  return (
    <>
    {user && <Loader />}
      <div className="min-h-screen flex items-center justify-center p-4">
        <UserProfile
          user={user}
          onChangePasswordClick={() => setShowModal(true)}
          snackbar={snackbar}
          setSnackbar={setSnackbar}
        />
        {showModal && (
          <UserModal
            onClose={() => setShowModal(false)}
            onSubmit={handlePasswordChange}
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
