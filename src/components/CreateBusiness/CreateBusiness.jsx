import { Box, Paper, Typography, TextField, Button, Select, MenuItem, InputLabel, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { DatePicker } from '@mui/x-date-pickers';

function CreateBusiness(props) {
  const user = useSelector(store => store.user);
  const dispatch = useDispatch();

  const [businessName, setBusinessName] = useState('');
  const [occupationType, setOccupationType] = useState('');
  const [typeOfBusiness, setTypeOfBusiness] = useState('');
  const [numEmployees, setNumEmployees] = useState(0);
  const [yearStarted, setYearStarted] = useState(null);
  const [avgRevenue, setAvgRevenue] = useState(0);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #fffff',
    boxShadow: 24,
    borderRadius: 5,
    pt: 2,
    px: 4,
    pb: 3,
  };

  function createBusiness(e) {
    e.preventDefault();
    dispatch({
      type: 'CREATE_BUSINESS', payload: {
        user_id: user.id,
        name: businessName,
        occupation_type: occupationType,
        type_of_business: typeOfBusiness,
        number_of_employees: numEmployees,
        year_business_started: Number(yearStarted.format('YYYY')),
        average_revenue: avgRevenue
      }
    })
    setBusinessName('');
    setOccupationType('');
    setTypeOfBusiness('');
    setNumEmployees(0);
    setYearStarted(null);
    setAvgRevenue(0);
  }

  return (
    <Box sx={{ ...style, width: 500 }}>
      <Typography color={'primary'} textAlign='center' variant='h4' sx={{ mb: 1 }}>Create a Business</Typography>
      <Grid component='form' method='post' direction='row' autoComplete="off" alignItems="center" justifyContent="center" container spacing={2} xs={12} onSubmit={(e) => createBusiness(e)} >

        <Grid>
          <TextField
            fullWidth label='Business Name' variant="outlined"
            type="text"
            name="businessname"
            sx={{ my: 0.5 }}
            required
            value={businessName}
            onChange={(event) => setBusinessName(event.target.value)}
          />
        </Grid>
        <Grid>
          <TextField
            fullWidth label='Type of Business' variant="outlined"
            type="text"
            name="businesstype"
            sx={{ my: 0.5 }}
            required
            value={typeOfBusiness}
            onChange={(event) => setTypeOfBusiness(event.target.value)}
          />
        </Grid>
        <Grid>
          <InputLabel id="occupation">Occupation Type *</InputLabel>
          <Select
            labelId="occupation"
            variant="outlined"
            type="text"
            name="occupationtype"
            sx={{ my: 0.5, width: 195 }}
            required
            value={occupationType}
            onChange={(event) => setOccupationType(event.target.value)}
          >
            <MenuItem value={'Full Time'}>Full Time</MenuItem>
            <MenuItem value={'Part Time'}>Part Time</MenuItem>
            <MenuItem value={'Side Hustle'}>Side Hustle</MenuItem>
          </Select>
        </Grid>
        <Grid>
          <InputLabel id="employees">Number of Employees *</InputLabel>
          <TextField
            fullWidth variant="outlined"
            type="number"
            name="employees"
            sx={{ my: 0.5 }}
            required
            value={numEmployees}
            onChange={(event) => setNumEmployees(event.target.value)}
          />
        </Grid>
        <Grid>
          <InputLabel id="employees">Date Business Started *</InputLabel>
          <DatePicker value={yearStarted} onChange={(newValue) => setYearStarted(newValue)} sx={{ width: 195 }} />
        </Grid>
        <Grid >
          <InputLabel id="employees">Average Revenue *</InputLabel>
          <TextField
            fullWidth variant="outlined"
            type="number"
            name="revenue"
            sx={{ my: 0.5, width: 195 }}
            required
            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
            value={avgRevenue}
            onChange={(event) => setAvgRevenue(event.target.value)}
          />
        </Grid>
        <Grid>
          <Button fullWidth variant='contained'
            className="btn"
            type="submit"
            name="submit"
            value="Create"
            sx={{ my: 0.5 }}
          >
            Create
          </Button>
        </Grid>
      </Grid>

    </Box>
  );
}

export default CreateBusiness;
