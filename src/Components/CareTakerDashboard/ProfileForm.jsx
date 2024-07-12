import React, { useState, useEffect } from 'react';
import { Grid, TextField, Button, Paper, Box } from '@mui/material';
import { toast } from 'react-toastify';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import 'react-toastify/dist/ReactToastify.css';

const ProfileForm = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [experience, setExperience] = useState('');
  const [scheduleGap, setScheduleGap] = useState('');
  const [skills, setSkills] = useState('');
  const [priceHourly, setPriceHourly] = useState('');
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found, please login again');
      return;
    }

    try {
      const response = await fetch(`https://lovecare-backend.onrender.com/api/caretaker-profiles/me`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        setFullName(data.fullName);
        setEmail(data.email);
        setPhoneNumber(data.phoneNumber);
        setAddress(data.address);
        setCity(data.city);
        setState(data.state);
        setPostalCode(data.postalCode);
        setExperience(data.experience);
        setScheduleGap(data.scheduleGap);
        setSkills(data.skills.join(', '));
        setPriceHourly(data.priceHourly);
        setProfilePhoto(data.profilePhoto);
        setSubmitted(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('fullName', fullName);
    formData.append('email', email);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('city', city);
    formData.append('state', state);
    formData.append('postalCode', postalCode);
    formData.append('experience', experience);
    formData.append('scheduleGap', scheduleGap);
    formData.append('skills', skills.split(', ').map(skill => skill.trim()));
    formData.append('priceHourly', priceHourly);

    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found, please login again');
      return;
    }

    try {
      let response;
      if (isEditing) {
        response = await fetch(`https://lovecare-backend.onrender.com/api/caretaker-profiles`, {
          method: 'PUT',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      } else {
        response = await fetch(`https://lovecare-backend.onrender.com/api/caretaker-profiles`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setIsEditing(false);
        fetchProfileData();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };

  const handleFileChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setSubmitted(false);
  };

  const handleDelete = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('No token found, please login again');
      return;
    }

    try {
      const response = await fetch(`https://lovecare-backend.onrender.com/api/caretaker-profiles`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message);
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setAddress('');
        setCity('');
        setState('');
        setPostalCode('');
        setExperience('');
        setScheduleGap('');
        setSkills('');
        setPriceHourly('');
        setProfilePhoto(null);
        setSubmitted(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
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
              label="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              label="Experience (years)"
              fullWidth
              type="number"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Schedule Gap"
              fullWidth
              type="time"
              value={scheduleGap}
              onChange={(e) => setScheduleGap(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Skills"
              fullWidth
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Price Hourly"
              fullWidth
              type="number"
              value={priceHourly}
              onChange={(e) => setPriceHourly(e.target.value)}
              required
              disabled={submitted && !isEditing}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              label="Profile Photo"
              fullWidth
              type="file"
              InputLabelProps={{ shrink: true }}
              onChange={handleFileChange}
              disabled={submitted && !isEditing}
              inputProps={{ accept: 'image/*' }}
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

export default ProfileForm;

