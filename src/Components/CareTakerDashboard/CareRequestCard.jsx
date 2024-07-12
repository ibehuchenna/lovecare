import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Divider,
  Button,
} from '@mui/material';
import { styled } from '@mui/system';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PersonIcon from '@mui/icons-material/Person';
import WcIcon from '@mui/icons-material/Wc';
import axios from '../../config/axiosConfig'; // Assuming your axios config file is in the 'src' folder

const StyledCard = styled(Card)(({ theme }) => ({
  width: '80vw', // Adjust as needed, e.g., '80%' or '90%'
  marginBottom: theme.spacing(3),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  borderRadius: theme.spacing(2),
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  minWidth: 120,
}));

const CareRequestCard = ({ requestId }) => {
  const [request, setRequest] = useState(null);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const response = await axios.get(`/requests/${requestId}`);
        setRequest(response.data);
      } catch (error) {
        console.error('Error fetching request:', error);
      }
    };

    fetchRequest();
  }, [requestId]);

  if (!request) {
    return null; // You can render a loading indicator or handle this case differently
  }

  return (
    <StyledCard>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Care Recipient Details
        </Typography>
        <Box display="flex" alignItems="center" mb={2}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Scheduled Time: {request.scheduleTime}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" alignItems="center" mb={2}>
          <EventNoteIcon sx={{ mr: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Condition: {request.problem}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" alignItems="center" mb={2}>
          <PersonIcon sx={{ mr: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Additional Requirements: {request.additionalRequirements}
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" alignItems="center" mb={2}>
          <WcIcon sx={{ mr: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Gender: {request.gender}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box display="flex" alignItems="center" mb={2}>
          <AccessTimeIcon sx={{ mr: 1 }} />
          <Typography variant="body2" color="textSecondary">
            Hours: {request.hours}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="flex-end" mt={2}>
          <ActionButton variant="contained" color="primary">
            Accept Request
          </ActionButton>
          <ActionButton variant="outlined" color="primary">
            Decline
          </ActionButton>
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default CareRequestCard;
