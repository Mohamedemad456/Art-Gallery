import React, { useState, useEffect } from 'react';
import { Modal, Box, Typography } from '@mui/material';
import styles from './AdminProfile.module.css';

const modalStyle = {
  position: 'absolute',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: 4,
  p: 4,
  overflowY: 'auto',
  maxHeight: '90vh',
};

const EditProfileDialog = ({ isOpen, onClose, admin, onSave }) => {
  const [editedAdmin, setEditedAdmin] = useState(admin);

  useEffect(() => {
    setEditedAdmin(admin);
  }, [admin]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAdmin((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedAdmin);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} className='flex items-center justify-center'>
      <Box sx={modalStyle} className={styles.fadeIn}>
        <Typography variant="h6" className="text-[#3D2B1F] font-semibold mb-4">
          Edit Profile
        </Typography>

        {['name', 'role', 'email', 'phone', 'location'].map((field) => (
          <div className="mb-4" key={field}>
            <label
              htmlFor={field}
              className="block text-[#3D2B1F] dark:text-gray-300 font-bold"
            >
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'email' ? 'email' : 'text'}
              id={field}
              name={field}
              value={editedAdmin[field] || ''}
              onChange={handleChange}
              placeholder={`Enter your ${field}`}
              className="w-full p-2 border rounded-md dark:bg-gray-700 dark:text-gray-200 font-semibold"
            />
          </div>
        ))}

        <div className="flex flex-col sm:flex-row justify-between gap-2 mt-4">
          <button
            onClick={onClose}
            className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-600 font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-[#C08B6F] text-white px-4 py-2 rounded-md hover:bg-[#a57055] font-semibold"
          >
            Save Changes
          </button>
        </div>
      </Box>
    </Modal>
  );
};

export default EditProfileDialog;
