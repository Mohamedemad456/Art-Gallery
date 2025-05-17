import React, { useState } from "react";
import styles from "./AdminProfile.module.css";
import EditProfileDialog from "./EditProfile";

const AdminProfile = ({ admin }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentAdmin, setCurrentAdmin] = useState(admin);

  const handleEditProfile = () => {
    setIsDialogOpen(true);
  };

  const handleSaveProfile = (updatedAdmin) => {
    setCurrentAdmin(updatedAdmin); // Save the updated data
  };

  return (
    <div
      className={`bg-white rounded-xl shadow-2xl max-w-6xl w-full p-8 ${styles.fadeIn} min-h-[80vh] flex justify-center items-center`}
    >
      <div
        className={`flex flex-col md:flex-row ${
          isDialogOpen ? "hidden sm:flex" : ""
        }`}
      >
        <div className="md:w-1/3 text-center mb-8 md:mb-0">
          <img
            src={currentAdmin.image}
            alt="Profile"
            className="rounded-full w-48 h-48 mx-auto mb-4 border-4 border-[#3D2B1F] dark:border-blue-900 transition-transform duration-300 hover:scale-105"
          />
          <h1 className="text-2xl font-bold text-[#3D2B1F] dark:text-white mb-2">
            {currentAdmin.name}
          </h1>
          <p className="text-[#3D2B1F] dark:text-gray-300">
            {currentAdmin.role}
          </p>
          <button
            className="mt-4 bg-[#3D2B1F] text-white px-4 py-2 rounded-lg hover:bg-[#C08B6F] transition-colors duration-300"
            onClick={handleEditProfile}
          >
            Edit Profile
          </button>
        </div>
        <div className="md:w-2/3 md:pl-8">
          <h2 className="text-xl font-semibold text-[#3D2B1F] dark:text-white mb-4">
            About Me
          </h2>
          <p className="text-[#3D2B1F] dark:text-gray-300 mb-6">
            {currentAdmin.about}
          </p>

          <h2 className="text-xl font-semibold text-[#3D2B1F] dark:text-white mb-4">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2 mb-6">
            {currentAdmin.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-[#C08B6F] text-white px-3 py-1 rounded-full text-sm hover:bg-[#3D2B1F] hover:text-white transition-colors duration-300"
              >
                {skill}
              </span>
            ))}
          </div>

          <h2 className="text-xl font-semibold text-[#3D2B1F] dark:text-white mb-4">
            Contact Information
          </h2>
          <ul className="space-y-2 text-[#3D2B1F] dark:text-gray-300">
            <li>Email: {currentAdmin.email}</li>
            <li>Phone: {currentAdmin.phone}</li>
            <li>Location: {currentAdmin.location}</li>
          </ul>
        </div>
      </div>

      {/* Edit Profile Dialog */}
      <EditProfileDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        admin={currentAdmin}
        onSave={handleSaveProfile}
      />
    </div>
  );
};

export default AdminProfile;
