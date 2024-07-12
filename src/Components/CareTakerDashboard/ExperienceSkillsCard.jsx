import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Rating, Button, Chip, IconButton, Collapse } from '@mui/material';
import { styled } from '@mui/system';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: 300,
  margin: 'auto',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  borderRadius: 15,
  overflow: 'visible',
  position: 'relative',
  background: 'linear-gradient(to right, #2563eb, #06b6d4)',
  color: theme.palette.common.white,
}));

const ExperienceSkillsCard = () => {
  const [expanded, setExpanded] = useState(false);
  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    rating: 4.5,
    skills: ['Compassionate', 'Reliable', 'First Aid'],
    experience: 5,
    profilePhoto: 'https://via.placeholder.com/200',
    email: '',
    phoneNumber: '',
    address: '',
    city: ''
  });

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`https://lovecare-backend.onrender.com/api/caretaker-profiles/me`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfileData(data);
        } else {
          console.error('Failed to fetch profile data');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfileData();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleEdit = () => {
    // Implement edit logic
    console.log('Edit clicked');
  };

  const handleDelete = () => {
    // Implement delete logic
    console.log('Delete clicked');
  };

  const { fullName, rating, skills, experience, profilePhoto, email, phoneNumber, address, city } = profileData;

  return (
    <StyledCard>
      
      <CardContent sx={{ pt: 8 }}>
        <Typography variant="h5" component="div" align="center" sx={{ mb: 1 }}>
          {fullName}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mt: 1, mb: 1 }}>
          <Rating value={rating} readOnly sx={{ color: 'white' }} />
          <Typography variant="body2" color="inherit" sx={{ ml: 1 }}>
            ({rating})
          </Typography>
        </Box>
        <Typography variant="body2" color="inherit" align="center" sx={{ mb: 2 }}>
          {experience} years of experience
        </Typography>
        <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
        {skills.map((skill, index) => (
  <Chip key={index} label={skill} color="primary" variant="outlined" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)', color: 'white', m: 0.5 }} />
))}

        </Box>
        <IconButton
          aria-label={expanded ? 'collapse' : 'expand'}
          onClick={handleExpandClick}
          sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
        >
          <ExpandMoreIcon />
        </IconButton>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', p: 2, mt: 2, borderRadius: 2 }}>
            <Typography variant="body2" color="inherit">
              Email: {email}<br />
              Phone Number: {phoneNumber}<br />
              Address: {address}<br />
              City: {city}
            </Typography>
          </Box>
        </Collapse>
      </CardContent>
    </StyledCard>
  );
};

export default ExperienceSkillsCard;
