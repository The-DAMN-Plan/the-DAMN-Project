import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Paper, TextField, InputAdornment, Switch, InputLabel, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Currency from '../Shared/Currency';

export default function BEOverview(props) {
  const dispatch = useDispatch();
  const budgetId = useParams();
  const [percentYearOne, setPercentYearOne] = useState(0);
  const [percentYearTwo, setPercentYearTwo] = useState(0);
  const [escrowSavings, setEscrowSavings] = useState(0);
  const [flatYearOne, setflatYearOne] = useState(0);
  const [flatYearTwo, setflatYearTwo] = useState(0);
  const [initalRender, setInitalRender] = useState(true);
  const [checked, setChecked] = useState(false);
  const budget = useSelector(store => store.finalBudget)[0]
  const income = useSelector((store) => store.income)
  
  function calculateExpenseToDeliver(sale) {
    let total = 0;
    for (const item of sale) {
      // console.log(item);
      // console.log(item.cost_of_delivery * item.purchasers);
      total += item.cost_of_delivery * item.purchasers;
        // total+= item.cost_of_delivery;
    }
    return total;
  }

  function calculateTotal(sale) {
    let total = 0;
    for (const item of sale) {
      //total revenue
      // total += (item.price / item.time_used) * Number(item.purchasers);
      total += (item.price) * Number(item.purchasers);
    }
    return total;
  }

  const totalIncome = calculateTotal(income);
  const totalExpenseToDeliver = calculateExpenseToDeliver(income);

  function calculateInitalVE() {
    let totalVE = 0;
    totalVE = (totalExpenseToDeliver/ totalIncome) * 100;
    return totalVE.toFixed(2);
  }

  const initalVE = calculateInitalVE();

  useEffect(() => {
    setInitalRender(false);
  }, []);

  useEffect(() => {
    if (initalRender === false) {
      setPercentYearOne(initalVE);
      // setPercentYearTwo(initalVE.y2);
      setEscrowSavings(budget.escrow_savings)
      setInitalRender(true);
    }
  }, [income])


  useEffect(() => {
    dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
  }, [dispatch, budgetId]);


  const open = useSelector(store => store.sideNav);

  function handleSubmit() {
    const updateObj = {
      completed: true,
      budget_id: Number(budgetId.budgetId),
      step: 'overview'
    }


    const userInput = {
      escrow_savings: escrowSavings,
      y1_cogs: checked ? flatYearOne : percentYearOne,
      y2_cogs: checked ? flatYearTwo : percentYearTwo,
      cash_balance: budget.cash_balance,
      vp_percent: budget.vp_percent,
      vp_income: budget.vp_income,
      budget_id: budgetId.budgetId
    }

    dispatch({ type: 'UPDATE_BUDGET', payload: userInput })
    dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
  }

  console.log('total income',totalIncome);
  console.log('percent one', percentYearOne);
  console.log('Projected Revenue',(totalIncome ? totalIncome : 0) - (percentYearOne) * totalIncome);
  return (
    <Main open={open}>
      <Container>
        <Typography textAlign={'center'} color={'primary'} variant='h2'>Overview</Typography>
        <Typography textAlign={'center'} variant='subtitle1'>Here we calculate our projected revenue and compare those to our Variable Expenses (COGS) and come up with a gross profit.</Typography>
        <Grid container
          spacing={2}
          direction='row'
          alignItems="center"
          justifyContent="center"
          sx={{ minHeight: '30vh', mt: 2 }}
        >
          <Grid xs={4}>
            {!checked ?
              // percentage view
              <Paper>
                <Box sx={{ width: '40vh', p: 3 }}>
                  <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Annual</Typography>
                  <Box>
                    <Typography>Projected Revenue:</Typography>
                    {/* <Typography variant='h4' sx={{ mb: 3 }}><Currency value={(totalIncome ? totalIncome : 0) - (percentYearOne / 100) * totalIncome} /></Typography> */}
                    <Typography variant='h4' sx={{ mb: 3 }}><Currency value={(totalIncome ? totalIncome : 0)} /></Typography>
                    <InputLabel>Variable Expenses:</InputLabel>
                    <TextField
                      fullWidth variant="outlined"
                      type="number"
                      name="ve"
                      sx={{ my: 0.5, width: 195 }}
                      required
                      InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                      value={percentYearOne}
                      onChange={(event) => setPercentYearOne(event.target.value)}
                    />
                    <Typography>Total Variable Expense:</Typography>
                    <Typography sx={{ mb: 3 }}><Currency value={(percentYearOne / 100) * totalIncome} /></Typography>
                  </Box>
                </Box>
              </Paper>
              :
              // flat number view
              <Paper>
                <Box sx={{ width: '40vh', p: 3 }}>
                  <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year One</Typography>
                  <Box>
                    <Typography>Projected Revenue:</Typography>
                    <Typography variant='h4' sx={{ mb: 3 }}><Currency value={(totalIncome ? totalIncome : 0) - (flatYearOne ? flatYearOne : 0)} /></Typography>
                    <InputLabel>Variable Expenses:</InputLabel>
                    <TextField
                      fullWidth variant="outlined"
                      type="number"
                      name="ve"
                      sx={{ my: 0.5, width: 195 }}
                      required
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                      value={flatYearOne}
                      onChange={(event) => setflatYearOne(event.target.value)}
                    />
                    <Typography>Total Variable Expense:</Typography>
                    <Typography sx={{ mb: 3 }}><Currency value={flatYearOne ? flatYearOne : 0} /></Typography>
                  </Box>
                </Box>
              </Paper>
            }
          </Grid>
          {/* Year two */}
          {/* <Grid xs={4}>
            {!checked ?
              // percentage view
              <Paper>
                <Box sx={{ width: '40vh', p: 3 }}>
                  <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year Two</Typography>
                  <Typography>Projected Revenue:</Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}><Currency value={(totalIncome.y2 ? totalIncome.y2 : 0) - ((percentYearTwo / 100) * totalIncome.y2)} /></Typography>
                  <InputLabel>Variable Expenses:</InputLabel>
                  <TextField
                    fullWidth variant="outlined"
                    type="number"
                    name="ve"
                    sx={{ my: 0.5, width: 195 }}
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                    value={percentYearTwo}
                    onChange={(event) => setPercentYearTwo(event.target.value)}
                  />
                  <Typography>Total Variable Expense:</Typography>
                  <Typography sx={{ mb: 3 }}><Currency value={(percentYearTwo / 100) * totalIncome.y2} /></Typography>
                </Box>
              </Paper>
              :
              // flat number view
              <Paper>
                <Box sx={{ width: '40vh', p: 3 }}>
                  <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year Two</Typography>
                  <Box>
                    <Typography>Projected Revenue:</Typography>
                    <Typography variant='h4' sx={{ mb: 3 }}><Currency value={(totalIncome.y2 ? totalIncome.y2 : 0) - (flatYearTwo ? flatYearTwo : 0)} /></Typography>
                    <InputLabel>Variable Expenses:</InputLabel>
                    <TextField
                      fullWidth variant="outlined"
                      type="number"
                      name="ve"
                      sx={{ my: 0.5, width: 195 }}
                      required
                      InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                      value={flatYearTwo}
                      onChange={(event) => setflatYearTwo(event.target.value)}
                    />
                    <Typography>Total Variable Expense:</Typography>
                    <Typography sx={{ mb: 3 }}><Currency value={flatYearTwo ? flatYearTwo : 0} /></Typography>
                  </Box>
                </Box>
              </Paper>
            }
          </Grid> */}
          <Grid xs={4}>
            <Paper>
              <Box sx={{ width: '40vh', p: 3 }}>
                <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Escrow/Savings</Typography>
                <Box>
                  <Typography>Escrow and Savings per Month:</Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}><Currency value={(escrowSavings / 100) * (totalIncome ? totalIncome : 0) - (flatYearOne ? flatYearOne : 0)} /></Typography>
                  <InputLabel>Variable Expenses:</InputLabel>
                  <TextField
                    fullWidth variant="outlined"
                    type="number"
                    name="ve"
                    sx={{ my: 0.5, width: 195 }}
                    required
                    InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                    value={escrowSavings}
                    onChange={(event) => setEscrowSavings(event.target.value)}
                  />
                  {/* <Typography>Projected Revenue:</Typography>
                  <Typography sx={{ mb: 3 }}><Currency value={(totalIncome ? totalIncome : 0) - (percentYearOne / 100) * totalIncome} /></Typography> */}
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
        <Grid container direction={'row'} justifyContent={'center'} alignItems={'center'} xs={12}>
          <Typography>Switch between percent and flat amount: </Typography>
          <Switch
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        </Grid>
        <Box textAlign={'center'}>
          <Button variant='contained' onClick={handleSubmit}>Save</Button>
        </Box>
        <ProgressBar back={'incomeyear1'} next={'businessexpensepage1'} value={54} budgetId={budgetId} />
      </Container >
      <Footer />
    </Main>
  );
}