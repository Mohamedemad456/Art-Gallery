import React from "react";
import UserCard from "../components/UserCard/UserCard";
import Loader from "../components/Loader/Loader";

const AdminUsers = () => {

  const dummyUsers = [
    {
      title: "Alice Johnson",
      description: "Creative Director",
      img: "https://i.pravatar.cc/300",
      role: "Artist",
      createdAt: "2023-06-12T09:00:00Z",
      artistName: "Alice J.",
      initialPrice: 1500,
      auctionStart: "2023-06-15T12:00:00Z",
      auctionEnd: "2023-06-20T12:00:00Z",
      category: "Digital Art",
      tags: ["modern", "colorful"],
    },
    {
      title: "James Smith",
      description: "UI/UX Designer",
      img: "https://i.pravatar.cc/300",
      role: "Artist",
      createdAt: "2023-07-08T14:30:00Z",
      artistName: "James S.",
      initialPrice: 800,
      auctionStart: "2023-07-10T10:00:00Z",
      auctionEnd: "2023-07-15T10:00:00Z",
      category: "Illustration",
      tags: ["vector", "minimalist"],
    },
    {
      title: "Sarah Lee",
      description: "Graphic Artist",
      img: "https://i.pravatar.cc/300",
      role: "Artist",
      createdAt: "2023-08-01T11:45:00Z",
      artistName: "S. Lee",
      initialPrice: 1200,
      auctionStart: "2023-08-05T11:00:00Z",
      auctionEnd: "2023-08-10T11:00:00Z",
      category: "Painting",
      tags: ["abstract", "bold"],
    },
  ];
  return (
    <>
      <Loader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dummyUsers.map((user, idx) => (
          <UserCard key={idx} item={user} />
        ))}
      </div>
    </>
  );
};

export default AdminUsers;

