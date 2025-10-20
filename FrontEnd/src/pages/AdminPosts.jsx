import React, { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader";
import PostsCard from "../components/PostsCard/PostsCard";
import { dummyAPI } from "../services/dummyData";

const AdminPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPendingArtworks = async () => {
    try {
      const responseData = await dummyAPI.getPendingArtworks();
      const artworksData = responseData.data || [];
      
      const transformedData = artworksData
        .filter(artwork => artwork.approvalStatus === 'Pending')
        .map(artwork => ({
          id: artwork.id,
          artistName: artwork.artistName || artwork.artist?.name || 'Unknown Artist',
          title: artwork.title || 'Untitled',
          description: artwork.description || 'No description available',
          image: artwork.imageUrl || artwork.image || '/default-artwork.jpg',
          artistimage: artwork.artistImage || '/default-artist.jpg',
          initialPrice: artwork.price || artwork.initialPrice || 0,
          category: artwork.category || 'Landscape',
          medium: artwork.medium || 'Unknown Medium',
          year: artwork.year || 'Unknown Year',
          tags: Array.isArray(artwork.tags) ? artwork.tags : [],
          auctionStart: artwork.auctionStartTime,
          auctionEnd: artwork.auctionEndTime,
          createdAt: artwork.createdAt || new Date().toISOString(),
          status: artwork.approvalStatus || 'Pending'
        }));
      
      setPosts(transformedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingArtworks();
  }, []);

  const handleApprove = async (artworkId) => {
    try {
      await dummyAPI.approveArtwork(artworkId);
      await fetchPendingArtworks();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDecline = async (artworkId) => {
    try {
      await dummyAPI.rejectArtwork(artworkId);
      await fetchPendingArtworks();
    } catch (err) {
      setError(err.message);
    }
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {posts.map((post) => (
          <PostsCard 
            key={post.id} 
            item={post} 
            onApprove={() => handleApprove(post.id)}
            onDecline={() => handleDecline(post.id)}
          />
        ))}
        {posts.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No pending artworks to show.
          </div>
        )}
      </div>
    </>
  );
};

export default AdminPosts;
