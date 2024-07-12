// components/CareTakerRequest.js

import React, { useState, useEffect } from 'react';
import CareRequestCard from './CareRequestCard'; // Adjust the import path as per your project structure
import axios from '../../config/axiosConfig'; // Assuming your axios config file is in the 'src' folder

const CareTakerRequest = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      {requests.map(request => (
        <CareRequestCard key={request._id} requestId={request._id} />
      ))}
    </div>
  );
};

export default CareTakerRequest;
