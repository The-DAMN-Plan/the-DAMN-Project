import React from 'react';
import { Box, Typography, useMediaQuery, Card, CardContent, Button } from '@mui/material';
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
        <Typography variant={matches ? 'h2' : 'h4'} component="h1" gutterBottom>
          Make a DAMN Plan!
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
        <Card sx={{ maxWidth: 600, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="body1" paragraph>
              DAMN Plan Coaching, a collaborative effort between a mother and daughter, is dedicated to assisting women entrepreneurs overwhelmed by their workload. These entrepreneurs value their worth but seek a structured plan for equitable compensation. Leveraging over four decades of combined business experience, we understand the unique challenges of balancing business with personal responsibilities. Our approach, founded on four core principles, empowers our clients to craft businesses that embody their ideals, offering a blend of autonomy, passion, and financial reward.
            </Typography>
          </CardContent>
        </Card>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          my: 2,
        }}
      >
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/DLHSVnvK3Is"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
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
        <Button variant="contained" color="primary" sx={{ marginBottom: '8px' }}>
          Primary Button
        </Button>
        <Button variant="contained" color="secondary" sx={{ marginBottom: '8px' }}>
          Secondary Button
        </Button>
        <Button variant="contained" sx={{ backgroundColor: theme.palette.third.main }}>
          Third Button
        </Button>
      </Box>
    </Box>
  );
}

export default AboutPage;
