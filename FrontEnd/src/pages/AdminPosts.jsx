import React from "react";
import Loader from "../components/Loader/Loader";
import PostsCard from "../components/PostsCard/PostsCard";

const AdminPosts = () => {
  const dummyPosts = [
    {
      id: '1',
      artistName: 'Leonardo da Vinci',
      title: 'Mona Lisa',
      description: 'A portrait painting with a mysterious smile.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/6/6a/Mona_Lisa.jpg',
      artistimage: 'https://i.pravatar.cc/300',
      initialPrice: 5000000,
      auctionStart: '2025-04-22T10:00:00Z',
      auctionEnd: '2025-04-30T18:00:00Z',
      category: 'Renaissance',
      tags: ['portrait', 'oil painting', 'classic'],
      createdAt: '2025-04-15T12:30:00Z'
    },
    {
      id: '2',
      artistName: 'Vincent van Gogh',
      title: 'Starry Night',
      description: 'A vibrant night sky over a quiet village.',
      image: 'https://i.pravatar.cc/300',
      artistimage: 'https://i.pravatar.cc/300',
      initialPrice: 3000000,
      auctionStart: '2025-04-23T14:00:00Z',
      auctionEnd: '2025-05-01T20:00:00Z',
      category: 'Post-Impressionism',
      tags: ['night', 'swirls', 'expressionism'],
      createdAt: '2025-04-16T11:00:00Z'
    },
    {
      id: '3',
      artistName: 'Frida Kahlo',
      title: 'The Two Fridas',
      description: 'A powerful self-portrait exploring identity.',
      image: 'https://i.pravatar.cc/300',
      artistimage: 'https://i.pravatar.cc/300',
      initialPrice: 2000000,
      auctionStart: '2025-04-25T16:00:00Z',
      auctionEnd: '2025-05-02T18:00:00Z',
      category: 'Surrealism',
      tags: ['self-portrait', 'symbolism', 'identity'],
      createdAt: '2025-04-17T09:45:00Z'
    },
  ];

  return (
    <>
      <Loader />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {dummyPosts.map((post) => (
          <PostsCard key={post.id} item={post} />
        ))}
      </div>
    </>
  );
};

export default AdminPosts;
