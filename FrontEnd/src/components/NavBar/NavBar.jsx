import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/images/trace.svg";
import styles from "./NavBar.module.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef(null);

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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target) && !event.target.closest('button')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <>
      {/* Circle Cursor */}
      <div className={`${styles.cursor_circle} hidden lg:flex lg:items-center space-x-6`} id="cursor-circle"></div>

      <nav className="bg-[#C08B6F] text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          {/* Left: Logo */}
          <NavLink to="/" className="flex items-center text-2xl font-bold">
            <img src={Logo} alt="" height={"60px"} width={"60px"} />
            <span className="ml-2">Art Gallery</span>
          </NavLink>

          {/* Right: Menu Button for Mobile */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden focus:outline-none transition-all duration-700 ease-in-out"
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="h-8 w-8 text-white text-2xl"
            />
          </button>

          {/* Nav Links & Signup Button (Hidden in Mobile, Visible in Large Screens) */}
          <div className="hidden lg:flex lg:items-center space-x-6">
            <ul className="flex space-x-6 text-lg">
              <li className={`${styles.link_effect}`}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-bold active"
                      : "text-gray-300 hover:text-white transition"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className={`${styles.link_effect}`}>
                <NavLink
                  to="/features"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-bold active"
                      : "text-gray-300 hover:text-white transition"
                  }
                >
                  Features
                </NavLink>
              </li>
              <li className={`${styles.link_effect}`}>
                <NavLink
                  to="/pricing"
                  className={({ isActive }) =>
                    isActive
                      ? "text-white font-bold active"
                      : "text-gray-300 hover:text-white transition"
                  }
                >
                  Pricing
                </NavLink>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex lg:items-center space-x-6">
            {/* Signup Button */}
            <NavLink
              to="/signup"
              className="bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
            >
              Sign Up
            </NavLink>
          </div>
        </div>

        {/* Mobile Menu: Links & Signup Button (Only Visible in Mobile) */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden w-full overflow-hidden transition-max-h duration-1000 ease-in-out`}
          style={{
            maxHeight: isOpen ? '500px' : '0',
            borderBottomLeftRadius: isOpen ? '0.5rem' : '0',
            borderBottomRightRadius: isOpen ? '0.5rem' : '0',
            backgroundColor: '#C08B6F',
          }}
        >
          {isOpen && (
            <div className="flex flex-col items-center  w-full pb-4 transition-all duration-700 ease-in-out">
              <ul className="text-lg text-center space-y-2">
                <li className={`${styles.link_effect}`}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-bold active"
                        : "text-gray-300 hover:text-white transition"
                      }
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/features"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-bold active"
                        : "text-gray-300 hover:text-white transition"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pricing"
                    className={({ isActive }) =>
                      isActive
                        ? "text-white font-bold active"
                        : "text-gray-300 hover:text-white transition"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Pricing
                  </NavLink>
                </li>
              </ul>

              {/* Signup Button (For Mobile) */}
              <NavLink
                to="/signup"
                className="mt-3 bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </NavLink>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
