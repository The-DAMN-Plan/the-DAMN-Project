import { Container, Typography, Paper, Box, Button, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function ActivePlans(props) {
  const businesses = useSelector(store => store.business);
  const dispatch = useDispatch();
  const history = useHistory();
  const status = useSelector((store) => store.status);

  useEffect(() => {
    dispatch({ type: 'FETCH_BUSINESS' });
  }, [])

  function handleView(budget_id) {
    for (const step of status) {
      if (step.step === 'startplan' && step.completed === false){
        history.push(`/startplan/${budget_id}`);
      } 
    }
  }

  return (
    <Container>
      <Typography color={'primary'} sx={{ my: 4 }} variant='h3'>Your Plans</Typography>
      <Box>
        {businesses?.map((business, i) =>
          <Paper sx={{ my: 2, p: 3 }}>
            <Typography variant='h4'>{business.name}</Typography>
            {business.budgets?.map((budget, i) =>
              <>
                <Grid container direction='row' sx={{ m: 1, p: 2 }}>
                  <Grid xs={4} textAlign={'center'} alignSelf={'center'}>
                    <Typography variant='h5'>Budget Name: {budget.name}</Typography>
                  </Grid>
                  <Grid xs={4} textAlign={'center'} alignSelf={'center'}>
                    <Typography variant='h5'>Created On: {budget.created_at}</Typography>
                  </Grid>
                  <Grid xs={4} textAlign={'center'} alignSelf={'center'}>
                    <Button color='primary' variant='contained' onClick={() => handleView(budget.id)}>View Plan</Button>
                  </Grid>
                </Grid>
                {i === business.budgets.length - 1 ? '' : <Divider />}
              </>
            )}
          </Paper>
        )}
      </Box>
    </Container>
  );
}


