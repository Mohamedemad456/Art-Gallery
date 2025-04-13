// CardDetails.jsx
import React from "react";
import styles from "./Card.module.css";
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

        <h2 className="text-2xl font-bold mb-4">Details</h2>
        <div className="space-y-2">
          <p>
            <strong>Title:</strong> {item?.title || "N/A"}
          </p>
          <p>
            <strong>Description:</strong> {item?.description || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {item?.email || "example@mail.com"}
          </p>
          <p>
            <strong>Joined:</strong> {item?.joined || "2025-04-01"}
          </p>
          <p>
            <strong>Status:</strong> {item?.status || "Pending"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;
