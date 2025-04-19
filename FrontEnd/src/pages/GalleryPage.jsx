// pages/GalleryPage.js
import React, { useEffect, useState } from "react";
import Filters from "../components/Filter/Filter";
import Gallery from "../components/Gallery/Gallery";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer/Footer";

const allArtworks = [
  {
    id: 1,
    title: "Sunset Dreams",
    artist: "John Doe",
    price: 150,
    category: "Landscape",
    tags: ["modern", "oil painting"],
    image: "/assets/img-01.jpg",
  },
  {
    id: 2,
    title: "Portrait of Light",
    artist: "Jane Smith",
    price: 220,
    category: "Portrait",
    tags: ["vibrant", "oil painting"],
    image: "/assets/img-02.jpg",
  },
  {
    id: 3,
    title: "Ocean Mood",
    artist: "John Doe",
    price: 180,
    category: "Landscape",
    tags: ["sea", "nature"],
    image: "/assets/img-03.jpg",
  },
  {
    id: 4,
    title: "Urban Spirit",
    artist: "Jane Smith",
    price: 300,
    category: "Portrait",
    tags: ["modern", "city"],
    image: "/assets/img-04.jpg",
  },
];

const GalleryPage = () => {
  const [artworks] = useState(allArtworks);
  const [filtered, setFiltered] = useState([]);
  const [artistFilter, setArtistFilter] = useState("");
  const [tagFilter, setTagFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    let result = [...artworks];

    if (artistFilter) {
      result = result.filter((art) => art.artist === artistFilter);
    }

    if (tagFilter) {
      result = result.filter((art) =>
        art.tags.some((tag) => tag.toLowerCase().includes(tagFilter.toLowerCase()))
      );
    }

    if (sortOption === "price_asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOption === "price_desc") {
      result.sort((a, b) => b.price - a.price);
    }

    setFiltered(result);
  }, [artistFilter, tagFilter, sortOption, artworks]);

  const uniqueArtists = [...new Set(allArtworks.map((a) => a.artist))];

  return (
    <>
    <Loader/>
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
      <div className="flex flex-col sm:flex-row justify-center lg:justify-end items-center my-8 mx-0 md:mx-8">
        <div className="flex items-center space-x-2 font-medium">
          <span className="text-md sm:text-lg text-[#3D2B1F]">Page</span>
          <input
            type="text"
            min="1"
            max="200"
            defaultValue="1"
            className="w-10 sm:w-14 text-center border focus:outline-none focus:ring-2 focus:ring-[#C08B6F] bg-gray-100 text-[#3D2B1F]"
          />
          <span className="text-md sm:text-lg text-[#3D2B1F]">of 200</span>
        </div>
      </div>
      <Footer />
    </div>
    </>
  );
};

export default GalleryPage;
