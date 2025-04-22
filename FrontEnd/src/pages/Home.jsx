import React, { useState, useEffect } from "react";
import Gallery from "../components/Gallery/Gallery";
import Loader from "../components/Loader/Loader";
import Search from "../components/SearchSection/Search";
import Footer from "../components/Footer/Footer";

function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch("http://localhost:5093/api/Artwork");
        if (!response.ok) {
          throw new Error("Failed to fetch artworks");
        }
        const data = await response.json();
        setArtworks(data);
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
      <Search />
      <Gallery artworks={artworks} />
      <Footer />
    </>
  );
}

export default Home;