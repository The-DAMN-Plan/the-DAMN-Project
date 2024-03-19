import React from 'react';
import Button from '@mui/material/Button';
import theme from '../../muiTheme'; // Import the custom theme

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <div className="container">
      <div>
        <p>Make a DAMN Plan!</p>
        <p>https://www.youtube.com/watch?v=DLHSVnvK3Is</p>
      </div>
      <div>
      <Button variant="contained" color="primary">
        Primary Button
      </Button>
      <Button variant="contained" color="secondary">
        Secondary Button
      </Button>
      {/* You can use your third color as well */}
      <Button variant="contained" style={{ backgroundColor: theme.palette.third.main }}>
        Third Button
      </Button>
    </div>
    </div>
    
  );
}

export default AboutPage;
