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
  const income = useSelector(s=> s.income);
  let breakEven = 0;
  
  function calculateOperatingCosts() {
    let totalOperatingCost = 0;
    let totalCostOfDelivery = 0;
    let projectedSales = 0;
    console.log('filtered expense: ', filteredExpenses);
    for (const expense of filteredExpenses) {
      console.log(expense.expense_name, expense.expense_amount);
      totalOperatingCost += expense.expense_amount;
    }
    console.log('income', income); 
    for (const item of income) {
      projectedSales += item.price * item.purchasers;
      totalCostOfDelivery += item.cost_of_delivery * item.purchasers;
    }

    let grossProfit = projectedSales - totalCostOfDelivery;
    const valuePay = budget[0].valuepay === null ? 0: budget[0].valuepay;
    const escrowSavings = budget[0].escrow_savings === null? 0.0 : budget[0].escrow_savings;
    console.log('escrow savings', escrowSavings);
    console.log('gross profit',grossProfit *  parseInt(escrowSavings)/100);
    totalOperatingCost += valuePay * 12 + grossProfit * parseInt(escrowSavings)/100;
    let netBeforeTax = grossProfit - totalOperatingCost;
    console.log('value pay',budget[0].valuepay);
    console.log('total operating cost:', totalOperatingCost, budget[0].valuepay === null ? 0: budget[0].valuepay, budget[0].valuepay * 12.00);
    console.log('net before tax:', netBeforeTax);
    console.log(budget);
    breakEven = totalOperatingCost / (1-budget[0].y1_cogs/100);

    return totalOperatingCost;
  }

  calculateOperatingCosts();



  // function calculateBreakeven() {
  //   let total = 0;
  //   total = operatingCosts + (operatingCosts / (-budget[0].y1_cogs + 100))
  //   // console.log(operatingCosts)
  //   // console.log(total)
  //   return total;
  // }

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

                <Fade in={true}>
                  <Paper sx={{ p: 3 }}>
                    <Typography noWrap textAlign="center" variant='h4'>Year One</Typography>
                    <Typography color='primary' textAlign="center" variant='h5'><Currency value={breakEven} />/Month</Typography>
                  </Paper>
                </Fade>
            {/* {end} */}
          </Grid>
          <ProgressBar next={'cashflow'} back={'otherbusiness'} value={98} budgetId={budgetId} />
        </Box>
      </Container>
    </Main>
  );
}


