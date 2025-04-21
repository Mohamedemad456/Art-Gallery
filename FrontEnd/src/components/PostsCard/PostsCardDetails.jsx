import React from 'react';
import styles from './PostsCard.module.css';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const PostsCardDetails = ({ item, onClose }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 ${styles.fadeIn}`}>
      <div className="bg-[#FDF6E3] md:bg-white rounded-lg shadow-lg p-6 w-full max-w-2xl relative mx-4 md:mx-0">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
          type="button"
        >
          <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Artwork Details</h2>
        <div className="space-y-2">
          <p><strong>Artist Name:</strong> {item?.artistName || 'N/A'}</p>
          <p><strong>Title:</strong> {item?.title || 'N/A'}</p>
          <p><strong>Description:</strong> {item?.description || 'N/A'}</p>
          <p><strong>Initial Price:</strong> ${item?.initialPrice?.toFixed(2) || 'N/A'}</p>
          <p><strong>Auction Start:</strong> {item?.auctionStart ? new Date(item.auctionStart).toLocaleString() : 'N/A'}</p>
          <p><strong>Auction End:</strong> {item?.auctionEnd ? new Date(item.auctionEnd).toLocaleString() : 'N/A'}</p>
          <p><strong>Category:</strong> {item?.category || 'N/A'}</p>
          <p><strong>Tags:</strong> {item?.tags?.join(', ') || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
};

export default PostsCardDetails;
