import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

export default function SnackbarAlert({ open, message, onClose, alertType, position = 'bottom' }) {
  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={onClose}
      >
        {/* Font Awesome Close Icon */}
        <FontAwesomeIcon icon={faTimes} />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={onClose}
      message={message}
      action={action}
      anchorOrigin={{
        vertical: position === 'bottom' ? 'bottom' : 'top',   // Dynamically set vertical position
        horizontal: 'center', // Always center it horizontally
      }}
      sx={{
        '& .MuiSnackbarContent-root': {
          backgroundColor: alertType === 'success' ? 'green' : 'red',
          color: 'white',
        },
      }}
    />
  );
}
