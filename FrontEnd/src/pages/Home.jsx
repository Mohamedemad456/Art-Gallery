import React, { useState, useEffect } from "react";
import Gallery from "../components/Gallery/Gallery";
import Loader from "../components/Loader/Loader";
import Search from "../components/SearchSection/Search";
import Footer from "../components/Footer/Footer";
import GalleryFeatures from "../components/FeatureSection/GalleryFeatures";
import ScrollToHash from "../hooks/Scrolltohash";
import FadeOnScroll from "../components/FadeOnScroll/FadeOnScroll";
import AboutUs from "../components/AboutUs/AboutUs";
import { dummyAPI } from "../services/dummyData";

function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const { data: artworksData } = await dummyAPI.getArtworks();
        
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
            initialPrice: art.startingPrice || art.initialPrice || 0,
            currentPrice: art.currentPrice || 0,
            category: category || 'Uncategorized',
            medium: medium || 'Unknown Medium',
            year: art.year || 'Unknown Year',
            image: art.imageUrl || art.image || '/default-artwork.jpg',
            tags: Array.isArray(art.tags) ? art.tags.map(tag => 
              typeof tag === 'object' ? tag.name || 'Unknown Tag' : tag
            ) : [],
            auctionStartTime: art.auctionStartTime || null,
            auctionEndTime: art.auctionEndTime || null
          };
        });

        setArtworks(formattedArtworks);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

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
    <div style={{overflow: "hidden"}}>
      <ScrollToHash />
      <Search />
      <FadeOnScroll>
      <Gallery artworks={artworks} />
      </FadeOnScroll>
      <FadeOnScroll>
      <div id="features">
      <GalleryFeatures />
      </div>
      </FadeOnScroll>
      <FadeOnScroll>
        <AboutUs />
      </FadeOnScroll>
      <Footer />
      </div>
    </>
  );
}

export default Home;