import React from "react";
import styles from "./Gallery.module.css"; // Import CSS module

const images = [
  "/assets/img-12.jpg",
  "/assets/img-01.jpg",
  "/assets/img-02.jpg",
  "/assets/img-03.jpg",
  "/assets/img-04.jpg",
  "/assets/img-05.jpg",
  "/assets/img-06.jpg",
  "/assets/img-07.jpg",
  "/assets/img-08.jpg",
  "/assets/img-09.jpg",
  "/assets/img-10.jpg",
  "/assets/img-11.jpg",
];

const Gallery = () => {
  return (
    <div className="mx-4 p-4 mt-12">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-3xl sm:text-5xl font-bold text-[#3D2B1F] mb-6 sm:mb-10">
          Gallery
        </h2>
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

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        {images.map((src, index) => (
          <figure key={index} className={`${styles.effectMing} relative group`}>
            <a href="/">
            <img className="w-full h-full object-cover rounded-md" src={src} alt="Gallery" />
            <figcaption className={`${styles.figcaption} absolute inset-0 flex items-center justify-center text-white text-lg font-bold`}>
              img{index + 1}
            </figcaption>
            </a>
          </figure>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
