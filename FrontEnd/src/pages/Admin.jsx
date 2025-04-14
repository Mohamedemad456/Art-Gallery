import React from "react";
import AdminProfile from "../components/AdminProfile/AdminProfile";
import Loader from "../components/Loader/Loader";
const adminDetails = {
  name: "John Doe",
  role: "Software Developer",
  image: "https://i.pravatar.cc/300",
  about:
    "Passionate developer with 5 years of experience in building scalable web apps.",
  skills: ["JavaScript", "React", "Node.js"],
  email: "john@example.com",
  phone: "+123456789",
  location: "San Francisco",
};

const Admin = () => {
  return (
    <>
    <Loader/>
    <div className="min-h-full flex justify-center items-center p-4">
      <AdminProfile admin={adminDetails} />
    </div>
    </>
  );
};

export default Admin;
