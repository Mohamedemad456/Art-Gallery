import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ArtworkDetails from "../components/ArtworkDetails/ArtworkDetail";
import ArtworkModal from "../components/ArtworkDetails/ArtworkModal";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer";
import ArtCarousel from "../components/Carousel/Carousel";
import * as signalR from '@microsoft/signalr';

const API_BASE_URL = 'https://localhost:7043';

const Artwork = () => {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [carouselArtworks, setCarouselArtworks] = useState([]);
  const [bidAmount, setBidAmount] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [allArtworks, setAllArtworks] = useState([]);
  const [bidMessage, setBidMessage] = useState({ text: '', type: '' });
  const [connection, setConnection] = useState(null);

  const user = { role: "buyer" }; // Placeholder user
  const bidHistory = [
    { user: "Alice", amount: 210, date: "2025-04-12" },
    { user: "Bob", amount: 220, date: "2025-04-13" },
    { user: "Carol", amount: 250, date: "2025-04-14" },
  ];

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Artwork/artworks/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch artwork');
        }
        
        const data = await response.json();
        const formattedArtwork = {
          id: data.id,
          title: data.title || 'Untitled',
          artistName: data.artistName || 'Unknown Artist',
          description: data.description || 'No description available',
          initialPrice: data.startingPrice || 0,
          category: typeof data.category === 'object' ? data.category?.name || 'Uncategorized' : data.category || 'Uncategorized',
          medium: typeof data.medium === 'object' ? data.medium?.name || 'Unknown Medium' : data.medium || 'Unknown Medium',
          year: data.year || 'Unknown Year',
          image: data.imageUrl || '/default-artwork.jpg',
          tags: Array.isArray(data.tags) ? data.tags.map(tag => 
            typeof tag === 'object' ? tag.name || 'Unknown Tag' : tag
          ) : [],
          auctionStartTime: data.auctionStart || null,
          auctionEndTime: data.auctionEnd || null,
          currentBid: data.currentPrice || 0,
          artistImage: data.artist?.image ? `${API_BASE_URL}/${data.artist.image}` : '/default-artist.jpg',
          artistBio: data.artist?.bio || 'No biography available',
          artistEmail: data.artist?.email || 'No email available'
        };

        setArtwork(formattedArtwork);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    const fetchAllArtworks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Artwork/artworks`);
        if (!response.ok) {
          throw new Error('Failed to fetch all artworks');
        }
        const responseData = await response.json();
        
        // Ensure we have an array of artworks
        const artworksData = Array.isArray(responseData) ? responseData : 
                           Array.isArray(responseData.data) ? responseData.data : 
                           [];
        // Format all artworks to ensure they have proper string/number values
        const formattedArtworks = artworksData.map(art => ({
          id: art.id || Math.random().toString(),
          title: art.title || 'Untitled',
          artistName: art.artistName || 'Unknown Artist',
          description: art.description || 'No description available',
          initialPrice: art.startingPrice || 0,
          category: typeof art.category === 'object' ? art.category?.name || 'Uncategorized' : art.category || 'Uncategorized',
          medium: typeof art.medium === 'object' ? art.medium?.name || 'Unknown Medium' : art.medium || 'Unknown Medium',
          year: art.year || 'Unknown Year',
          image: art.imageUrl || '/default-artwork.jpg',
          tags: Array.isArray(art.tags) ? art.tags.map(tag => 
            typeof tag === 'object' ? tag.name || 'Unknown Tag' : tag
          ) : [],
          auctionStartTime: art.auctionStart || null,
          auctionEndTime: art.auctionEnd  || null,
          currentBid: art.currentBid || 0,
          artistImage: art.artist?.image ? `${API_BASE_URL}/${art.artist.image}` : '/default-artist.jpg',
          artistBio: art.artist?.bio || 'No biography available',
          artistEmail: art.artist?.email || 'No email available'
        }));

        setAllArtworks(formattedArtworks);
        // Set carousel artworks to a subset of all artworks
        setCarouselArtworks(formattedArtworks.slice(0, 5));
      } catch (err) {
        console.error('Error fetching all artworks:', err);
      }
    };

    fetchArtwork();
    fetchAllArtworks();
  }, [id]);

  // SignalR connection setup
  useEffect(() => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/bidHub`)
      .withAutomaticReconnect()
      .build();

    newConnection.start()
      .then(() => {
        console.log("SignalR Connected.");
        newConnection.invoke("JoinArtworkGroup", id);
      })
      .catch(err => console.error("SignalR Connection Error: ", err));

    newConnection.on("ReceiveBid", (bidDto) => {
      setArtwork(prev => ({
        ...prev,
        currentBid: bidDto.amount
      }));
    });

    setConnection(newConnection);

    return () => {
      if (newConnection) {
        newConnection.invoke("LeaveAuctionGroup", id)
          .catch(err => console.error("Error leaving group: ", err));
        newConnection.stop();
      }
    };
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    
    const authToken = sessionStorage.getItem('accessToken');
    if (!authToken) {
      setBidMessage({ text: 'Please login to place a bid', type: 'error' });
      return;
    }

    if (!bidAmount || isNaN(bidAmount) || parseFloat(bidAmount) <= 0) {
      setBidMessage({ text: 'Please enter a valid bid amount', type: 'error' });
      return;
    }

    if (parseFloat(bidAmount) < artwork.initialPrice) {
      setBidMessage({ text: `Bid can't be less than current price $${artwork.initialPrice}`, type: 'error' });
      return;
    }

    // Check if the artwork is defined
    if (!artwork) {
      setBidMessage({ text: 'Artwork data is not available.', type: 'error' });
      return;
    }

    // Check if the artwork has an associated auction
    if (!artwork.auctionStartTime || !artwork.auctionEndTime) {
      setBidMessage({ text: 'This artwork does not have an active auction.', type: 'error' });
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/Buyer/artworks/placeBid`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          artworkId: id,
          amount: parseFloat(bidAmount)
        })
      });

      // Check if the response body is empty
      const text = await response.text();
      let data;
      if (text) {
        data = JSON.parse(text);
      } else {
        data = {};
      }

      if (!response.ok) {
        throw new Error(data.message || 'Failed to place bid');
      }

      setBidMessage({ text: 'Bid placed successfully!', type: 'success' });
      setBidAmount(""); // Reset bid amount after successful bid
    } catch (error) {
      setBidMessage({ text: error.message || 'Failed to place bid', type: 'error' });
    }
  };

  useEffect(() => {
    if (bidMessage.text) {
      const timer = setTimeout(() => {
        setBidMessage({ text: '', type: '' });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [bidMessage]);

  if (loading) return <Loader />;
  if (error)
    return (
      <div className="text-center text-red-500 mt-10">Error: {error}</div>
    );

  if (!artwork) {
    return (
      <div className="text-center text-gray-500 mt-10">
        Artwork not found.
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 max-w-full sm:max-w-4xl md:max-w-5xl lg:max-w-7xl mx-auto">
        {bidMessage.text && (
          <div className={`w-full mb-4 p-4 rounded-lg ${
            bidMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {bidMessage.text}
          </div>
        )}
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
            artworkId={id}
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
