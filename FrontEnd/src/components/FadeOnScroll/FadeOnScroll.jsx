import React, { useEffect, useState, useRef } from 'react';
import styles from './FadeOnScroll.module.css'; // Make sure to import the CSS file

const FadeOnScroll = ({ children }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Create the Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Trigger fade-in or fade-out based on visibility
          if (entry.isIntersecting) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
        });
      },
      { threshold: 0.1 } // Trigger fade when 10% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // Cleanup observer on component unmount
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`${styles.fade_in} ${isVisible ? styles['fade-in-visible'] : styles['fade-out-hidden']}`}
    >
      {children}
    </section>
  );
};

export default FadeOnScroll;
