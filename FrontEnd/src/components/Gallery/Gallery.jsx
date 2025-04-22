import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Gallery.module.css";

const Gallery = ({ artworks }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const artworksPerPage = 12;

  // Calculate total pages based on artworks length
  const totalPages = Math.ceil(artworks.length / artworksPerPage);

  // Calculate the artworks to display for the current page
  const indexOfLastArtwork = currentPage * artworksPerPage;
  const indexOfFirstArtwork = indexOfLastArtwork - artworksPerPage;
  const currentArtworks = artworks.slice(indexOfFirstArtwork, indexOfLastArtwork);

  // Handle page navigation
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  console.log(artworks);

  return (
    <>
      <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center my-4">
        Art Gallery
      </h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-4 p-4 mt-12">
        {currentArtworks.map((art) => (
          <figure key={art.id} className={`${styles.effectMing} relative group`}>
            <NavLink to={`/artwork/${art.id}`}>
              <img
                className="w-full h-52 object-cover rounded-md"
                src={art.image}
                alt={art.title}
              />
              <figcaption
                className={`${styles.figcaption} absolute inset-0 flex flex-col items-center justify-center text-white text-center`}
              >
                <span className="font-bold text-lg">{art.title}</span>
                <span className="text-sm mt-1">{art.artistName}</span>
                <span className="text-sm">${art.initialPrice}</span>
              </figcaption>
            </NavLink>
          </figure>
        ))}
        {currentArtworks.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No artworks match your criteria.
          </div>
        )}
      </div>

      {/* Pagination Bar */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center my-8 space-x-4">
          <button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-lg font-medium">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md disabled:opacity-50 hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default Gallery;