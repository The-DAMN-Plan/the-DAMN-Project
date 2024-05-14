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
  const [sent, setSent] = useState(false);
  const [budgetId, setBudgetId] = useState(false);


  useEffect(() => {
    dispatch({ type: 'FETCH_BUSINESS' });
  }, [])

  function handleView(budget_id) {
    dispatch({ type: 'BUDGET_PLAN', payload: budget_id });
    setBudgetId(budget_id);
    setSent(true);
  }


  useEffect(() => {
    if (status.length > 0 && sent) {
      sendToPlan(status, budgetId);
      setSent(false);
    }
  }, [status])

  function sendToPlan(status, budget_id) {
    for (const step of status) {
      if (step.step === 'startplan' && step.completed === false) {
        history.push(`/startplan/${budget_id}`);
        return;
      } else if (step.step === 'fundamentalexpenses' && step.completed === false) {
        history.push(`/fundamentalexpenses/${budget_id}`);
        return;
      } else if (step.step === 'personalsavings' && step.completed === false) {
        history.push(`/personalsavings/${budget_id}`);
        return;
      } else if (step.step === 'variableexpenses' && step.completed === false) {
        history.push(`/variableexpenses/${budget_id}`);
        return;
      } else if (step.step === 'valuepay' && step.completed === false) {
        history.push(`/valuepay/${budget_id}`);
        return;
      } else if (step.step === 'incomeyear1' && step.completed === false) {
        history.push(`/incomeyear1/${budget_id}`);
        return;
      } else if (step.step === 'incomeyear2' && step.completed === false) {
        history.push(`/incomeyear2/${budget_id}`);
        return;
      } else if (step.step === 'overview' && step.completed === false) {
        history.push(`/overview/${budget_id}`);
        return;
      } else if (step.step === 'businessexpensepage1' && step.completed === false) {
        history.push(`/businessexpensepage1/${budget_id}`);
        return;
      } else if (step.step === 'businessexpensepage2' && step.completed === false) {
        history.push(`/businessexpensepage2/${budget_id}`);
        return;
      } else if (step.step === 'marketingy1' && step.completed === false) {
        history.push(`/marketingy1/${budget_id}`);
        return;
      }  else if (step.step === 'hrpagey1' && step.completed === false) {
        history.push(`/hrpagey1/${budget_id}`);
        return;
      }  else if (step.step === 'breakeven' && step.completed === false) {
        history.push(`/breakeven/${budget_id}`);
        return;
      } else if (step.step === 'cashflow' && step.completed === false) {
        history.push(`/cashflow/${budget_id}`);
        return;
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


