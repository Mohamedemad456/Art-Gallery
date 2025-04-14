import React, { useEffect } from "react";
import styles from "./Cursor.module.css";
const Cursor = () => {
  useEffect(() => {
    const cursorCircle = document.getElementById("cursor-circle");

    if (!cursorCircle) return;

    const moveCursor = (e) => {
      const x = e.clientX - 18;
      const y = e.clientY - 18;
      cursorCircle.style.transform = `translate(${x}px, ${y}px)`;
    };

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  }, []);

  return (
    <div
      id="cursor-circle"
      className={`${styles.cursor_circle} hidden lg:flex lg:items-center space-x-6`}
    ></div>
  );
};

export default Cursor;
