import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  Button,
  Menu,
  MenuItem,
  Tooltip,
  IconButton,
  Avatar,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEllipsisVertical,
  faUserPen,
  faTrash,
  faEye,
} from '@fortawesome/free-solid-svg-icons';
import CardDetails from './UserCardDetails';

const UserCard = ({ item, onApprove, onDecline }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const { id, name, email, role, approvalStatus } = item || {};

  // Truncate long email addresses
  const truncateEmail = (email) => {
    if (!email) return 'No email provided';
    if (email.length > 25) {
      return email.substring(0, 25) + '...';
    }
    return email;
  };

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



  // Only render if the user is an artist and pending
  if (!item || role !== 'Artist' || approvalStatus !== 'Pending') {
    return null;
  }

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
            <Avatar sx={{ bgcolor: '#3D2B1F' }}>
              {name?.[0]?.toUpperCase() || 'U'}
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
                  Edit User
                </MenuItem>
                <MenuItem onClick={() => { alert('User deleted'); handleMenuClose(); }}>
                  <FontAwesomeIcon icon={faTrash} className="mr-2 text-red-500" />
                  Delete User
                </MenuItem>
              </Menu>
            </>
          }
          title={name || 'Unknown User'}
          subheader={truncateEmail(email)}
        />

        <CardContent sx={{ textAlign: 'center' }}>
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              mb: 1
            }}
          >
            {email}
          </Typography>

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
              mt: 1,
            }}
          >
            {role}
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
              mt: 1,
              ml: 1,
            }}
          >
            {approvalStatus}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
          <Tooltip title="Approve artist access" arrow>
            <Button
              size="small"
              variant="contained"
              onClick={handleApprove}
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
              Approve
            </Button>
          </Tooltip>

          <Tooltip title="Decline request" arrow>
            <Button
              size="small"
              variant="outlined"
              onClick={handleDecline}
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
        <CardDetails item={item} onClose={() => setShowDetails(false)} />
      )}
    </>
  );
};

export default UserCard;
