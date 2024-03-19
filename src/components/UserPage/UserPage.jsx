import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import {useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserPage() {
  const history = useHistory();
  const user = useSelector((store) => store.user);
  // Will use with the business reducer
  const business = null; 

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      {/* Will make reducers at a later time and style with seeded data */}
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            {/* Will need a loop to loop over and display businesses */}
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
                <Box display="flex" justifyContent="space-between" marginBottom="10px">
                  <Button variant="contained" color="primary">
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
