import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CareTakerCard from './CareTakersCard'; // Adjust the import according to your project structure

const CareTakersCardList = () => {
  const [caretakers, setCaretakers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCaretakers = async () => {
      try {
        const token = localStorage.getItem('token'); // Assuming token is stored in localStorage
        const response = await fetch('https://lovecare-backend.onrender.com/api/caretaker-profiles', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch caretakers');
        }
        const data = await response.json();
        console.log('Fetched caretakers:', data); // Log fetched data
        setCaretakers(data); // Assuming data is an array of caretakers
        setLoading(false);
      } catch (error) {
        console.error('Error fetching caretakers:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCaretakers();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      {caretakers.length > 0 ? (
        <Grid container spacing={3}>
          {caretakers.map((caretaker) => (
            <Grid key={caretaker._id} item xs={12} sm={4}>
              <CareTakerCard caretaker={caretaker} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No caretakers found.</p>
      )}
    </div>
  );
};

export default CareTakersCardList;
