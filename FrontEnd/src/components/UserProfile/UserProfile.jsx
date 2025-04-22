import React from 'react';
import SnackbarAlert from '../SnackbarAlert/snackbarAlert';

const UserProfile = ({ user, onChangePasswordClick, snackbar, setSnackbar }) => {
  return (
    <div className="relative flex justify-center">
      {snackbar.open && (
        <div className="absolute -top-20 w-full flex justify-center">
          <SnackbarAlert
            open={snackbar.open}
            message={snackbar.message}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            alertType={snackbar.type}
          />
        </div>
      )}

      <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 flex flex-col md:flex-row max-w-6xl w-full gap-10 items-center md:items-start justify-center md:justify-between">
        <div className="text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{user.name}</h2>
          <p className="text-gray-700 text-base md:text-lg mb-2">Email: {user.email}</p>
          <p className="text-gray-700 text-base md:text-lg mb-2">Username: {user.username}</p>
          <button
            onClick={onChangePasswordClick}
            className="mt-4 bg-[#3D2B1F] text-white px-5 py-2.5 rounded-lg hover:bg-[#C08B6F] transition text-base md:text-lg"
          >
            Change Password
          </button>
        </div>

        <div className="flex justify-center">
          <img
            src="https://i.pravatar.cc/300"
            alt="Profile"
            className="object-cover rounded-lg border-4 border-white shadow-md
              w-36 h-48
              md:w-[300px] md:h-[400px]
              lg:w-[400px] lg:h-[500px]"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
