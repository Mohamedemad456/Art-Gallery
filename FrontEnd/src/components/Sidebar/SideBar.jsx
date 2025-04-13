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
      className={`flex flex-col justify-between bg-[#C08B6F] text-white transition-all duration-300 ease-out z-50 h-full ${
        isOpen
          ? 'fixed top-0 left-0 w-64 translate-x-0 z-50'
          : 'relative w-16 md:w-full md:static'
      } ${styles.sidebar}`}
    >
      <div className="flex items-center justify-center p-4">
        <h2
          className={`text-2xl font-bold text-center ${isOpen ? 'flex transition-all duration-1000' : 'hidden'} md:block`}
        >
          Admin Dashboard
        </h2>
        <button
          className={isOpen ? 'text-white text-2xl md:hidden ml-2' : 'text-white text-2xl md:hidden'}
          onClick={toggleSidebar}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>
      
      <nav className="flex flex-col flex-grow gap-4 mt-4 items-center justify-start md:mx-4 lg:mx-2">
        <div className='flex flex-col gap-4 items-center w-full'>
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-4 rounded transition-colors ${
                isActive ? 'bg-[#3D2B1F]' : 'hover:bg-[#3D2B1F]'
              } transition-all duration-900`
            }
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faUser} size="lg" />
            <span className={`${isOpen ? 'block' : 'hidden'} md:block ml-2`}>
              Profile Management
            </span>
          </NavLink>
          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `flex items-center gap-2 py-3 px-3 rounded transition-colors ${
                isActive ? 'bg-[#3D2B1F]' : 'hover:bg-[#3D2B1F]'
              } transition-all duration-900`
            }
            onClick={() => setIsOpen(false)}
          >
            <FontAwesomeIcon icon={faUsers} size="lg" />
            <span className={`${isOpen ? 'block' : 'hidden'} md:block ml-2`}>
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
            <span className={`${isOpen ? 'block' : 'hidden'} md:block ml-2`}>
              Posts Management
            </span>
          </NavLink>
        </div>
      </nav>

      {/* Logout button positioned at the bottom, hidden when sidebar is closed */}
      <div className={`p-4 items-center justify-center ${isOpen ? 'flex' : 'hidden md:flex'}`}>
        <button
          className="flex gap-2 py-3 px-4 rounded-full transition-colors bg-[#3D2B1F] hover:bg-[#8B5E3C]"
          onClick={() => {}}
        >
          Logout
        </button>
      </div>
    </aside>
  );
};

export default SideBar;
