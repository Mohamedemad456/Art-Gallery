import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faUserPen,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import PostsCardDetails from './PostsCardDetails';

const PostsCard = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const {
    artistName,
    title,
    description,
    image,
    artistimage,
    createdAt,
  } = item || {};

  return (
    <>
      <Card
        sx={{
          maxWidth: 345,
          width: '100%',
          border: '1px solid #e5e7eb',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
          marginLeft: { xs: '1rem', md: 0 },
          transition: 'transform 0.2s, box-shadow 0.2s',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: '#3D2B1F' }} src={artistimage} aria-label="artist">
              {artistName?.[0] || 'A'}
            </Avatar>
          }
          action={
            <>
              <IconButton onClick={handleMenuOpen} sx={{ color: 'gray' }}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
              </IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
                <MenuItem onClick={() => { setShowDetails(true); handleMenuClose(); }}>
                  <FontAwesomeIcon icon={faEye} className="mr-2 text-gray-600" />
                  View Details
                </MenuItem>
                <MenuItem onClick={() => { alert('Edit functionality coming soon'); handleMenuClose(); }}>
                  <FontAwesomeIcon icon={faUserPen} className="mr-2 text-blue-500" />
                  Edit Post
                </MenuItem>
                <MenuItem onClick={() => { alert('Post deleted'); handleMenuClose(); }}>
                  <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-500" />
                  Delete Post
                </MenuItem>
              </Menu>
            </>
          }
          title={artistName || 'Unknown Artist'}
          subheader={title || 'Untitled'}
        />

        <CardMedia
          component="img"
          image={image || '/assets/img-12.jpg'}
          alt={title || 'Artwork'}
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'contain',
          }}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description || 'No description available'}
          </Typography>
          <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ display: 'block', mt: 1, textAlign: 'center' }}
                    >
                      Joined on {createdAt ? new Date(createdAt).toLocaleDateString() : '—'}
                    </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', pb: '2rem' }}>
          <Tooltip title="Accept bid" arrow>
            <Button
              size="small"
              variant="contained"
              sx={{
                backgroundColor: '#3D2B1F',
                color: 'white',
                textTransform: 'none',
                px: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: '#8B5E3C',
                },
              }}
            >
              Accept
            </Button>
          </Tooltip>

          <Tooltip title="Decline bid" arrow>
            <Button
              size="small"
              variant="outlined"
              sx={{
                color: '#3D2B1F',
                borderColor: '#e5e7eb',
                textTransform: 'none',
                px: 2,
                mx: 1,
                '&:hover': {
                  backgroundColor: '#f3f4f6',
                  color: '#C08B6F',
                },
              }}
            >
              Decline
            </Button>
          </Tooltip>
        </CardActions>
      </Card>

      {showDetails && (
        <PostsCardDetails item={item} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

export default PostsCard;