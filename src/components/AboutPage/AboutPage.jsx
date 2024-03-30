import React from 'react';
import { Box, Typography, useMediaQuery, Card, CardContent, Button, Paper, CardMedia } from '@mui/material';
import theme from '../../muiTheme';

function AboutPage() {
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Box>
      <Box
        sx={{
          backgroundImage: `url('/gallery/AdobeStock_217361156.jpeg')`,
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
      <Paper elevation={3} align="center" sx={{ maxWidth: 600, p: 2 }}>
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
        <CardMedia
          width="560"
          height="315"
          src="https://www.youtube.com/watch?v=2LaO3A_gpMQ"
          title="Welocome to The DAMN Plan App"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></CardMedia>
      </Box>
    </Box>
  );
}

export default AboutPage;
