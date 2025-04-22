import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArtworkDetails from "../components/ArtworkDetails/ArtworkDetail";
import ArtworkModal from "../components/ArtworkDetails/ArtworkModal";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer";
import ArtCarousel from "../components/Carousel/Carousel";

const Artwork = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [bidAmount, setBidAmount] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Placeholder user (replace with actual user context/auth)
  const user = { role: "buyer" }; // Adjust based on your auth system

  // Placeholder bid history (replace with API call if available)
  const bidHistory = [
    { user: "Alice", amount: 210, date: "2025-04-12" },
    { user: "Bob", amount: 220, date: "2025-04-13" },
    { user: "Carol", amount: 250, date: "2025-04-14" },
  ];

  // Static carousel artworks (replace with API call if needed)
  const carouselArtworks = [
    {
      id: 1,
      image: "https://i.pravatar.cc/300",
      title: "Starry Night",
      artist: "Vincent van Gogh",
    },
    {
      id: 2,
      image: "https://i.pravatar.cc/300",
      title: "The Scream",
      artist: "Edvard Munch",
    },
    {
      id: 3,
      image: "https://i.pravatar.cc/300",
      title: "Mona Lisa",
      artist: "Leonardo da Vinci",
    },
  ];

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`http://localhost:5093/api/Artwork/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch artwork");
        }
        const data = await response.json();
        setArtwork(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtwork();
  }, [id]);

  const handleBid = (e) => {
    e.preventDefault();
    alert(`Placed a bid of $${bidAmount}`);
    setBidAmount("");
    // Implement actual bid submission to API here
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
        <ArtworkDetails
          artwork={artwork}
          user={user}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          handleBid={handleBid}
          setShowHistory={setShowHistory}
        />
        {showHistory && (
          <ArtworkModal
            history={bidHistory}
            onClose={() => setShowHistory(false)}
          />
        )}
        <div className="flex flex-col justify-center items-center mt-12 sm:mt-16 md:mt-24 w-full">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-4 sm:mb-6">
            You May Also Like
          </h1>
          <ArtCarousel artworks={carouselArtworks} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Artwork;