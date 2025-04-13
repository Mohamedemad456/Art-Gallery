import React, { useState } from "react";
import styles from "./Card.module.css";
import CardDetails from "./CardDetails";

const Card = ({ item }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className={`w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm ml-4 md:ml-0 ${styles.fadeIn}`}>
        <div className={`flex justify-end px-4 pt-4 relative`}>
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 2 0Zm6.041 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 8.041 0ZM14 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 14 0Z" />
            </svg>
          </button>

          {/* dropdown menu */}
          {isDropdownOpen && (
            <div className="absolute top-10 right-4 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44">
              <ul className="py-2">
                <li>
                  <button
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      setShowDetails(true);
                      setIsDropdownOpen(false);
                    }}
                  >
                    Details
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    Delete
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg"
            src={item?.img || "/assets/img-12.jpg"}
            alt={item?.title || "Profile"}
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900">
            {item?.title || "Bonnie Green"}
          </h5>
          <span className="text-sm text-gray-500">
            {item?.description || "Visual Designer"}
          </span>
          <div className="flex mt-4 md:mt-6">
            <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-[#3D2B1F] rounded-lg hover:bg-[#8B5E3C] focus:ring-4 focus:outline-none focus:ring-gray-300">
              Accept
            </button>
            <button className="py-2 px-4 ms-2 text-sm font-medium text-[#3D2B1F] focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-[#C08B6F] focus:z-10 focus:ring-4 focus:ring-gray-100">
              Decline
            </button>
          </div>
        </div>
      </div>

      {/* Pop-up dialog */}
      {showDetails && (
        <CardDetails
          item={item}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default Card;
