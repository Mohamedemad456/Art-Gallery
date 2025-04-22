import React, { useState } from 'react';
import styles from './UserProfile.module.css';

const UserModal = ({ onClose, onSubmit }) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(oldPassword, newPassword);
  };

  return (
    <div className={`fixed inset-0 flex justify-center items-center z-50 ${styles.fadeIn}`}>
      <div className="bg-[#F8EDE3] rounded-lg p-6 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 text-gray-700">Old Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 text-gray-700">New Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 p-2 rounded"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#3D2B1F] hover:bg-[#C08B6F] text-white rounded transition"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserModal;
