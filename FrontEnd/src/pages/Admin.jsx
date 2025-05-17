import React, { useState, useEffect } from "react";
import AdminProfile from "../components/AdminProfile/AdminProfile";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const Admin = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      const authToken = sessionStorage.getItem('accessToken');
      
      if (!authToken) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('https://localhost:7043/api/Auth/me', {
          headers: {
            'Authorization': `Bearer ${authToken}`
          }
        });
        
        // Transform the API data to match the expected format
        setAdminDetails({
          name: response.data.displayName,
          role: response.data.role,
          image: "https://i.pravatar.cc/300", // Default image since API doesn't provide one
          about: "Administrator of the Art Gallery platform",
          skills: ["User Management", "Content Management", "System Administration"],
          email: response.data.email,
          phone: response.data.phone || "Not provided",
          location: response.data.location || "Not provided",
        });
      } catch (err) {
        console.error(err);
        navigate('/error');
      } finally {
        setLoading(false);
      }
    };

    fetchAdminProfile();
  }, [navigate]);

  if (loading || !adminDetails) {
    return <Loader />;
  }

  return (
    <div className="min-h-full flex justify-center items-center p-4">
      <AdminProfile admin={adminDetails} />
    </div>
  );
};

export default Admin;
