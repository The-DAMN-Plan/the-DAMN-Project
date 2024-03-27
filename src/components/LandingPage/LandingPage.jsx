import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import './LandingPage.css'

// CUSTOM COMPONENTS
import RegisterForm from '../RegisterForm/RegisterForm';
import { Box, Container, Paper, Typography } from '@mui/material';

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push('/login');
  };

  return (
    <>
      <div className='layer'></div>
      <div className='image'></div>
      <Box sx={{ display: 'flex', direction: 'row', justifyContent:'center' }}>
        <Box sx={{width: '25%', my:'10%'}}>
          <Paper sx={{ m: 1, p: 3, width: '100%' }}>
            <Typography sx={{ mb: 3 }} variant='h3' color={'primary'}>
              Ready to Start your DAMN Plan?
            </Typography>
            <Typography variant='body1'>
              Your singular goal in business is to “meet your customer’s wants and needs at a profit” and pay yourself! So, let’s do our businesses by the numbers! Cashflow analysis provides significant insight and data for decision-making. Both are tools that you can use to test your ideas and manage your business activities from day to day.              </Typography>
          </Paper>
        </Box>
        <Box sx={{width:'30%'}}>
          <RegisterForm />
        </Box>
      </Box>
    </>
  );
}

export default LandingPage;
