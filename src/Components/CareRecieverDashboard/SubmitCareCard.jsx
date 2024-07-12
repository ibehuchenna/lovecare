import React, { useState } from 'react';
import {
  Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, IconButton
} from '@mui/material';
import { styled } from '@mui/system';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import PaymentIcon from '@mui/icons-material/Payment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import CloseIcon from '@mui/icons-material/Close';
import { blue, pink, grey } from '@mui/material/colors';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  margin: 'auto',
  marginTop: theme.spacing(2),
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  borderRadius: 10,
  background: 'linear-gradient(to bottom right, #2d6187, #4398d1)',
  color: 'white',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'scale(1.02)',
  },
}));

const CustomDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 15,
    padding: theme.spacing(2),
    background: 'linear-gradient(to bottom right, #ffffff, #e0f7fa)',
    width: '60%', // Adjust the width as needed
    maxWidth: '600px', // Adjust the maxWidth as needed
  },
}));

const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(2),
  background: blue[500],
  color: 'white',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderTopLeftRadius: 15,
  borderTopRightRadius: 15,
}));

const SubmitCareCard = ({ caretakerName, onSendMoney }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [transactionImage, setTransactionImage] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('credit_card');

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSendMoney = () => {
    const formData = new FormData();
    formData.append('transactionImage', transactionImage);
    formData.append('paymentMethod', selectedPaymentMethod);

    onSendMoney(formData);
    setOpenDialog(false);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setTransactionImage(file);
  };

  const handlePaymentMethodChange = (event) => {
    setSelectedPaymentMethod(event.target.value);
  };

  return (
    <>
      <StyledCard>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ textAlign: 'center', fontWeight: 'bold', mb: 2 }}>
            Care Taker
          </Typography>
          <Typography variant="subtitle1" sx={{ textAlign: 'center', mb: 2 }}>
            Submit the form for a caretaker.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenDialog}
            startIcon={<AttachMoneyIcon />}
            sx={{ width: '100%', backgroundColor: blue[500], '&:hover': { backgroundColor: blue[700] } }}
          >
            Send Money
          </Button>
        </CardContent>
      </StyledCard>

      <CustomDialog open={openDialog} onClose={handleCloseDialog}>
        <CustomDialogTitle>
          <span>Select Payment Method</span>
          <IconButton edge="end" color="inherit" onClick={handleCloseDialog}>
            <CloseIcon />
          </IconButton>
        </CustomDialogTitle>
        <DialogContent>
          <FormControl component="fieldset">
            <FormLabel component="legend">Payment Method</FormLabel>
            <RadioGroup
              aria-label="payment method"
              name="paymentMethod"
              value={selectedPaymentMethod}
              onChange={handlePaymentMethodChange}
              sx={{ mt: 2 }}
            >
              <FormControlLabel
                value="credit_card"
                control={<Radio />}
                label={
                  <Grid container alignItems="center">
                    <CreditCardIcon sx={{ color: blue[700], mr: 1 }} />
                    Credit Card
                  </Grid>
                }
              />
              <FormControlLabel
                value="sofort"
                control={<Radio />}
                label={
                  <Grid container alignItems="center">
                    <PaymentIcon sx={{ color: pink[500], mr: 1 }} />
                    SOFORT Banking
                  </Grid>
                }
              />
              <FormControlLabel
                value="paypal"
                control={<Radio />}
                label={
                  <Grid container alignItems="center">
                    <AccountBalanceIcon sx={{ color: grey[700], mr: 1 }} />
                    PayPal
                  </Grid>
                }
              />
              <FormControlLabel
                value="bank_transfer"
                control={<Radio />}
                label={
                  <Grid container alignItems="center">
                    <AccountBalanceIcon sx={{ color: grey[700], mr: 1 }} />
                    Bank Transfer
                  </Grid>
                }
              />
            </RadioGroup>
          </FormControl>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">Cancel</Button>
          <Button onClick={handleSendMoney} color="primary">Send Money</Button>
        </DialogActions>
      </CustomDialog>
    </>
  );
};

export default SubmitCareCard;
