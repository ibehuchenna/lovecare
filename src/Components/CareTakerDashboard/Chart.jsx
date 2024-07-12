import React from 'react';
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/system';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

// Updated data with 'Sales' and 'Revenue' keys
const data = [
  { Sales: '', Revenue: 0 },
  { Sales: '10', Revenue: 300 },
  { Sales: '20', Revenue: 600 },
  { Sales: '30', Revenue: 800 },
  { Sales: '40', Revenue: 1500 },
  { Sales: '50', Revenue: 2000 },
  { Sales: '60', Revenue: 2400 },
  { Sales: '70', Revenue: 2200 },
  { Sales: '80', Revenue: 0 },
];

// Styled component for the chart container with hover effects
const HoverableContainer = styled('div')(({ theme }) => ({
  marginTop: '40px',
  width: '48%',
  height: 340,
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'scale(1)',
    boxShadow: '0 12px 25px rgba(0, 0, 0, 0.3)',
  },
}));

export default function Chart() {
  const theme = useTheme();

  return (
    <HoverableContainer>
      <ResponsiveContainer>
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 30 }} // Add margins to ensure labels are visible
        >
          <CartesianGrid strokeDasharray="3 3" />

          {/* X-Axis with Sales Label */}
          <XAxis
            dataKey="Sales"
            label={{
              value: 'Sales',
              position: 'insideBottom',
              offset: -15, // Move slightly down from the axis to make space for the label
              style: { fill: theme.palette.text.primary }, // Adjust color based on the theme
            }}
          />

          {/* Y-Axis with Revenue Label */}
          <YAxis
            label={{
              value: 'Revenue ($)',
              angle: -90,
              position: 'insideLeft',
              offset: -5, // Move slightly to the left from the axis to make space for the label
              style: { fill: theme.palette.text.primary }, // Adjust color based on the theme
            }}
          />

          <Tooltip />
          <Line type="monotone" dataKey="Revenue" stroke={theme.palette.primary.main} />
        </LineChart>
      </ResponsiveContainer>
    </HoverableContainer>
  );
}
