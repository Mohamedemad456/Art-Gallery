import React from 'react';

const UserProfile = ({ onChangePasswordClick }) => {
  return (
    <div className="bg-white shadow-2xl rounded-xl p-6 md:p-10 flex flex-col md:flex-row max-w-6xl w-full gap-10 items-center md:items-start justify-center md:justify-between">
      {/* User Info */}
      <div className="text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">John Doe</h2>
        <p className="text-gray-700 text-base md:text-lg mb-2">Email: johndoe@example.com</p>
        <p className="text-gray-700 text-base md:text-lg mb-2">Username: johndoe</p>
        <button
          onClick={onChangePasswordClick}
          className="mt-4 bg-blue-600 text-white px-5 py-2.5 rounded-lg hover:bg-blue-700 transition text-base md:text-lg"
        >
          Change Password
        </button>
      </div>

      {/* Responsive Image */}
      <div className="flex justify-center">
        <img
          src="https://i.pravatar.cc/300"
          alt="Profile"
          className="
            object-cover rounded-lg border-4 border-white shadow-md
            w-36 h-48       /* sm: 150x200 */
            md:w-[300px] md:h-[400px]
            lg:w-[400px] lg:h-[500px]
          "
        />
      </div>
    </div>
  );
};

export default UserProfile;
