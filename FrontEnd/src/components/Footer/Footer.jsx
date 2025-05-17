import React from "react";
import style from "./Footer.module.css";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer bg-[#E8BEBE]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 p-10 text-center">
        {/* About Us */}
        <div className="flex flex-col justify-start items-center ms-5">
          <h3 className={`${style.title} font-bold text-[#3D2B1F] text-3xl`}>
            About Us
          </h3>
          <p className={`${style.text}`}>
            We are a creative platform connecting talented artists with art
            lovers worldwide. Explore, showcase, and celebrate unique artworks
            in a vibrant community.
          </p>
        </div>

        {/* Our Links */}
        <div className="flex flex-col justify-start items-center">
          <h3 className={`${style.title} font-bold text-[#3D2B1F] text-3xl`}>
            Our Links
          </h3>
          <div className={`${style.text} flex flex-col items-center mt-3`}>
            <ul className="text-lg text-center space-y-2">
              <li className={`${style.link_effect}`}>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#3D2B1F] font-bold active"
                      : "text-[#8B5E3C] transition"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li className={`${style.link_effect}`}>
                <NavLink
                  to="/AboutUs"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#3D2B1F] font-bold active"
                      : "text-[#8B5E3C] transition"
                  }
                >
                  About Us
                </NavLink>
              </li>
              <li className={`${style.link_effect}`}>
                <NavLink
                  to="/ContactUs"
                  className={({ isActive }) =>
                    isActive
                      ? "text-[#3D2B1F] font-bold active"
                      : "text-[#8B5E3C] transition"
                  }
                >
                  Pricing
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media + Contact */}
        <div className="flex flex-col justify-start items-center me-5">
          {/* Social Icons */}
          <div className="flex flex-row gap-3">
            <div className="w-15 h-15 bg-white flex justify-center items-center shadow-md rounded-full">
              <NavLink
                to="/"
                className="w-15 h-15 flex justify-center items-center"
              >
                <FontAwesomeIcon
                  icon={faFacebook}
                  className="text-[#6c757d] hover:text-blue-600 text-2xl"
                />
              </NavLink>
            </div>
            <div className="w-15 h-15 bg-white flex justify-center items-center shadow-md rounded-full">
              <NavLink
                to="/"
                className="w-15 h-15 flex justify-center items-center"
              >
                <FontAwesomeIcon
                  icon={faTwitter}
                  className="text-[#6c757d] hover:text-blue-400 text-2xl"
                />
              </NavLink>
            </div>
            <div className="w-15 h-15 bg-white flex justify-center items-center shadow-md rounded-full">
              <NavLink
                to="/"
                className="w-15 h-15 flex justify-center items-center"
              >
                <FontAwesomeIcon
                  icon={faInstagram}
                  className="text-[#6c757d] hover:text-pink-500 text-2xl"
                />
              </NavLink>
            </div>
          </div>

          {/* Social Text */}
          <p className={style.text}>Follow us on social media.</p>

          {/* Contact Us Section */}
          <div className="mt-4 text-center">
            <h4 className={`${style.title} font-bold text-[#3D2B1F] text-xl`}>
              Contact Us
            </h4>
            <p className={`${style.text}`}>
              Email:{" "}
              <a
                href="mailto:info@artplatform.com"
                className="text-[#8B5E3C] hover:underline"
              >
                info@artplatform.com
              </a>
            </p>
            <p className={`${style.text}`}>
              Phone:{" "}
              <a
                href="tel:+201234567890"
                className="text-[#8B5E3C] hover:underline"
              >
                +20 123 456 7890
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
