import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { styled } from '@mui/system';

const primaryGradient = 'linear-gradient(135deg, #f5f7fa, #c3cfe2)';
const secondaryColor = '#6a11cb';

const StyledPaper = styled('div')(({ theme }) => ({
  background: primaryGradient,
  padding: theme.spacing(6.5),
  borderRadius: theme.spacing(4),
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  width: '300px',
  height: '300px',
  transition: 'transform 0.3s ease-in-out',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    transform: 'scale(1.05)',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
  },
  color: '#000',
}));

const EarningsHistoryTable = () => {
  const [patientsOpen, setPatientsOpen] = useState(false);

  // Sample patient history
  const patients = [
    { name: 'John Doe', gender: 'Male', condition: 'Requires assistance', Shedule:'2pm to 5pm',request: 'Accepted' },
    { name: 'Jane Smith', gender: 'Female', condition: 'Needs regular medical checkups', Shedule:'2pm to 5pm',request: 'Accepted' },
    { name: 'Michael Brown', gender: 'Male', condition: 'Limited mobility', Shedule:'2pm to 5pm',request: 'Declined' },
    { name: 'Emily Johnson', gender: 'Female', condition: 'Dementia care required', Shedule:'2pm to 5pm',request: 'Declined' },
  ];

  // Function to count total patients
  const countTotalPatients = () => patients.length;

  // Handle dialog open/close
  const handlePatientsOpen = () => setPatientsOpen(true);
  const handlePatientsClose = () => setPatientsOpen(false);

  return (
    <>
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <StyledPaper elevation={9}>
          <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>
            Total Patients
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center', color: '#000' }}>
            {countTotalPatients()}
          </Typography>
          <Typography variant="body1" color="#555" sx={{ textAlign: 'center' }}>
            Recently Added: {patients[0].name}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, borderRadius: 4, background: secondaryColor, color: '#fff' }}
            onClick={handlePatientsOpen}
          >
            View Details
          </Button>
        </StyledPaper>
      </Box>

      <Dialog open={patientsOpen} onClose={handlePatientsClose} maxWidth="sm" fullWidth>
        <DialogTitle>Patient Details</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Gender</TableCell>
                  <TableCell>Condition</TableCell>
                  <TableCell>Shedule Time</TableCell>
                  <TableCell>Request</TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient, index) => (
                  <TableRow key={index}>
                    <TableCell>{patient.name}</TableCell>
                    <TableCell>{patient.gender}</TableCell>
                    <TableCell>{patient.condition}</TableCell>
                    <TableCell>{patient.Shedule}</TableCell>
                    <TableCell sx={{ color: patient.request === 'Accepted' ? 'blue' : 'red' }}>
                      {patient.request}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePatientsClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EarningsHistoryTable;
