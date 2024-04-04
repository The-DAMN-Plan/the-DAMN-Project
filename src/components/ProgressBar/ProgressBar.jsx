import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import { useSelector } from 'react-redux';

export default function ProgressBar({ next, back, value, budgetId }) {
  const history = useHistory();
  const location = useLocation();
  const status = useSelector((store) => store.status);
  const currentStatus = status.filter((item) => {
    return `/${item.step}/${budgetId.budgetId}` === `${location.pathname}`
  })

  if (currentStatus.length === 0) {
    return (<LinearProgress color="secondary" />)
  }
  function handleBack() {
    history.push(`/${back}/${budgetId.budgetId}`);
  }

  function handleNext() {
    history.push(`/${next}/${budgetId.budgetId}`);
  }

  return (
    <Grid container
      direction="row"
      alignItems="center"
      justifyContent="center"
      xs={12}
      sx={{mt: 4}}
      >
      <Grid textAlign="center" xs={3} sm={2}>
        <Button onClick={handleBack} variant='outlined'>Back</Button>
      </Grid>
      <Grid textAlign='center' xs={6} sm={8}>
        <LinearProgress variant="determinate" value={value} />
      </Grid>
      <Grid textAlign="center" xs={3} sm={2}>
        {currentStatus[0].completed ?
          <Button onClick={handleNext} variant='contained'>Next</Button>
          :
          <Button disabled variant='contained'>Next</Button>
        }
      </Grid>
    </Grid>
  );
}


