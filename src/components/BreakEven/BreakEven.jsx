import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export default function BreakEven() {

  const store = useSelector((store) => store);

  return (
    <Container>
      <Typography
        textAlign="center"
        variant='h2'
        color='primary'>Breakeven Sales</Typography>
      <Typography
        textAlign="center"
        variant='subtitle1'>Required Sales Volume to Break-even</Typography>
      <Box sx={{flexGrow:1}}>
        <Grid container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '30vh' }}
        >

          {/* {this is the center spot} */}
          <Grid container xs={12}>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Paper sx={{ p: 3 }}>
                <Typography noWrap textAlign="center" variant='h4'>Year One</Typography>
                <Typography color='primary' textAlign="center" variant='h5'>$XX,XXX</Typography>
              </Paper>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Paper sx={{ p: 3 }}>
                <Typography textAlign="center" variant='h4'>Year Two</Typography>
                <Typography color='secondary' textAlign="center" variant='h5'>$XX,XXX</Typography>
              </Paper>
            </Grid>
          </Grid>
          {/* {end} */}

        </Grid>
      </Box>
    </Container>
  );
}


