import React from 'react';
import styles from './AboutUs.module.css';

const AboutUs = () => {
  return (
    <section className={`${styles.aboutUsSection}`} id='about'>
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between py-16 px-6 gap-8">
        {/* Left: Image */}
        <div className="w-full md:w-2/3">
          <img
            src="/assets/AboutUs.jpg"
            alt="About Us"
            className="w-full h-auto rounded-lg shadow-2xl"
          />
        </div>

        {/* Right: Title and Description */}
        <div className="w-full md:w-1/2 md:pl-12">
          <h2 className="text-3xl font-bold text-[#C08B6F] mb-4">About Us</h2>
          <p className="text-lg text-gray-700">
            At our core, we believe that art has the power to transform spaces
            and evoke emotions. As a leading art gallery, we strive to showcase
            works that not only inspire but also challenge the traditional
            boundaries of creativity. Our collection spans a wide range of
            artistic expressions, from classical masterpieces to contemporary
            innovations, offering something for every art enthusiast. Our
            mission is to provide a platform for artists to share their passion
            with the world while curating an experience that leaves a lasting
            impression on all who visit.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
