import React from "react";
import Card from "../components/Card/Card";

const AdminPosts = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      <Card />
      <Card />
    </div>
  );
};

export default AdminPosts;
