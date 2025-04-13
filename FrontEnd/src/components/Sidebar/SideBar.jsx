import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <aside
      className={`bg-[#C08B6F] text-white transition-all duration-600 ease-in-out z-40 h-full col-span-1 md:col-span-3 lg:col-span-2 ${
        isOpen
          ? 'fixed top-0 left-0 w-64 translate-x-0 z-50'
          : 'relative w-16 md:w-full md:static'
      } ${styles.sidebar}`}
    >
      <div className="flex items-center justify-center p-4">
        <h2
          className={`text-2xl font-bold text-center ${
            isOpen ? 'flex' : 'hidden'
          } md:block transition-all duration-900`}
        >
          Admin Dashboard
        </h2>
        <button
          className={isOpen ? "text-white text-2xl md:hidden ml-2" :"text-white text-2xl md:hidden"}
          onClick={toggleSidebar}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      <nav className="flex flex-col gap-4 mt-4 items-center justify-center md:mx-4 lg:mx-0 transition-all duration-900">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            `flex items-center gap-2 py-3 px-3 rounded transition-colors ${
              isActive ? 'bg-[#3D2B1F]' : 'hover:bg-[#3D2B1F]'
            } transition-all duration-900`
          }
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faUser} size="lg" />
          <span className={`${isOpen ? 'block' : 'hidden'} md:block ml-2 transition-all duration-900`}>
            Profile Management
          </span>
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `flex items-center gap-2 py-3 px-4 rounded transition-colors ${
              isActive ? 'bg-[#3D2B1F]' : 'hover:bg-[#3D2B1F]'
            } transition-all duration-900`
          }
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faUsers} size="lg" />
          <span className={`${isOpen ? 'block' : 'hidden'} md:block ml-2 transition-all duration-900`}>
            User Management
          </span>
        </NavLink>
        <NavLink
          to="/admin/posts"
          className={({ isActive }) =>
            `flex items-center gap-2 py-3 px-4 rounded transition-colors ${
              isActive ? 'bg-[#3D2B1F]' : 'hover:bg-[#3D2B1F]'
            } transition-all duration-900`
          }
          onClick={() => setIsOpen(false)}
        >
          <FontAwesomeIcon icon={faFileAlt} size="lg" />
          <span className={`${isOpen ? 'block' : 'hidden'} md:block ml-2 transition-all duration-900`}>
            Posts Management
          </span>
        </NavLink>
      </nav>
    </aside>
  );
};

export default SideBar;