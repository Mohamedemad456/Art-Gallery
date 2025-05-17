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
  Chip,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faUserPen,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import PostsCardDetails from './PostsCardDetails';

const PostsCard = ({ item, onApprove, onDecline }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const {
    id,
    artistName,
    title,
    description,
    image,
    artistimage,
    initialPrice,
    category,
    medium,
    year,
    createdAt,
    status,
    tags
  } = item || {};

  const handleApprove = async () => {
    if (onApprove) {
      await onApprove(id);
    }
  };

  const handleDecline = async () => {
    if (onDecline) {
      await onDecline(id);
    }
  };

  // Format tags to ensure they're strings
  const formattedTags = Array.isArray(tags) 
    ? tags.map(tag => typeof tag === 'object' ? tag.name : tag)
    : [];

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
          image={image || '/default-artwork.jpg'}
          alt={title || 'Artwork'}
          sx={{
            width: '100%',
            height: 200,
            objectFit: 'contain',
          }}
        />

        <CardContent sx={{ textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              mb: 1
            }}
          >
            {description || 'No description available'}
          </Typography>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', mb: 1 }}>
            <Typography
              variant="caption"
              sx={{
                backgroundColor: '#E0E7FF',
                color: '#4338CA',
                borderRadius: '0.375rem',
                px: 1,
                py: 0.5,
                display: 'inline-block',
                fontWeight: 500,
              }}
            >
              {category}
            </Typography>

            <Typography
              variant="caption"
              sx={{
                backgroundColor: '#FEE2E2',
                color: '#991B1B',
                borderRadius: '0.375rem',
                px: 1,
                py: 0.5,
                display: 'inline-block',
                fontWeight: 500,
              }}
            >
              {status}
            </Typography>
          </div>

          {/* Tags display */}
          {formattedTags.length > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', flexWrap: 'wrap', mt: 1 }}>
              {formattedTags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  size="small"
                  sx={{
                    backgroundColor: '#F3F4F6',
                    color: '#4B5563',
                    '&:hover': {
                      backgroundColor: '#E5E7EB',
                    },
                  }}
                />
              ))}
            </div>
          )}

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ display: 'block', mt: 1 }}
          >
            Posted on {createdAt ? new Date(createdAt).toLocaleDateString() : '—'}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', gap: 2, pb: 2 }}>
          <Tooltip title="Approve">
            <Button
              variant="contained"
              color="success"
              size="small"
              onClick={handleApprove}
              sx={{ minWidth: '100px' }}
            >
              Approve
            </Button>
          </Tooltip>
          <Tooltip title="Decline">
            <Button
              variant="contained"
              color="error"
              size="small"
              onClick={handleDecline}
              sx={{ minWidth: '100px' }}
            >
              Decline
            </Button>
          </Tooltip>
        </CardActions>
      </Card>

      {showDetails && (
        <PostsCardDetails
          item={item}
          onClose={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default PostsCard;