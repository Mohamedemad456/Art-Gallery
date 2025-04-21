import React from 'react';
import Slider from 'react-slick';
import { Card, CardMedia, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  position: 'relative',
  overflow: 'hidden',
  height: 300,
  width: '100%',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
  [theme.breakpoints.down('lg')]: {
    height: 280,
  },
  [theme.breakpoints.down('md')]: {
    height: 250,
  },
  [theme.breakpoints.down('sm')]: {
    height: 200,
  },
  [theme.breakpoints.down('xs')]: {
    height: 180,
  },
}));

const Overlay = styled(Box)(({ theme }) => ({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  background: 'rgba(0, 0, 0, 0.7)',
  color: '#fff',
  padding: theme.spacing(2),
  transform: 'translateY(100%)',
  transition: 'transform 0.3s ease',
  '.MuiCard-root:hover &': {
    transform: 'translateY(0)',
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    '& .MuiTypography-h6': {
      fontSize: '0.9rem',
    },
    '& .MuiTypography-subtitle1': {
      fontSize: '0.8rem',
    },
  },
}));

const ArrowButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: theme.shadows[4],
  zIndex: 1000, // High z-index to ensure visibility
  padding: theme.spacing(1.5),
  border: '1px solid #ccc', // Debugging border
  '&:hover': {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(1),
    '& svg': {
      fontSize: '1rem',
    },
  },
  [theme.breakpoints.down('xs')]: {
    padding: theme.spacing(0.8),
    '& svg': {
      fontSize: '0.9rem',
    },
  },
}));

const PrevArrow = styled(ArrowButton)({
  left: -50,
  [theme => theme.breakpoints.down('lg')]: {
    left: -40,
  },
  [theme => theme.breakpoints.down('md')]: {
    left: -35,
  },
  [theme => theme.breakpoints.down('sm')]: {
    left: -25,
  },
  [theme => theme.breakpoints.down('xs')]: {
    left: -20,
  },
});

const NextArrow = styled(ArrowButton)({
  right: -50,
  [theme => theme.breakpoints.down('lg')]: {
    right: -40,
  },
  [theme => theme.breakpoints.down('md')]: {
    right: -35,
  },
  [theme => theme.breakpoints.down('sm')]: {
    right: -25,
  },
  [theme => theme.breakpoints.down('xs')]: {
    right: -20,
  },
});

// Custom arrow components using Font Awesome
const CustomPrevArrow = (props) => {
  const { onClick } = props;
  console.log('PrevArrow rendered'); // Debugging
  return (
    <PrevArrow onClick={onClick} aria-label="Previous slide">
      <FontAwesomeIcon icon={faChevronLeft} />
    </PrevArrow>
  );
};

const CustomNextArrow = (props) => {
  const { onClick } = props;
  console.log('NextArrow rendered'); // Debugging
  return (
    <NextArrow onClick={onClick} aria-label="Next slide">
      <FontAwesomeIcon icon={faChevronRight} />
    </NextArrow>
  );
};

const ArtCarousel = ({ artworks: propArtworks }) => {
  // Use propArtworks if provided and valid, otherwise use default data
  const data = Array.isArray(propArtworks) && propArtworks.length > 0 ? propArtworks : "";

  // Slick carousel settings
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    centerMode: false,
    responsive: [
      {
        breakpoint: 1200, // lg
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 960, // md
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 600, // sm
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <Box
      sx={{
        maxWidth: { xs: '100%', sm: 800, md: 900, lg: 1200 },
        mx: 'auto',
        my: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 8, md: 8, lg: 10 },
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        '& .slick-track': {
          display: 'flex',
          alignItems: 'center',
          margin: '0 auto',
        },
        '& .slick-slide': {
          padding: '0 8px',
        },
      }}
    >
      {data.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ py: 2 }}>
          No artworks available
        </Typography>
      ) : (
        <Slider {...settings}>
          {data.map((artwork) => (
            <Box
              key={artwork.id}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <StyledCard sx={{ maxWidth: 350, width: '100%' }}>
                <CardMedia
                  component="img"
                  height="100%"
                  image={artwork.image}
                  alt={artwork.title}
                  sx={{ objectFit: 'cover' }}
                />
                <Overlay>
                  <Typography variant="h6" component="div">
                    {artwork.title}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    by {artwork.artist}
                  </Typography>
                </Overlay>
              </StyledCard>
            </Box>
          ))}
        </Slider>
      )}
    </Box>
  );
};

export default ArtCarousel;