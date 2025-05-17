import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Paper,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  MenuItem,
} from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPen, faPlus, faClock } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import SnackbarAlert from '../SnackbarAlert/snackbarAlert';

const API_URL = 'https://localhost:7043/api/Artist/artworks';

const PREDEFINED_TAGS = [
  { id: '96DB95FD-5F5B-4542-85E6-052CE7E4453C', name: 'Modern' },
  { id: '2177F03E-0E90-4020-941D-322BE042114B', name: 'Oil Painting' },
  { id: 'D29A05C5-1023-4E1F-9A7D-80033E487683', name: 'Vibrant' }
];

const PREDEFINED_CATEGORIES = [
  { id: '1BFB69CF-9708-4E5A-834E-83A18F08083D', name: 'Landscape' },
  { id: 'D73A3E7D-F1E5-446E-B6BD-E8FBB45A056A', name: 'Portrait' }
];

const formatDate = (date) => {
  return date ? new Date(date).toISOString() : null;
};

const ArtworkDashboard = () => {
  const [artworks, setArtworks] = useState([]);
  const [selected, setSelected] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState(null);
  const [userId, setUserId] = useState(null);
  const [artistName, setArtistName] = useState('');
  const [form, setForm] = useState({
    artistName: '',
    title: '',
    description: '',
    initialPrice: '',
    auctionStartTime: '',
    auctionEndTime: '',
    category: '',
    tags: [],
    image: '/assets/img-01.jpg',
  });
  const [formErrors, setFormErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarType, setSnackbarType] = useState('error');
  const navigate = useNavigate();
  const [extendDialogOpen, setExtendDialogOpen] = useState(false);
  const [selectedArtworkId, setSelectedArtworkId] = useState(null);
  const [extendHours, setExtendHours] = useState('');
  const [extendMinutes, setExtendMinutes] = useState('');
  const [extendSeconds, setExtendSeconds] = useState('');

  const fetchArtworks = async () => {
    try {
      const authToken = sessionStorage.getItem('accessToken');
      if (!authToken) {
        navigate('/signup');
        return;
      }


      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });
      if (!response.ok) {
        if (response.status === 401) {
          sessionStorage.removeItem('accessToken');
          navigate('/signup');
          return;
        }
        throw new Error(`Failed to fetch artworks: ${response.status} ${response.statusText}`);
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Invalid response format: Expected JSON');
      }

      const responseData = await response.json();

      if (!responseData || !responseData.data || !Array.isArray(responseData.data)) {
        setArtworks([]);
        return;
      }
      setArtworks(responseData.data);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to fetch artworks');
      setSnackbarOpen(true);
      setSnackbarType('error');
      setArtworks([]);
    }
  };

  useEffect(() => {
    const authToken = sessionStorage.getItem('accessToken');
    if (!authToken) {
      navigate('/signup');
      return;
    }

    try {
      const decodedToken = jwtDecode(authToken);
      const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      if (userRole !== 'Artist') {
        navigate('/');
        return;
      }

      const id = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      const name = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
      setUserId(id);
      setArtistName(name);
      setForm(prev => ({ ...prev, artistName: name }));
      fetchArtworks();
    } catch (err) {
      sessionStorage.removeItem('accessToken');
      navigate('/login');
    }
  }, [navigate]);

  const handleSelectAll = (e) => {
    setSelected(e.target.checked ? artworks.map((a) => a.id) : []);
  };

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleDelete = async (id) => {
    try {
      const authToken = sessionStorage.getItem('accessToken');
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete artwork');
      }

      setArtworks((prev) => prev.filter((a) => a.id !== id));
      setSelected((prev) => prev.filter((i) => i !== id));
    } catch (err) {
      setErrorMessage(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleBulkDelete = async () => {
    try {
      const authToken = sessionStorage.getItem('accessToken');
      await Promise.all(
        selected.map((id) =>
          fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${authToken}`,
              'Accept': 'application/json'
            }
          })
        )
      );
      setArtworks((prev) => prev.filter((a) => !selected.includes(a.id)));
      setSelected([]);
    } catch (err) {
      setErrorMessage(err.message);
      setSnackbarOpen(true);
    }
  };

  const handleExtendAuction = (id) => {
    const artwork = artworks.find(art => art.id === id);
    if (!artwork) {
      setErrorMessage('Artwork not found');
      setSnackbarOpen(true);
      return;
    }

    if (artwork.approvalStatus === 'Finished') {
      setErrorMessage('Cannot extend a finished auction');
      setSnackbarOpen(true);
      return;
    }

    if (artwork.approvalStatus === 'Sold') {
      setErrorMessage('Cannot extend a sold auction');
      setSnackbarOpen(true);
      return;
    }

    setSelectedArtworkId(id);
    setExtendHours('');
    setExtendMinutes('');
    setExtendSeconds('');
    setExtendDialogOpen(true);
  };

  const handleExtendDialogClose = () => {
    setExtendDialogOpen(false);
    setSelectedArtworkId(null);
    setExtendHours('');
    setExtendMinutes('');
    setExtendSeconds('');
  };

  const handleExtendSubmit = async () => {
    try {
      const authToken = sessionStorage.getItem('accessToken');
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      // Format time as HH:mm:ss
      const hours = extendHours ? extendHours.padStart(2, '0') : '00';
      const minutes = extendMinutes ? extendMinutes.padStart(2, '0') : '00';
      const seconds = extendSeconds ? extendSeconds.padStart(2, '0') : '00';
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      if (parseInt(hours) === 0 && parseInt(minutes) === 0 && parseInt(seconds) === 0) {
        throw new Error('Duration must be greater than 0');
      }


      const response = await fetch(`${API_URL}/${selectedArtworkId}/extend-auction?duration=${formattedTime}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to extend auction: ${response.status} ${response.statusText}`);
      }

      await fetchArtworks();
      handleExtendDialogClose();
      setErrorMessage('Auction extended successfully');
      setSnackbarType('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Error extending auction:', error);
      setErrorMessage(error.message || 'Failed to extend auction');
      setSnackbarType('error');
      setSnackbarOpen(true);
    }
  };

  const handleDialogOpen = (art = null) => {
    setEditingArtwork(art);
    if (art) {
      // Map the artwork data to form fields
      setForm({
        artistName: art.artistName || artistName,
        title: art.title || '',
        description: art.description || '',
        initialPrice: art.price || '',
        auctionStartTime: art.auctionStart ? new Date(art.auctionStart).toISOString().slice(0, 16) : '',
        auctionEndTime: art.auctionEnd ? new Date(art.auctionEnd).toISOString().slice(0, 16) : '',
        category: art.category?.id || '',
        tags: art.tags?.map(tag => tag.id) || [],
        image: art.imageUrl || '/assets/img-01.jpg'
      });
    } else {
      // Reset form for new artwork
      setForm({
        artistName: artistName,
        title: '',
        description: '',
        initialPrice: '',
        auctionStartTime: '',
        auctionEndTime: '',
        category: '',
        tags: [],
        image: '/assets/img-01.jpg',
      });
    }
    setFormErrors({});
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditingArtwork(null);
    setFormErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    //setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (!form.artistName) errors.artistName = 'Artist name is required';
    if (!form.title) errors.title = 'Title is required';
    if (!form.initialPrice || isNaN(form.initialPrice) || form.initialPrice < 10) {
      errors.initialPrice = 'Price must be at least $10';
    }
    if (!form.category) errors.category = 'Category is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setErrorMessage('Please fill in all required fields');
      setSnackbarOpen(true);
      return;
    }

    try {
      const authToken = sessionStorage.getItem('accessToken');
      if (!authToken) {
        throw new Error('Authentication token is missing');
      }

      // Create FormData object
      const formData = new FormData();
      
      // For update operation, include the ID
      if (editingArtwork) {
        formData.append('id', editingArtwork.id);
      }
      
      // Add fields in the exact format that works in Postman
      formData.append('Title', form.title);
      formData.append('Description', form.description || '');
      formData.append('CategoryId', form.category);
      formData.append('Price', form.initialPrice);
      // Add each tag separately
      if (Array.isArray(form.tags)) {
        form.tags.forEach(tagId => {
          formData.append('Tags', tagId);
        });
      }
      
      // Handle image file
      if (form.image instanceof File) {
        formData.append('Image', form.image);
      } else if (editingArtwork && editingArtwork.image) {
        formData.append('Image', editingArtwork.image);
      } else {
        formData.append('Image', '/assets/img-01.jpg');
      }
      
      // Add auction details with proper price handling
      const price = parseFloat(form.initialPrice);
      if (isNaN(price) || price < 0) {
        throw new Error('Invalid price value');
      }

      // Log the price before adding to FormData
      console.log('Price before adding to FormData:', price);
      
      // Add auction fields exactly as they work in Postman
      formData.append('Auction.StartingPrice', price.toString());
      if (form.auctionStartTime) {
        formData.append('Auction.AuctionStart', formatDate(form.auctionStartTime));
      }
      if (form.auctionEndTime) {
        formData.append('Auction.AuctionEnd', formatDate(form.auctionEndTime));
      }

      // Log all FormData entries
      console.log('FormData entries:');
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }

      const response = await fetch(
        editingArtwork ? `${API_URL}/${editingArtwork.id}` : API_URL,
        {
          method: editingArtwork ? 'PUT' : 'POST',
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Accept': 'application/json'
          },
          body: formData
        }
      );

      let responseData;
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        try {
          responseData = await response.json();
          console.log('Response data:', responseData);
        } catch (e) {
          console.error('Error parsing JSON response:', e);
          responseData = {};
        }
      } else {
        responseData = {};
      }

      if (!response.ok) {
        // Handle validation errors
        if (responseData.errors && Array.isArray(responseData.errors)) {
          const errorMessages = responseData.errors
            .map(err => {
              if (typeof err === 'string') return err;
              if (err.message) return err.message;
              if (err.errorMessage) return err.errorMessage;
              return JSON.stringify(err);
            })
            .join(', ');
          throw new Error(errorMessages);
        }
        
        throw new Error(responseData.message || `Failed to save artwork: ${response.status} ${response.statusText}`);
      }

      await fetchArtworks();
      handleDialogClose();
    } catch (error) {
      console.error('Error saving artwork:', error);
      setErrorMessage(error.message || 'Failed to submit artwork');
      setSnackbarOpen(true);
    }
  };

  // Add image upload handler
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#fff8f0', minHeight: '100vh' }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-start', sm: 'center' }}
        spacing={2}
        mb={2}
      >
        <Typography variant="h4" color="secondary.dark">
          Your Artworks
        </Typography>
        <Button
          variant="contained"
          sx={{ bgcolor: 'orange', '&:hover': { bgcolor: 'darkorange' } }}
          startIcon={<FontAwesomeIcon icon={faPlus} />}
          onClick={() => handleDialogOpen()}
        >
          Add Artwork
        </Button>
      </Stack>

      {selected.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Button
            color="error"
            onClick={handleBulkDelete}
            startIcon={<FontAwesomeIcon icon={faTrash} />}
          >
            Delete Selected ({selected.length})
          </Button>
        </Box>
      )}

      <TableContainer
        component={Paper}
        sx={{ bgcolor: '#fff0e6', overflowX: 'auto' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={selected.length === artworks.length && artworks.length > 0}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Artist</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Tags</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(artworks) && artworks.map((art, index) => {
              const key = art.id != null ? art.id : `artwork-${index}`;
              return (
                <TableRow key={key} hover>
                  <TableCell padding="checkbox">
                    <Checkbox
                      checked={selected.includes(art.id)}
                      onChange={() => handleSelect(art.id)}
                    />
                  </TableCell>
                  <TableCell>{art.title}</TableCell>
                  <TableCell>{art.artistName}</TableCell>
                  <TableCell>{art.currentPrice} $</TableCell>
                  <TableCell>
                    {art.category?.name || art.category || 'N/A'}
                  </TableCell>
                  <TableCell>
                    {art.tags?.map(tag => tag.name || tag).join(', ') || 'No tags'}
                  </TableCell>
                  <TableCell>{art.status || 'Active'}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      color="primary"
                      onClick={() => handleDialogOpen(art)}
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </IconButton>
                    {art.approvalStatus !== 'Finished' && art.approvalStatus !== 'Sold' && (
                      <IconButton
                        color="secondary"
                        onClick={() => handleExtendAuction(art.id)}
                        title="Extend Auction"
                      >
                        <FontAwesomeIcon icon={faClock} />
                      </IconButton>
                    )}
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(art.id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
            {(!Array.isArray(artworks) || artworks.length === 0) && (
              <TableRow>
                <TableCell colSpan={8} align="center">
                  No artworks to show.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <SnackbarAlert
        open={snackbarOpen}
        message={errorMessage}
        onClose={handleSnackbarClose}
        alertType={snackbarType}
      />

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>{editingArtwork ? 'Edit Artwork' : 'Add Artwork'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Artist Name"
            name="artistName"
            fullWidth
            value={form.artistName}
            disabled
            sx={{ mb: 2 , mt: 2}}
          />
          <TextField
            label="Title"
            name="title"
            fullWidth
            value={form.title}
            onChange={handleInputChange}
            error={!!formErrors.title}
            helperText={formErrors.title}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={4}
            value={form.description}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Initial Price"
            name="initialPrice"
            type="number"
            fullWidth
            value={form.initialPrice}
            onChange={handleInputChange}
            error={!!formErrors.initialPrice}
            helperText={formErrors.initialPrice}
            inputProps={{
              min: 10,
              step: 0.01
            }}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Auction Start Time"
            name="auctionStartTime"
            type="datetime-local"
            fullWidth
            value={form.auctionStartTime}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Auction End Time"
            name="auctionEndTime"
            type="datetime-local"
            fullWidth
            value={form.auctionEndTime}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            select
            label="Category"
            name="category"
            fullWidth
            value={form.category}
            onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
            error={!!formErrors.category}
            helperText={formErrors.category}
            sx={{ mb: 2 }}
          >
            {PREDEFINED_CATEGORIES.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Tags"
            name="tags"
            fullWidth
            value={form.tags}
            onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
            SelectProps={{
              multiple: true,
              renderValue: (selected) => {
                const selectedTags = PREDEFINED_TAGS.filter(tag => selected.includes(tag.id));
                return selectedTags.map(tag => tag.name).join(', ');
              }
            }}
            sx={{ mb: 2 }}
          >
            {PREDEFINED_TAGS.map((tag) => (
              <MenuItem key={tag.id} value={tag.id}>
                {tag.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            type="file"
            inputProps={{
              accept: 'image/*'
            }}
            onChange={handleImageUpload}
            fullWidth
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {editingArtwork ? 'Update' : 'Add'} Artwork
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={extendDialogOpen} onClose={handleExtendDialogClose}>
        <DialogTitle>Extend Auction</DialogTitle>
        <DialogContent>
          <TextField
            label="Artwork ID"
            value={selectedArtworkId || ''}
            disabled
            fullWidth
            sx={{ mb: 2, mt: 2 }}
          />
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              label="Hours"
              type="number"
              value={extendHours}
              onChange={(e) => setExtendHours(e.target.value)}
              inputProps={{
                min: 0,
                max: 23,
                step: 1
              }}
              sx={{ width: '33%' }}
            />
            <TextField
              label="Minutes"
              type="number"
              value={extendMinutes}
              onChange={(e) => setExtendMinutes(e.target.value)}
              inputProps={{
                min: 0,
                max: 59,
                step: 1
              }}
              sx={{ width: '33%' }}
            />
            <TextField
              label="Seconds"
              type="number"
              value={extendSeconds}
              onChange={(e) => setExtendSeconds(e.target.value)}
              inputProps={{
                min: 0,
                max: 59,
                step: 1
              }}
              sx={{ width: '33%' }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleExtendDialogClose} color="secondary">
            Cancel
          </Button>
          <Button 
            onClick={handleExtendSubmit} 
            color="primary"
            disabled={!extendHours && !extendMinutes && !extendSeconds}
          >
            Extend
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ArtworkDashboard;