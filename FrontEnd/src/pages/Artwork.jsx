// pages/CardDetails.jsx
import React, { useState } from "react";
import ArtworkDetail from "../components/ArtworkDetails/ArtworkDetail";
import ArtworkModal from "../components/ArtworkDetails/ArtworkModal";
import Loader from "../components/Loader/Loader";

const Artwork = () => {
  const [bidAmount, setBidAmount] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const dummyArtwork = {
    image: "/assets/img-06.jpg",
    title: "Sunset Harmony",
    artist: "Jane Doe",
    description: "A peaceful blend of colors during a tranquil sunset.",
    category: "Nature",
    tags: ["sunset", "landscape", "calm"],
    initialPrice: 200,
    currentBid: 250,
    auctionStart: "2025-04-10",
    auctionEnd: "2025-04-20",
  };

  const dummyUser = {
    role: "buyer",
  };

  const dummyBidHistory = [
    { user: "Alice", amount: 210, date: "2025-04-12" },
    { user: "Bob", amount: 220, date: "2025-04-13" },
    { user: "Carol", amount: 250, date: "2025-04-14" },
  ];

  const handleBid = (e) => {
    e.preventDefault();
    alert(`Placed a bid of $${bidAmount}`);
    setBidAmount("");
  };

  return (
    <>
      <Loader />
      <div className="flex justify-center items-center p-6 max-w-5xl mx-50">
        <ArtworkDetail
          artwork={dummyArtwork}
          user={dummyUser}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          handleBid={handleBid}
          setShowHistory={setShowHistory}
        />

        {showHistory && (
          <ArtworkModal
            history={dummyBidHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
      </div>
    </>
  );
};

export default Artwork;
