import React, { useState } from "react";
import { Link } from 'react-router-dom';

import {
  Card,
  CardContent,
  Typography,
  Box,
  Rating,
  Button,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import axios from "../../config/axiosConfig";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StyledCard = styled(Card)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  maxWidth: 345,
  margin: "auto",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
  borderRadius: 10,
  overflow: "hidden",
}));

const StyledDialogTitle = styled(DialogTitle)(({ theme }) => ({
  background: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
}));

const StyledDialogActions = styled(DialogActions)(({ theme }) => ({
  background: theme.palette.grey[200],
  padding: theme.spacing(2),
}));

const CareTakerCard = ({ caretaker }) => {
  const {
    _id: caretakerId,
    fullName: name,
    profilePhoto,
    rating,
    skills,
    experience,
    priceHourly,
    city,
  } = caretaker;

  const [openDialog, setOpenDialog] = useState(false);
  const [hours, setHours] = useState("");
  const [problem, setProblem] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [additionalRequirements, setAdditionalRequirements] = useState("");
  const [gender, setGender] = useState("");

  const handleSelect = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmitRequest = async () => {
    try {
      const response = await axios.post("/requests", {
        caretakerId,
        problem,
        scheduleTime,
        additionalRequirements,
        hours: parseInt(hours),
        gender,
      });

      console.log("Request submitted:", response.data);
      setOpenDialog(false);
      toast.success("Request submitted successfully");
    } catch (error) {
      console.error("Error submitting request:", error);
      toast.error("Failed to submit request");
    }
  };

  return (
    <StyledCard>
      <CardContent>
        <Typography
          variant="h5"
          component="div"
          sx={{ fontWeight: "bold", textAlign: "center", mb: 2 }}
        >
          {name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Rating value={rating} readOnly />
          <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
            ({rating})
          </Typography>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 2 }}
        >
          {experience} years of experience
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{ flexWrap: "wrap", justifyContent: "center", mb: 2 }}
        >
          {skills && skills.length > 0 ? (
            skills.map((skill, index) => (
              <Chip
                key={index}
                label={skill}
                color="primary"
                variant="outlined"
              />
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No skills available
            </Typography>
          )}
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 2 }}
        >
          <LocationOnIcon sx={{ verticalAlign: "middle", mr: 0.5 }} /> {city}
        </Typography>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            mb: 2,
            color: "#1976d2",
          }}
        >
          Price: {priceHourly}/hr
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleSelect}>
            Select Caretaker
          </Button>
          <Link to="/CareRecipent-dashboard/call" variant="contained" color="secondary">
            <VideoCallIcon />
          </Link>
        </Stack>
      </CardContent>

      {/* Dialog for request form */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <StyledDialogTitle>Request Caretaker</StyledDialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Problem"
            fullWidth
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Schedule Time"
            fullWidth
            value={scheduleTime}
            onChange={(e) => setScheduleTime(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Additional Requirements"
            fullWidth
            multiline
            rows={4}
            value={additionalRequirements}
            onChange={(e) => setAdditionalRequirements(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Hours"
            fullWidth
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            type="number"
            variant="outlined"
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Gender"
            fullWidth
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            variant="outlined"
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <StyledDialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button
            onClick={handleSubmitRequest}
            color="primary"
            variant="contained"
          >
            Submit Request
          </Button>
        </StyledDialogActions>
      </Dialog>

      {/* Toast container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
      />
    </StyledCard>
  );
};

export default CareTakerCard;
