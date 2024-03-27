import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Box, Paper, TextField, InputAdornment, Switch, InputLabel } from '@mui/material';
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
  const [flatYearOne, setflatYearOne] = useState(0);
  const [flatYearTwo, setflatYearTwo] = useState(0);
  const income = useSelector((store) => store.income)

  function calculateTotal() {
    let total = {y1: 0, y2: 0};
    for (const item of income) {
      if (item.year === 1){
        total.y1 += item.price * number(item.time_used);
      } else {
        total.y2 += item.price * number(item.time_used);
      }
    }
    return total;
  }

  const totalIncome = calculateTotal();

  useEffect(() => {
    dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
  }, [dispatch, budgetId]);

  const [checked, setChecked] = useState(false);

  const open = useSelector(store => store.sideNav);


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
          <Grid >
            {!checked ?
              // percentage view
              <Paper>
                <Box sx={{ width: '40vh', p: 3 }}>
                  <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year One</Typography>
                  <Box>
                    <Typography>Projected Revenue:</Typography>
                    <Typography variant='h4' sx={{ mb: 3 }}><Currency value={totalIncome.y1 ? totalIncome.y1 : 0} /></Typography>
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
                    <Typography sx={{ mb: 3 }}><Currency value={percentYearOne * totalIncome.y1} /></Typography>
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
                    <Typography variant='h4' sx={{ mb: 3 }}><Currency value={totalIncome.y1 ? totalIncome.y1 : 0} /></Typography>
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
          <Grid >
            {!checked ?
              // percentage view
              <Paper>
                <Box sx={{ width: '40vh', p: 3 }}>
                  <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year Two</Typography>
                  <Typography>Projected Revenue:</Typography>
                  <Typography variant='h4' sx={{ mb: 3 }}><Currency value={totalIncome.y2 ? totalIncome.y2 : 0} /></Typography>
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
                  <Typography sx={{ mb: 3 }}><Currency value={percentYearTwo * totalIncome.y2} /></Typography>
                </Box>
              </Paper>
              :
              // flat number view
              <Paper>
                <Box sx={{ width: '40vh', p: 3 }}>
                  <Typography textAlign={'center'} variant='h3' sx={{ mb: 3 }}>Year Two</Typography>
                  <Box>
                    <Typography>Projected Revenue:</Typography>
                    <Typography variant='h4' sx={{ mb: 3 }}><Currency value={totalIncome.y2 ? totalIncome.y2 : 0} /></Typography>
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
        <ProgressBar back={'incomeyear2'} next={'businessexpensepage1'} value={54} budgetId={budgetId} />
      </Container >
      <Footer />
    </Main>
  );
}