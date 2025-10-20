import React, { useState, useEffect } from "react";
import AdminProfile from "../components/AdminProfile/AdminProfile";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { dummyAPI } from "../services/dummyData";

const Admin = () => {
  const [adminDetails, setAdminDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdminProfile = async () => {
      // Disabled authentication check for demo
      // const authToken = sessionStorage.getItem('accessToken');
      
      // if (!authToken) {
      //   navigate('/login');
      //   return;
      // }

      try {
        const response = await dummyAPI.getMe();
        
        // Transform the API data to match the expected format
        setAdminDetails({
          name: response.name,
          role: response.role,
          image: response.image,
          about: response.about,
          skills: response.skills,
          email: response.email,
          phone: response.phone,
          location: response.location,
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
