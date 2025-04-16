// components/Gallery.js
import React from "react";
import styles from "./Gallery.module.css";
import { NavLink } from "react-router-dom";
const Gallery = ({ artworks }) => {
  return (
    <>
    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-center my-4">Art Gallery</h2>
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-4 my-4 p-4 mt-12">
      {artworks.map((art, index) => (
        <figure key={art.id} className={`${styles.effectMing} relative group`}>
          <NavLink to={`/artwork`}>
            <img
              className="w-full h-52 object-fit rounded-md"
              src={art.image}
              alt={art.title}
            />
            <figcaption
              className={`${styles.figcaption} absolute inset-0 flex flex-col items-center justify-center text-white text-center`}
            >
              <span className="font-bold text-lg">{art.title}</span>
              <span className="text-sm mt-1">{art.artist}</span>
              <span className="text-sm">${art.price}</span>
            </figcaption>
          </NavLink>
        </figure>
      ))}
      {artworks.length === 0 && (
        <div className="col-span-full text-center text-gray-500">
          No artworks match your criteria.
        </div>
      )}
    </div>
    </>
  );
};

export default Gallery;
