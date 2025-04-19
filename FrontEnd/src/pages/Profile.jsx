import React, { useState } from 'react';
import UserProfile from '../components/UserProfile/UserProfile';
import UserModal from '../components/UserProfile/UserModal';
import Footer from '../components/Footer/Footer';

const Profile = () => {
  const [showModal, setShowModal] = useState(false);

  const handlePasswordChange = async (oldPassword, newPassword) => {
    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword, newPassword }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || 'Password change failed');
      }

      alert('Password changed successfully!');
      setShowModal(false);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center p-4">
      <UserProfile onChangePasswordClick={() => setShowModal(true)} />
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
