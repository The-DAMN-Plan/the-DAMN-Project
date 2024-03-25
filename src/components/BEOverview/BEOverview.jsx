import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Typography, Box, Paper, TextField, InputAdornment, Switch, InputLabel } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function BEOverview(props) {
  const [percentYearOne, setPercentYearOne] = useState(0);
  const [percentYearTwo, setPercentYearTwo] = useState(0);
  const [flatYearOne, setflatYearOne] = useState(0);
  const [flatYearTwo, setflatYearTwo] = useState(0);

  const [checked, setChecked] = useState(false);


  return (
    <Container>
      <Typography textAlign={'center'} color={'primary'} variant='h2'>Overview</Typography>
      <Typography textAlign={'center'} variant='subtitle1'>Here we calculate our projected revenue and compare those to our Variable Expenses (COGS) and come up with a gross profit.</Typography>
      <Grid container
        spacing={2}
        direction='row'
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '30vh' }}
      >
        <Grid >
          {!checked ?
            // percentage view
            <Paper>
              <Box sx={{ width: '40vh', p: 3 }}>
                <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year One</Typography>
                <Box>
                  <Typography>Projected Revenue:</Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>$xx,xxx</Typography>
                  <InputLabel>Variable Expenses:</InputLabel>
                  <TextField
                    fullWidth variant="outlined"
                    type="number"
                    name="ve"
                    sx={{ my: 0.5, width: 195 }}
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                    value={percentYearOne}
                    onChange={(event) => setPercentYearOne(event.target.value)}
                  />
                </Box>
              </Box>
            </Paper>
            :
            // flat number view
            <Paper>
              <Box sx={{ width: '40vh', p: 3 }}>
                <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year One</Typography>
                <Box>
                  <Typography>Projected Revenue:</Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>$xx,xxx</Typography>
                  <InputLabel>Variable Expenses:</InputLabel>
                  <TextField
                    fullWidth variant="outlined"
                    type="number"
                    name="ve"
                    sx={{ my: 0.5, width: 195 }}
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    value={flatYearOne}
                    onChange={(event) => setflatYearOne(event.target.value)}
                  />
                </Box>
              </Box>
            </Paper>
          }
        </Grid>
        <Grid >
          {!checked ?
            // percentage view
            <Paper>
              <Box sx={{ width: '40vh', p: 3 }}>
                <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year Two</Typography>
                <Typography>Projected Revenue:</Typography>
                <Typography variant='h4' sx={{ mb: 3 }}>$xx,xxx</Typography>
                <InputLabel>Variable Expenses:</InputLabel>
                <TextField
                  fullWidth variant="outlined"
                  type="number"
                  name="ve"
                  sx={{ my: 0.5, width: 195 }}
                  required
                  InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                  value={percentYearTwo}
                  onChange={(event) => setPercentYearTwo(event.target.value)}
                />
              </Box>
            </Paper>
            :
            // flat number view
            <Paper>
              <Box sx={{ width: '40vh', p: 3 }}>
                <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year Two</Typography>
                <Box>
                  <Typography>Projected Revenue:</Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}>$xx,xxx</Typography>
                  <InputLabel>Variable Expenses:</InputLabel>
                  <TextField
                    fullWidth variant="outlined"
                    type="number"
                    name="ve"
                    sx={{ my: 0.5, width: 195 }}
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                    value={flatYearTwo}
                    onChange={(event) => setflatYearTwo(event.target.value)}
                  />
                </Box>
              </Box>
            </Paper>
          }
        </Grid>
      </Grid>
      <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
        <Typography>Switch between percent and flat amount: </Typography>
        <Switch
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </Grid>
      <ProgressBar value={54}/>
    </Container >
  );
}