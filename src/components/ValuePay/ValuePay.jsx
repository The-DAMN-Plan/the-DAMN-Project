import { Container, Typography, Paper, TextField, InputAdornment, Button, Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Currency from '../Shared/Currency';
import moment from 'moment';


export default function ValuePay(props) {
  const dispatch = useDispatch();
  const finalBudget = useSelector((store) => store.finalBudget);
  const status = useSelector((store) => store.status);
  const [percent, setPercent] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const expense = useSelector((store) => store.expense);
  const futurePlans = useSelector((store) => store.futurePlans);
  console.log(finalBudget);
  console.log(expense);
  const [totalPersonalExpenses, setTotalPersonalExpenses] = useState(0);
  const [totalFutureSavings, setTotalFutureSavings] = useState(0);
  const [valuePay, setValuePay] = useState(0);
  const [requiredIncome, setRequiredIncome] = useState(0);
  const open = useSelector(store => store.sideNav);
  const budgetId = useParams();

  console.log('Big budget object', finalBudget);

  const vpPercent = finalBudget[0]?.vp_percent
  const vpIncome = finalBudget[0]?.vp_income

  useEffect(() => {
    dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
  }, [dispatch, budgetId]);

  useEffect(() => {
    const personalExpenses = expense.filter(item => item.type === 'personal committed' || item.type === 'personal decision' || item.type === 'personal other');
    const total = personalExpenses.reduce((acc, curr) => acc + Number(curr.expense_amount), 0);
    setTotalPersonalExpenses(total);
  }, [expense]);
  console.log('Total personal expenses:', totalPersonalExpenses); // Log total personal expenses

  useEffect(() => {
    const total = futurePlans.reduce((acc, plan) => {
      const start = moment(plan.start_date);
      const end = moment(plan.end_date);
      const months = end.diff(start, 'months', true); // true for a fractional result
      const monthlySavings = parseFloat(plan.savings_needed) / Math.max(months, 1); // Avoid division by zero
      return acc + monthlySavings;
    }, 0);
    setTotalFutureSavings(total);
  }, [futurePlans]);
  console.log('FP monthly total', totalFutureSavings);

  useEffect(() => {
    const combinedTotalExpenses = totalPersonalExpenses + totalFutureSavings;
    const newRequiredIncome = (combinedTotalExpenses * (vpPercent || percent)) / 100;
    setRequiredIncome(newRequiredIncome);
  }, [percent, totalPersonalExpenses, vpPercent, totalFutureSavings]);

  useEffect(() => {
    const findValuePay = requiredIncome + Number(vpIncome || dollarAmount);
    setValuePay(findValuePay)
  }, [requiredIncome, vpIncome, dollarAmount])


  function handleSubmit() {

    const updateObj = {
      completed: true,
      budget_id: Number(budgetId.budgetId),
      step: 'valuepay'
    }

    const valuePayObj = {
      budget_id: budgetId.budgetId,
      escrow_savings: null,
      y1_cogs: null,
      y2_cogs: null,
      cash_balance: null,
      vp_percent: percent,
      vp_income: dollarAmount,
      valuepay: valuePay
    }

    console.log(valuePayObj);

    dispatch({ type: 'UPDATE_BUDGET', payload: valuePayObj })
    dispatch({ type: 'UPDATE_STATUS', payload: updateObj }) // Will need to be set up later to post the completed step to the status table
  }

  const isStartPlanCompleted = status.find(s => s.step === 'valuepay')?.completed;

  return (
    <Main open={open}>
      <Container>
        <Typography textAlign={'center'} color={'primary'} variant='h2'>Your Value Pay</Typography>
        <Typography textAlign={'center'} variant='subtitle1'>This is the amount you'll need to pay yourself to ensure your expenses are covered. Furthermore, it serves as a tool to visualize your ideal compensation. Here, you have the freedom to explore and experiment with numbers to answer that lingering question: What if?</Typography>
        <Grid container xs={12}>
          <Grid xs={6} textAlign={'center'}>
            <Paper sx={{ m: 2, p: 2 }}>
              <Typography textAlign={'center'} variant='h4'>Enter a Percentage</Typography>
              <Typography textAlign={'center'} variant='subtitle1'>This is the percent of household expenses that must be covered with business income.</Typography>
              <br></br>
              <TextField
                fullWidth variant="outlined"
                type="number"
                name="percent"
                sx={{ m: 4, width: 195 }}
                required
                InputProps={{ startAdornment: <InputAdornment position="start">%</InputAdornment> }}
                value={percent}
                onChange={(event) => setPercent(event.target.value)}
              />
              <Typography textAlign={'center'} variant='subtitle1'>Expected required income:</Typography>
              <Typography textAlign={'center'} variant='h5'><Currency value={requiredIncome} /></Typography>
            </Paper>
          </Grid>
          <Grid xs={6} textAlign={'center'}>
            <Paper sx={{ m: 2, p: 2 }}>
              <Typography textAlign={'center'} variant='h4'>Owner Pay</Typography>
              <Typography textAlign={'center'} variant='subtitle1'>Beyond the amount shown as required income, what  is the additional value pay that you want to deposit every month in your bank account?</Typography>
              <TextField
                fullWidth variant="outlined"
                type="number"
                name="dollaramount"
                sx={{ m: 4, width: 195 }}
                required
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                value={dollarAmount}
                onChange={(event) => setDollarAmount(event.target.value)}
              />
              <Typography textAlign={'center'} variant='subtitle1'>Owner's Value Pay:</Typography>
              <Typography textAlign={'center'} variant='h5'><Currency value={valuePay} /></Typography>
            </Paper>
          </Grid>
        </Grid>
        <Box textAlign='center'>
          {isStartPlanCompleted ? (
            <Button variant='outlined' type='button' onClick={handleSubmit}>
              Update
            </Button>
          ) : (
            <Button variant='contained' type='submit' onClick={handleSubmit}>
              Save
            </Button>
          )}
        </Box>
        <ProgressBar back={'otherexpenses'} next={'incomeyear1'} value={40} budgetId={budgetId} />
      </Container>
    </Main >
  );
}


