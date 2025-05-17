import React, { useEffect, useState } from "react";
import Filters from "../components/Filter/Filter";
import Gallery from "../components/Gallery/Gallery";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer";

const API_BASE_URL = 'https://localhost:7043';

const GalleryPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [artistFilter, setArtistFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/Artwork/artworks`);
        if (!response.ok) {
          throw new Error('Failed to fetch artworks');
        }
        const { data: artworksData } = await response.json();
        
        // Format the artwork data
        const formattedArtworks = artworksData.map(art => {
          // Handle nested objects
          const category = typeof art.category === 'object' ? art.category?.name || 'Uncategorized' : art.category;
          const medium = typeof art.medium === 'object' ? art.medium?.name || 'Unknown Medium' : art.medium;
          
          return {
            id: art.id || Math.random().toString(),
            title: art.title || 'Untitled',
            artistName: art.artistName || 'Unknown Artist',
            description: art.description || 'No description available',
            initialPrice: art.startingPrice || 0,
            currentPrice: art.currentPrice || 0,
            category: category || 'Uncategorized',
            medium: medium || 'Unknown Medium',
            year: art.year || 'Unknown Year',
            image: art.imageUrl || '/default-artwork.jpg',
            tags: Array.isArray(art.tags) ? art.tags.map(tag => 
              typeof tag === 'object' ? tag.name || 'Unknown Tag' : tag
            ) : [],
            auctionStartTime: art.auctionStartTime || null,
            auctionEndTime: art.auctionEndTime || null
          };
        });

        setArtworks(formattedArtworks);
        setFiltered(formattedArtworks); // Initialize filtered with all artworks
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    let result = [...artworks];

    if (artistFilter) {
      result = result.filter((art) => art.artistName === artistFilter);
    }

    if (tagFilter) {
      result = result.filter((art) =>
        art.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    }

    if (sortOption === "price_asc") {
      result.sort((a, b) => a.initialPrice - b.initialPrice);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.initialPrice - a.initialPrice);
    }

    setFiltered(result);
  }, [artistFilter, tagFilter, sortOption, artworks]);

  // Extract unique artists from fetched artworks
  const uniqueArtists = [...new Set(artworks.map((a) => a.artistName))];

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
      <div className="mt-12">
        {/* Filters */}
        <Filters
          artists={uniqueArtists}
          onArtistChange={setArtistFilter}
          onTagChange={setTagFilter}
          onSortChange={setSortOption}
        />

        {/* Gallery */}
        <Gallery artworks={filtered} />
        <Footer />
      </div>
    </>
  );
};

export default GalleryPage;