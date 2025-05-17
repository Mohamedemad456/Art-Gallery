import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styles from './SideBar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faFileAlt, faUser, faBars } from '@fortawesome/free-solid-svg-icons';
import Cursor from '../Cursor/Cursor';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  const handleLogout = () => {
    sessionStorage.removeItem('accessToken');
    navigate('/');
  };


  // Reusable sidebar content
  const SidebarContent = (
    <>
      <div className="flex items-center justify-center p-4">
        <h2
          className={`text-2xl font-bold text-center ${
            isOpen ? 'flex transition-all duration-1000' : 'hidden'
          } md:block`}
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
        <div className="flex flex-col gap-4 items-center w-full">
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
          {/* Logout button moved here */}
          <div
            className={`flex items-center justify-center ${
              isOpen ? 'flex' : 'hidden md:flex'
            }`}
          >
            <button
              className="flex gap-2 py-3 px-4 rounded-full transition-colors bg-[#3D2B1F] hover:bg-[#8B5E3C] w-full text-white mt-12"
              onClick={() => {handleLogout();}}
            >
              <span className={`${isOpen ? 'block' : 'hidden'} md:block`}>
                Logout
              </span>
            </button>
          </div>
        </div>
      </nav>
    </>
  );

  return (
    <>
      <Cursor />
      {/* Mobile: Drawer when isOpen is true */}
      <Drawer
        variant="temporary"
        open={isOpen}
        onClose={toggleSidebar}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 256,
            backgroundColor: '#C08B6F',
            color: 'white',
            boxSizing: 'border-box',
          },
        }}
      >
        <Box className={`flex flex-col justify-between h-full ${styles.sidebar}`}>
          {SidebarContent}
        </Box>
      </Drawer>

      {/* Mobile: Icon to open Drawer */}
      <button
        className="fixed top-4 left-4 z-50 text-white bg-[#C08B6F] p-3 rounded-full md:hidden"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon icon={faBars} size="lg" />
      </button>

      {/* Medium and Large Screens: Original aside */}
      <aside
        className={`flex flex-col justify-between bg-[#C08B6F] text-white transition-all duration-300 ease-out z-50 h-full ${
          isOpen
            ? 'fixed top-0 left-0 w-64 translate-x-0 z-50 md:w-full md:static'
            : 'relative w-16 md:w-full md:static'
        } ${styles.sidebar} md:flex hidden`}
      >
        {SidebarContent}
      </aside>
    </>
  );
};

export default SideBar;