import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardDetails from './CardDetails';

const UserCard = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          width: '100%',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          marginLeft: { xs: '1rem', md: 0 },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#3D2B1F' }} aria-label="profile">
              {item?.title?.[0] || 'B'}
            </Avatar>
          }
          action={
            <button
            onClick={() => setShowDetails(true)}
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
            type="button"
          >
            <span className="sr-only">Open dropdown</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 16 3"
            >
              <path d="M2 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 2 0Zm6.041 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 8.041 0ZM14 0a1.5 1.5 0 1 1 0 3A1.5 1.5 0 0 1 14 0Z" />
            </svg>
          </button>
          }
          title={item?.title || 'Bonnie Green'}
          subheader={item?.description || 'Visual Designer'}
        />
        <CardMedia
          component="img"
          height="96"
          image={item?.img || '/assets/img-12.jpg'}
          alt={item?.title || 'Profile'}
          sx={{ width: 96, height: 96, borderRadius: '50%', margin: '0 auto 0.75rem' }}
        />
        <CardContent>
          <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
            {item?.description || 'Visual Designer'}
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: 'center', paddingBottom: '2.5rem' }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#3D2B1F',
              color: 'white',
              textTransform: 'none',
              padding: '0.5rem 1rem',
              marginRight: '0.5rem',
              '&:hover': {
                backgroundColor: '#8B5E3C',
              },
            }}
          >
            Accept
          </Button>
          <Button
            variant="outlined"
            sx={{
              color: '#3D2B1F',
              borderColor: '#e5e7eb',
              textTransform: 'none',
              padding: '0.5rem 1rem',
              '&:hover': {
                backgroundColor: '#f3f4f6',
                color: '#C08B6F',
                borderColor: '#e5e7eb',
              },
            }}
          >
            Decline
          </Button>
        </CardActions>
      </Card>

      {/* Pop-up dialog */}
      {showDetails && (
        <CardDetails
          item={item}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default UserCard;