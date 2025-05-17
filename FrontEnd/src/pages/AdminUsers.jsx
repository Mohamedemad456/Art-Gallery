import React, { useState, useEffect } from "react";
import UserCard from "../components/UserCard/UserCard";
import Loader from "../components/Loader/Loader";
import { useNavigate } from "react-router-dom";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPendingArtists = async () => {
    try {
      const response = await fetch('https://localhost:7043/api/Admin/artist/pending-artists', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch pending artists');
      }
      
      const data = await response.json();
      
      // Transform the data to ensure it has the correct structure
      const transformedData = data.map(user => ({
        id: user.id,
        name: user.username || user.name,
        email: user.email,
        role: 'Artist',
        approvalStatus: 'Pending',
        createdAt: user.createdAt,
        bio: user.bio,
        portfolio: user.portfolio
      }));
      
      setUsers(transformedData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingArtists();
  }, []);

  const handleApprove = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7043/api/Admin/artist/accept-artist/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to approve artist');
      }

      await fetchPendingArtists();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDecline = async (userId) => {
    try {
      const response = await fetch(`https://localhost:7043/api/Admin/artist/reject-artist/${userId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to reject artist');
      }

      await fetchPendingArtists();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-10">
        Error: {error}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {users.map((user) => (
          <UserCard 
            key={user.id} 
            item={user} 
            onApprove={handleApprove}
            onDecline={handleDecline}
          />
        ))}
        {users.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No pending artists to show.
          </div>
        )}
      </div>
    </>
  );
};

export default AdminUsers;

