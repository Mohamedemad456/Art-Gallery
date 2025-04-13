import React, { useState } from 'react';
import styles from './AdminProfile.module.css';

const EditProfileDialog = ({ isOpen, onClose, admin, onSave }) => {
  const [editedAdmin, setEditedAdmin] = useState(admin);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin({
      ...editedAdmin,
      [name]: value,
    });
  };

  const handleSave = () => {
    onSave(editedAdmin);
    onClose();
  };

  return (
    isOpen && (
      <div className={`fixed inset-0 flex justify-center items-center z-50 ${styles.fadeIn}`}>
        <div className="bg-[#C08B6F] md:bg-white p-6 rounded-lg max-w-xlg w-full">
          <h2 className="text-xl font-semibold text-[#3D2B1F] dark:text-white mb-4">Edit Profile</h2>
          <div className="mb-4">
            <label className="block text-[#3D2B1F] dark:text-gray-300 font-bold" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={editedAdmin.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 font-semibold"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3D2B1F] dark:text-gray-300 font-bold" htmlFor="role">
              Role
            </label>
            <input
              type="text"
              id="role"
              name="role"
              value={editedAdmin.role}
              onChange={handleChange}
              placeholder="Enter your role"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 font-semibold"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3D2B1F] dark:text-gray-300 font-bold" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={editedAdmin.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 font-semibold"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3D2B1F] dark:text-gray-300 font-bold" htmlFor="phone">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={editedAdmin.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 font-semibold"
            />
          </div>
          <div className="mb-4">
            <label className="block text-[#3D2B1F] dark:text-gray-300 font-bold" htmlFor="location">
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              value={editedAdmin.location}
              onChange={handleChange}
              placeholder="Enter your location"
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 font-semibold"
            />
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2">
          <button
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 font-semibold"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="bg-[#3D2B1F] text-white px-4 py-2 rounded-md hover:bg-[#C08B6F] font-semibold"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    )
  );
};

export default EditProfileDialog;
