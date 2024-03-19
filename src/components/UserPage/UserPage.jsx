import React, { useEffect } from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const business = useSelector((store) => store.business);

  useEffect(() => {
    dispatch({type: 'FETCH_BUSINESS'})
  }, [dispatch]);

  console.log(business);

  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Paper style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <Box p={3}>
                <Typography variant="h5" gutterBottom>
                  Your Businesses
                </Typography>
                {business.map(item => (
                  <Typography key={item.id} variant='body1'>
                    {item.name}
                  </Typography>
                ))}
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
