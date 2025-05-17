// CardDetails.jsx
import React from "react";
import styles from "./UserCard.module.css";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CardDetails = ({ item, onClose }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${styles.fadeIn}`}
    >
      <div className="bg-[#E8BEBE] md:bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative mx-4 md:mx-0">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
          type="button"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" size="lg" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Artist Details</h2>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <div className="w-20 font-semibold">Name:</div>
            <div>{item?.name || "N/A"}</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-20 font-semibold">Email:</div>
            <div className="break-all">{item?.email || "N/A"}</div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-20 font-semibold">Role:</div>
            <div className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm">
              {item?.role || "N/A"}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-20 font-semibold">Status:</div>
            <div className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-sm">
              {item?.approvalStatus || "Pending"}
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="w-20 font-semibold">Joined:</div>
            <div>{new Date(item?.createdAt || Date.now()).toLocaleDateString()}</div>
          </div>
          
          {item?.bio && (
            <div className="mt-4">
              <div className="font-semibold mb-2">Bio:</div>
              <div className="text-gray-600">{item.bio}</div>
            </div>
          )}
          
          {item?.portfolio && (
            <div className="mt-4">
              <div className="font-semibold mb-2">Portfolio:</div>
              <a 
                href={item.portfolio} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {item.portfolio}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
