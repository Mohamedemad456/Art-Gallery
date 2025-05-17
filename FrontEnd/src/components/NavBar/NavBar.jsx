import React, { useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes, faUserCircle } from "@fortawesome/free-solid-svg-icons";  // Added user icon
import Logo from "../../assets/images/trace.svg";
import {jwtDecode} from 'jwt-decode';
import styles from "./NavBar.module.css";
import Cursor from "../Cursor/Cursor";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);  // State to control avatar dropdown
  const mobileMenuRef = useRef(null);
  const navigate = useNavigate();
  
  // Check if the user is logged in by checking the token in sessionStorage
  const token = sessionStorage.getItem('accessToken');
  let isLoggedIn = false;
  let userRole = null;

  if (token) {
    isLoggedIn = true;
    const decodedToken = jwtDecode(token);   
    userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
  }

  // Handle logout
  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <>
      <Cursor />
      <nav className="bg-[#C08B6F] text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-4">
          <NavLink to="/" className="flex items-center text-2xl font-bold">
            <img src={Logo} alt="" height={"60px"} width={"60px"} />
            <span className="ml-2">Art Gallery</span>
          </NavLink>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="block lg:hidden focus:outline-none transition-all duration-700 ease-in-out"
          >
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faBars}
              className="h-8 w-8 text-white text-2xl"
            />
          </button>

          <div className="hidden lg:flex lg:items-center space-x-6">
            <ul className="flex space-x-6 text-lg">
              <li className={`${styles.link_effect}`}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-white font-bold active" : "text-gray-300 hover:text-white transition"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className={`${styles.link_effect}`}>
                <NavLink
                  to="/gallery"
                  className={({ isActive }) =>
                    isActive ? "text-white font-bold active" : "text-gray-300 hover:text-white transition"
                  }
                >
                  Gallery
                </NavLink>
              </li>
              <li className={`${styles.link_effect}`}>
                <a href="/#features" className="text-gray-300 hover:text-white transition">Features</a>
              </li>
              <li className={`${styles.link_effect}`}>
                <a href="/#about" className="text-gray-300 hover:text-white transition">About Us</a>
              </li>
            </ul>
          </div>

          <div className="hidden lg:flex lg:items-center space-x-6">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-2 bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
                >
                  <FontAwesomeIcon icon={faUserCircle} className="text-xl" />
                  <span>Profile</span>
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-lg py-2 w-40 z-10">
                    <NavLink
                      to="/profile"
                      className="block px-4 py-2 text-black hover:bg-gray-200 transition"
                      onClick={() => setDropdownOpen(false)}
                    >
                      View Profile
                    </NavLink>
                    {userRole === 'Artist' && (
                      <NavLink
                        to="/artworkdashboard"
                        className="block px-4 py-2 text-black hover:bg-gray-200 transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Artwork Dashboard
                      </NavLink>
                    )}
                    {userRole === 'Admin' && (
                      <NavLink
                        to="/admin"
                        className="block px-4 py-2 text-black hover:bg-gray-200 transition"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Admin Panel
                      </NavLink>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-black hover:bg-gray-200 transition"
                    >
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                to="/signup"
                className="bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
              >
                Sign Up
              </NavLink>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          ref={mobileMenuRef}
          className={`lg:hidden w-full overflow-hidden transition-max-h duration-1000 ease-in-out`}
          style={{
            maxHeight: isOpen ? "500px" : "0",
            borderBottomLeftRadius: isOpen ? "0.5rem" : "0",
            borderBottomRightRadius: isOpen ? "0.5rem" : "0",
            backgroundColor: "#C08B6F",
          }}
        >
          {isOpen && (
            <div className="flex flex-col items-center w-full pb-4 transition-all duration-700 ease-in-out">
              <ul className="text-lg text-center space-y-2">
                <li className={`${styles.link_effect}`}>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-white font-bold active" : "text-gray-300 hover:text-white transition"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/gallery"
                    className={({ isActive }) =>
                      isActive ? "text-white font-bold active" : "text-gray-300 hover:text-white transition"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="#features"
                    className={({ isActive }) =>
                      isActive ? "text-white font-bold active" : "text-gray-300 hover:text-white transition"
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    Features
                  </NavLink>
                </li>
              </ul>

              {isLoggedIn ? (
                <div className="mt-3">
                  <NavLink
                    to="/profile"
                    className="block bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
                    onClick={() => setIsOpen(false)}
                  >
                    View Profile
                  </NavLink>
                  {userRole === 'Artist' && (
                    <NavLink
                      to="/artworkdashboard"
                      className="block bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Artwork Dashboard
                    </NavLink>
                  )}
                  {userRole === 'Admin' && (
                    <NavLink
                      to="/admin"
                      className="block bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition mt-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Admin Panel
                    </NavLink>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left mt-2 bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/signup"
                  className="block mt-3 bg-white text-[#3D2B1F] px-4 py-2 rounded-full font-bold hover:bg-gray-200 transition"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </NavLink>
              )}
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
