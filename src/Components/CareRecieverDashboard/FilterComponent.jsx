import React, { useState } from 'react';
import { Box, TextField, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  padding: theme.spacing(1),
  borderRadius: theme.spacing(1),
  boxShadow: '0px 3px 6px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  maxWidth: '60%',
  margin: '0 auto',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  minWidth: 150,
  marginLeft: theme.spacing(2),
  '& .MuiInputLabel-root': {
    color: theme.palette.primary.light,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.primary.light,
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.dark,
    },
  },
}));

const citiesGermany = [
  'Aachen', 'Augsburg', 'Bamberg', 'Berlin', 'Bielefeld', 'Bochum', 'Bonn', 'Braunschweig', 'Bremen', 'Chemnitz', 
  'Cologne', 'Darmstadt', 'Dortmund', 'Dresden', 'Duisburg', 'Düsseldorf', 'Erfurt', 'Erlangen', 'Essen', 'Frankfurt', 
  'Freiburg', 'Fürth', 'Gelsenkirchen', 'Göttingen', 'Hagen', 'Halle', 'Hamburg', 'Hanover', 'Heidelberg', 'Heilbronn', 
  'Herne', 'Ingolstadt', 'Jena', 'Karlsruhe', 'Kassel', 'Kiel', 'Koblenz', 'Krefeld', 'Leipzig', 'Leverkusen', 'Lübeck', 
  'Ludwigshafen', 'Magdeburg', 'Mainz', 'Mannheim', 'Mönchengladbach', 'Munich', 'Münster', 'Nuremberg', 'Oberhausen', 
  'Offenbach', 'Oldenburg', 'Osnabrück', 'Paderborn', 'Pforzheim', 'Potsdam', 'Recklinghausen', 'Regensburg', 'Remscheid', 
  'Reutlingen', 'Rostock', 'Saarbrücken', 'Salzgitter', 'Schwerin', 'Siegen', 'Solingen', 'Stuttgart', 'Trier', 'Ulm', 
  'Wiesbaden', 'Wolfsburg', 'Wuppertal', 'Würzburg', 'Zwickau'
];

const FilterComponent = ({ onFilterChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  const handleSearchChange = (event) => {
    const { value } = event.target;
    setSearchQuery(value);
    onFilterChange(value, selectedCity);
  };

  const handleCityChange = (event) => {
    const { value } = event.target;
    setSelectedCity(value);
    onFilterChange(searchQuery, value);
  };

  return (
    <StyledBox>
      <IconButton size="small">
        <FilterListIcon color="primary" sx={{ fontSize: 28 }} />
      </IconButton>
      <StyledTextField
        variant="outlined"
        size="small"
        placeholder="Search for skills..."
        value={searchQuery}
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          startAdornment: (
            <SearchIcon color="action" sx={{ mr: 1 }} />
          ),
        }}
      />
      <StyledFormControl variant="outlined" size="small">
        <InputLabel>City</InputLabel>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          label="City"
          MenuProps={{
            PaperProps: {
              style: {
                maxHeight: 300,
              },
            },
          }}
        >
          <MenuItem value=""><em>Any</em></MenuItem>
          {citiesGermany.map((city, index) => (
            <MenuItem key={index} value={city}>{city}</MenuItem>
          ))}
        </Select>
      </StyledFormControl>
    </StyledBox>
  );
};

export default FilterComponent;
