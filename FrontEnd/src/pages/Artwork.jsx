import React, { useState } from "react";
import ArtworkDetails from "../components/ArtworkDetails/ArtworkDetail";
import ArtworkModal from "../components/ArtworkDetails/ArtworkModal";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer";
import ArtCarousel from "../components/Carousel/Carousel";

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

  const artworks = [
    {
      id: 1,
      image: 'https://i.pravatar.cc/300',
      title: 'Starry Night',
      artist: 'Vincent van Gogh',
    },
    {
      id: 2,
      image: 'https://i.pravatar.cc/300',
      title: 'The Scream',
      artist: 'Edvard Munch',
    },
    {
      id: 3,
      image: 'https://i.pravatar.cc/300',
      title: 'Mona Lisa',
      artist: 'Leonardo da Vinci',
    },
  ];

  const handleBid = (e) => {
    e.preventDefault();
    alert(`Placed a bid of $${bidAmount}`);
    setBidAmount("");
  };

  return (
    <>
      <Loader />
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
        <ArtworkDetails
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
        <div className="flex flex-col justify-center items-center mt-12 sm:mt-16 md:mt-24 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6">
            You May Also Like
          </h1>
          <ArtCarousel artworks={artworks} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Artwork;