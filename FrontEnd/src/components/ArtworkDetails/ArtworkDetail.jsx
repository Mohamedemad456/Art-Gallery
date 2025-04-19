// components/ArtworkInfo.jsx
import React from "react";
import styles from "./ArtworkDetails.module.css";

const ArtworkDetails = ({ artwork, user, bidAmount, setBidAmount, handleBid, setShowHistory }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-6 gap-6`}>
      <img src={artwork.image} alt={artwork.title} className={`w-full rounded-lg col-span-4 max-w-6xl ${styles.fadeInRight}`} />
      <div className={`col-span-2 ${styles.fadeInLeft}`}>
        <h2 className="text-3xl font-bold">{artwork.title}</h2>
        <p className="text-gray-700 mt-2">
          By <strong>{artwork.artist}</strong>
        </p>
        <p className="mt-4">{artwork.description}</p>
        <p className="mt-4 text-sm text-gray-600">
          <strong>Category:</strong> {artwork.category}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          <strong>Tags:</strong> {artwork.tags.join(", ")}
        </p>
        <p className="mt-4 text-lg">
          <strong>Initial Price:</strong> ${artwork.initialPrice}
        </p>
        <p className="text-lg">
          <strong>Current Bid:</strong> ${artwork.currentBid}
        </p>
        <p className="text-sm text-gray-500">
          Auction from {artwork.auctionStart} to {artwork.auctionEnd}
        </p>

        {user?.role === "buyer" && (
          <form onSubmit={handleBid} className="mt-6 flex flex-col gap-3">
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2"
              placeholder={`Bid at least $${artwork.currentBid + 10}`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={artwork.currentBid + 10}
              required
            />
            <div className="flex flex-row gap-3">
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition w-64 "
            >
              Place Bid
            </button>
            <button
          onClick={() => setShowHistory(true)}
          className="bg-green-500 rounded-md text-white w-32 hover:bg-green-600 transition py-2"
        >
          Bid History
        </button>
        </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ArtworkDetails;
