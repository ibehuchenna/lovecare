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
const primaryColor = '#2575fc';
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
  const [balanceOpen, setBalanceOpen] = useState(false);

  // Sample transaction history
  const transactions = [
    { date: '2024-06-21', description: 'Deposit', amount: 3024.00 },
    { date: '2024-05-15', description: 'Deposit', amount: 1500.00 },
    { date: '2024-04-10', description: 'Withdrawal', amount: -500.00 },
    { date: '2024-03-25', description: 'Deposit', amount: 1000.00 },
  ];

  // Function to calculate total deposits
  const calculateTotalDeposits = () => {
    // Filter deposits and withdrawals
    const deposits = transactions.filter(transaction => transaction.amount > 0);
    const withdrawals = transactions.filter(transaction => transaction.amount < 0);

    // Sum deposits
    const totalDeposits = deposits.reduce((total, transaction) => total + transaction.amount, 0);

    // Subtract withdrawals
    const totalWithdrawals = withdrawals.reduce((total, transaction) => total + transaction.amount, 0);

    // Calculate net deposits
    const netTotalDeposits = totalDeposits + totalWithdrawals;

    return netTotalDeposits;
  };

  // Function to format currency
  const formatCurrency = (amount) => `$${amount.toFixed(2)}`;

  // Calculate total deposits
  const totalDeposits = calculateTotalDeposits();

  // Handle dialog open/close
  const handleBalanceOpen = () => setBalanceOpen(true);
  const handleBalanceClose = () => setBalanceOpen(false);

  return (
    <>
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center' }}>
        <StyledPaper elevation={9}>
          <Typography variant="h5" gutterBottom sx={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>
            Total Deposits
          </Typography>
          <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 1, textAlign: 'center', color: '#000' }}>
            {formatCurrency(totalDeposits)}
          </Typography>
          <Typography variant="body1" color="#555" sx={{ textAlign: 'center' }}>
            Last Deposit on {new Date(transactions[0].date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </Typography>
          <Button
            variant="contained"
            fullWidth
            sx={{ mt: 3, borderRadius: 4, background: secondaryColor, color: '#fff' }}
            onClick={handleBalanceOpen}
          >
            View History
          </Button>
        </StyledPaper>
      </Box>

      <Dialog open={balanceOpen} onClose={handleBalanceClose} maxWidth="sm" fullWidth>
        <DialogTitle>Transaction History</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell align="right" style={{ color: transaction.amount < 0 ? 'red' : 'green' }}>
                      {formatCurrency(transaction.amount)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleBalanceClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default EarningsHistoryTable;
