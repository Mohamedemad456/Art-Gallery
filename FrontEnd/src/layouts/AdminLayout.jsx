import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideBar from "../components/Sidebar/SideBar";
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-full grid grid-cols-12">
      <div className="col-span-0 md:col-span-3 lg:col-span-2">
        <SideBar />
      </div>
      <main className="col-span-12 md:col-span-9 lg:col-span-10 bg-gray-100 p-4">
        <Outlet /> {/* This will render the child routes for admin pages */}
      </main>
    </div>
  );
};

export default AdminLayout;
