import React from "react";
import styles from "./ArtworkDetails.module.css";

const ArtworkDetails = ({ artwork, user, bidAmount, setBidAmount, handleBid, setShowHistory }) => {
  // Format auction dates for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Fallback for currentBid (use initialPrice if not available)
  const currentBid = artwork.currentBid ?? artwork.initialPrice;

  return (
    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 sm:gap-6">
      <img
        src={artwork.image}
        alt={artwork.title}
        className={`w-full rounded-lg max-h-[500px] object-cover md:col-span-4 ${styles.fadeInRight}`}
      />
      <div className={`md:col-span-2 ${styles.fadeInLeft}`}>
        <h2 className="text-2xl sm:text-3xl font-bold">{artwork.title}</h2>
        <p className="text-gray-700 mt-1 sm:mt-2">
          By <strong>{artwork.artistName}</strong>
        </p>
        <p className="mt-2 sm:mt-4 text-sm sm:text-base">{artwork.description}</p>
        <p className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600">
          <strong>Category:</strong> {artwork.category}
        </p>
        <p className="mt-1 text-xs sm:text-sm text-gray-600">
          <strong>Tags:</strong> {artwork.tags.join(", ")}
        </p>
        <p className="mt-2 sm:mt-4 text-base sm:text-lg">
          <strong>Initial Price:</strong> ${artwork.initialPrice}
        </p>
        <p className="text-base sm:text-lg">
          <strong>Current Bid:</strong> ${currentBid}
        </p>
        <p className="text-xs sm:text-sm text-gray-500">
          Auction from {formatDate(artwork.auctionStartTime)} to{" "}
          {formatDate(artwork.auctionEndTime)}
        </p>

        {user?.role === "buyer" && (
          <form onSubmit={handleBid} className="mt-4 sm:mt-6 flex flex-col gap-2 sm:gap-3">
            <input
              type="number"
              className="border border-gray-300 rounded-md p-2 text-sm sm:text-base w-full sm:w-3/4"
              placeholder={`Bid at least $${currentBid + 10}`}
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              min={currentBid + 10}
              required
            />
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition text-sm sm:text-base sm:w-64"
              >
                Place Bid
              </button>
              <button
                type="button"
                onClick={() => setShowHistory(true)}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition text-sm sm:text-base sm:w-32"
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