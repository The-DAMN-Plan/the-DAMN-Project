import React from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button } from '@mui/material';
import LinearProgress from '@mui/material/LinearProgress';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ProgressBar({ next, back, value, budgetId }) {
  const history = useHistory();

  console.log(budgetId.budgetId);


  function handleBack() {
    history.push(`/${back}/${budgetId}`);
  }

  function handleNext(event) {
    history.push(`/${next}/${budgetId.budgetId}`);
  }

  return (
    <Grid container
      direction="row"
      alignItems="center"
      justifyContent="center"
      xs={12}>
      <Grid textAlign="center" xs={1}>
        <Button onClick={handleBack} variant='outlined'>Back</Button>
      </Grid>
      <Grid textAlign='center' xs={10}>
        <LinearProgress variant="determinate" value={value} />
      </Grid>
      <Grid textAlign="center" xs={1}>
        <Button onClick={handleNext} variant='contained'>Next</Button>
      </Grid>
    </Grid>
  );
}


