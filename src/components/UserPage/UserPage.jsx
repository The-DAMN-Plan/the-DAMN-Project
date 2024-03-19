import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import {useSelector} from 'react-redux';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {/* Will make reducers at a later time and style with seeded data */}
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>
                Business Users
              </Typography>
              <Typography variant="body1">
                Business 1
              </Typography>
              <Typography variant="body1">
                Business 2
              </Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box p={3}>
              <Typography variant="h5" gutterBottom>
                Budgets
              </Typography>
              <Button variant="contained" color="primary" style={{ marginBottom: '10px' }}>
                Start a New Plan
              </Button>
            </Box>
          </Paper>
        </Grid>
        {/* Logout Button */}
        <Grid item xs={12}>
          <LogOutButton className="btn" />
        </Grid>
      </Grid>
    </Container>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
