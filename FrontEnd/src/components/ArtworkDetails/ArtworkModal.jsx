// components/BidHistoryModal.jsx
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import styles from "./ArtworkDetails.module.css";

const ArtworkModal = ({ onClose, artworkId }) => {
  const [bidHistory, setBidHistory] = useState([]);
console.log(artworkId);
  useEffect(() => {
    const fetchBidHistory = async () => {
      try {
        const response = await fetch(`https://localhost:7043/api/Artwork/artworks/${artworkId}/bids`);
        if (!response.ok) {
          throw new Error('Failed to fetch bid history');
        }
        const data = await response.json();
        setBidHistory(data);
      } catch (error) {
        console.error('Error fetching bid history:', error);
      }
    };

    fetchBidHistory();
  }, [artworkId]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${styles.fadeIn}`}>
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative mx-4">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:bg-gray-100 focus:outline-none rounded-full p-2"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-xl font-bold mb-4">Bid History</h2>
        {bidHistory.length > 0 ? (
          <ul className="space-y-2">
            {bidHistory.map((bid, index) => (
              <li key={index} className="border-b pb-2">
                <p>
                  <strong>${bid.amount}</strong> by {bid.buyerName} on {new Date(bid.createdAt).toLocaleString()}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No bid history available.</p>
        )}
      </div>
    </div>
  );
};

export default ArtworkModal;
