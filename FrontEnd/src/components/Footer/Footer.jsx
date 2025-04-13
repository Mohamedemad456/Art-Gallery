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
        <div className="flex flex-col justify-start items-center ms-5">
          <h3 className={`${style.title} font-bold text-[#3D2B1F] text-3xl`}>
            About Us
          </h3>
          <p className={`${style.text}`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque in
            ante.
          </p>
        </div>
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
        <div className="flex flex-col justify-start items-center me-5">
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
          <p className={style.text}>Follow us on social media.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
