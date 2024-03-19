import React, { useEffect, useState } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const business = useSelector((store) => store.business);

  useEffect(() => {
    dispatch({type: 'FETCH_BUSINESS'})
  }, [dispatch]);

  const [selectedBusiness, setSelectedBusiness] = useState('');

  const handleChange = (event) => {
    setSelectedBusiness(event.target.value);
  };

  console.log(business);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Box p={3}>
                <Typography variant="h5" gutterBottom textAlign='center'>
                  Your Businesses
                </Typography>
                {business.length === 0 ? (
                  <Typography variant="body1">
                    You have no businesses. Please add a business.
                  </Typography>
                ) : (
                  business.map(item => (
                    <Typography key={item.id} variant='body1'>
                      {item.name}
                    </Typography>
                  ))
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper>
            <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="business-select-label">Select Business</InputLabel>
              <Select
                labelId="business-select-label"
                id="business-select"
                value={selectedBusiness}
                onChange={handleChange}
              >
                {business.map(business => (
                  <MenuItem key={business.id} value={business.name}>
                    {business.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
              </Box>
              <Box p={3}>
                {/* Need a reducer for budgets and loop over budgets associated with that business */}
                <Typography variant="h5" gutterBottom>
                  Budgets
                </Typography>
                <Box display="flex" justifyContent="space-between" marginBottom="10px">
                  <Button variant="contained" color="primary" onClick={() => { history.push('/startplan')}}>
                    Start a New Plan
                  </Button>
                  <Button variant="contained" color="primary" onClick={() => { history.push('/info')}}>
                    Info
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
