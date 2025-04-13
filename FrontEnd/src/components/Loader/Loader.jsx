import React, { useEffect, useState } from "react";
import styles from "./Loader.module.css";

const Loader = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true);
    }, 1000); // Adjust timing as needed
  }, []);

  return (
    <div className={isLoaded ? styles.loaded : ""} id="loader_body">
    <div className={`${styles.loader_wrapper}`}>
      <div className={styles.loader}></div>

      <div className={`${styles.loader_section} ${styles.section_left}`}></div>
      <div className={`${styles.loader_section} ${styles.section_right}`}></div>
    </div>
    </div>
  );
};

export default Loader;
