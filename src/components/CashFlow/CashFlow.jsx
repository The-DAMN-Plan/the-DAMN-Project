import React, { useState, useEffect } from 'react';
import { Typography, TextField, Button, Container, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';

function CashFlow() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const cashflow = useSelector((store) => store.cashflow);
  const [selectedYear, setSelectedYear] = useState('Year 1');
  const [selectedMonth, setSelectedMonth] = useState('');

  const handleYearChange = (year) => {
    setSelectedYear(year);
  };

  const handleMonthChange = (event) => {
    setSelectedMonth(event.target.value);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Cash Flow
          </Typography>
          {/* Year buttons */}
          <Button onClick={() => handleYearChange('Year 1')} variant={selectedYear === 'Year 1' ? 'contained' : 'outlined'}>
            Year 1
          </Button>
          <Button onClick={() => handleYearChange('Year 2')} variant={selectedYear === 'Year 2' ? 'contained' : 'outlined'}>
            Year 2
          </Button>
          {/* Month select */}
          <FormControl fullWidth>
            <InputLabel>Select Month</InputLabel>
            <Select value={selectedMonth} onChange={handleMonthChange}>
              <MenuItem value="">Select</MenuItem>
              {/* You can generate menu items for months dynamically */}
              <MenuItem value="Month 1">Month 1</MenuItem>
              <MenuItem value="Month 2">Month 2</MenuItem>
              <MenuItem value="Month 3">Month 3</MenuItem>
              {/* Add more months as needed */}
            </Select>
          </FormControl>
          <Typography></Typography>
        </Grid>
        <Grid item xs={12} md={3}>
        </Grid>
      </Grid>
    </Container>
  );
}

export default CashFlow;