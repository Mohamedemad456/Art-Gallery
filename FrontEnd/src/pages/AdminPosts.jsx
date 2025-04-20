import React from "react";
import UserCard from "../components/Card/Card";
import Loader from "../components/Loader/Loader";

const AdminPosts = () => {
  return (
    <>
      <Loader />
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <UserCard />
      <UserCard />
    </div>
    </>
  );
};

export default AdminPosts;
