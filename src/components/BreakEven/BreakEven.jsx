import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import Grid from '@mui/material/Unstable_Grid2';
import Box from '@mui/material/Box';
import ProgressBar from '../ProgressBar/ProgressBar'
import Main from '../Main/Main';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import expenseReducer from '../../redux/reducers/expense.ruducer';


export default function BreakEven() {
  const open = useSelector(store => store.sideNav);
  const budgetId = useParams();
  const expenses = useSelector(store => store.expense);
  const budget = useSelector(store => store.finalBudget);
  

  const filteredExpenses = expenses.filter(item => item.type === 'business marketing' || item.type === 'business hr' || item.type === 'business other' || item.type === 'business expense');
  const operatingCosts = calculateOperatingCosts();
  const breakEvenNumbers = calculateBreakeven();

  function calculateOperatingCosts() {
    let total = 0;
    for (const expense of filteredExpenses) {
      total += expense.expense_amount;
    }
    total += Number(budget[0].valuepay) ? Number(budget[0].valuepay) : 0;
    return total;
  }



  function calculateBreakeven() {
    let total = { y1: 0, y2: 0 };
    total.y1 = operatingCosts + (operatingCosts / (-budget[0].y1_cogs + 100))
    total.y2 = operatingCosts + (operatingCosts / (-budget[0].y2_cogs + 100))
    console.log(operatingCosts)
    console.log(total)
    return total;
  }

  return (

    <Main open={open}>
      <Container>
        <Typography
          textAlign="center"
          variant='h2'
          color='primary'>Breakeven Sales</Typography>
        <Typography
          textAlign="center"
          variant='subtitle1'>Required Monthly Sales Volume to Break-even</Typography>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '30vh' }}
          >
            <Grid container xs={12}>
              <Grid xs={12} sm={12} md={6} lg={6}>
                <Fade in={true}>
                  <Paper sx={{ p: 3 }}>
                    <Typography noWrap textAlign="center" variant='h4'>Year One</Typography>
                    <Typography color='primary' textAlign="center" variant='h5'><Currency value={breakEvenNumbers.y1} />/Month</Typography>
                  </Paper>
                </Fade>
              </Grid>

              <Grid xs={12} sm={12} md={6} lg={6}>
                <Fade in={true} style={{ transitionDelay: '100ms' }}>
                  <Paper sx={{ p: 3 }}>
                    <Typography textAlign="center" variant='h4'>Year Two</Typography>
                    <Typography color='secondary' textAlign="center" variant='h5'><Currency value={breakEvenNumbers.y2} />/Month</Typography>
                  </Paper>
                </Fade>
              </Grid>
            </Grid>
            {/* {end} */}
          </Grid>
          <ProgressBar next={'cashflow'} back={'otherbusiness'} value={98} budgetId={budgetId} />
        </Box>
      </Container>
    </Main>
  );
}


