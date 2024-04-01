import React from 'react';
import { Box, Typography, useMediaQuery, Card, CardContent, Button, Paper, CardMedia } from '@mui/material';
import theme from '../../muiTheme';
// import CustomSnackbar from '../Shared/CustomSnackBar';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function AboutPage() {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));
  const [openSnack, setOpenSnack] = useState(false);

  const handleClick = () => {
    setOpenSnack(true);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleCloseSnack}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleCloseSnack}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );


  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url('/gallery/splash.jpeg')`,
          backgroundSize: 'cover',
          color: '#fff',
          padding: theme.spacing(4),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
        }}
      >
        <Typography variant={matches ? 'h1' : 'h4'} component="h1" gutterBottom sx={{ color: theme => theme.palette.third.main }}>
          Make a DAMN Plan
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: theme.spacing(2),
        }}
      >
      <Paper elevation={1} align="center" sx={{ maxWidth: 1080, p: 2 }}>
        <Typography variant="body1" paragraph>
          DAMN Plan Coaching, a collaborative effort between a mother and daughter, is dedicated to assisting women entrepreneurs overwhelmed by their workload. These entrepreneurs value their worth but seek a structured plan for equitable compensation. Leveraging over four decades of combined business experience, we understand the unique challenges of balancing business with personal responsibilities. Our approach, founded on four core principles, empowers our clients to craft businesses that embody their ideals, offering a blend of autonomy, passion, and financial reward.
        </Typography>
      </Paper>

      </Box>
      
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 2,
        }}
      >


        {/* Snack Bar Example */}
      </Box>
      {/* <div>
        <Button onClick={handleClick}>Open Snackbar</Button>
        <Snackbar
          open={openSnack}
          autoHideDuration={6000}
          onClose={handleCloseSnack}
          message="Note archived"
          action={action}
        />
      </div> */}
    </Box> 
  );
}

export default AboutPage;
