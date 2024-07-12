import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Paper, Box } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import 'react-toastify/dist/ReactToastify.css';

const CareReceiverForm = () => {
  const navigate = useNavigate(); // Initialize the navigate function
  const [id, setId] = useState(null);
  const [fullName, setFullName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [healthInsurance, setHealthInsurance] = useState('');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://lovecare-backend.onrender.com/api/care-receiver', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        if (response.ok && data) {
          setId(data._id);
          setFullName(data.fullName);
          setDateOfBirth(data.dateOfBirth);
          setAddress(data.address);
          setCity(data.city);
          setState(data.state);
          setPostalCode(data.postalCode);
          setPhoneNumber(data.phoneNumber);
          setHealthInsurance(data.healthInsurance);
          setEmergencyContact(data.emergencyContact);
          setSubmitted(true);
        }
      } catch (error) {
        toast.error('Failed to fetch data');
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      fullName,
      dateOfBirth,
      address,
      city,
      state,
      postalCode,
      phoneNumber,
      healthInsurance,
      emergencyContact
    };

    try {
      const method = id ? 'PUT' : 'POST';
      const url = id ? `https://lovecare-backend.onrender.com/api/care-receiver/${id}` : 'https://lovecare-backend.onrender.com/api/care-receiver';
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(payload)
      });
      const data = await response.json();

      if (response.ok) {
        toast.success('Form submitted successfully');
        setId(data._id);
        setSubmitted(true);
        setIsEditing(false);
        navigate('/CareRecipent-dashboard'); // Navigate to the dashboard on success
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error('Form submission failed');
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSubmitted(false);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`https://lovecare-backend.onrender.com/api/care-receiver/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.ok) {
        toast.success('Form reset successfully');
        setId(null);
        setFullName('');
        setDateOfBirth('');
        setAddress('');
        setCity('');
        setState('');
        setPostalCode('');
        setPhoneNumber('');
        setHealthInsurance('');
        setEmergencyContact('');
        setSubmitted(false);
      } else {
        toast.error('Failed to reset form');
      }
    } catch (error) {
      toast.error('Failed to reset form');
    }
  };

  return (
    <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Full Name"
              fullWidth
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Date of Birth"
              fullWidth
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Address"
              fullWidth
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="City"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="State"
              fullWidth
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <TextField
              label="Postal Code"
              fullWidth
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Phone Number"
              fullWidth
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Health Insurance"
              fullWidth
              value={healthInsurance}
              onChange={(e) => setHealthInsurance(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={12}>
            <TextField
              label="Emergency Contact"
              fullWidth
              value={emergencyContact}
              onChange={(e) => setEmergencyContact(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
        </Grid>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          {submitted && !isEditing ? (
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={handleEdit}
                sx={{ mr: 1, backgroundColor: 'black', color: 'white' }}
              >
                Edit
              </Button>
              <Button
                variant="contained"
                startIcon={<DeleteIcon />}
                onClick={handleDelete}
                sx={{ backgroundColor: 'red', color: 'white' }}
              >
                Delete
              </Button>
            </Box>
          ) : (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              disabled={submitted}
            >
              Save
            </Button>
          )}
        </Box>
      </form>
    </Paper>
  );
};

export default CareReceiverForm;
