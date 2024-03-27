import { Container, Typography, Paper, TextField, InputAdornment, Button } from '@mui/material';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';


export default function ValuePay(props) {
  const [percent, setPercent] = useState(0);
  const [dollarAmount, setDollarAmount] = useState(0);
  const open = useSelector(store=>store.sideNav);
  const history = useHistory();
  const budgetId = useParams();


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
              <Typography textAlign={'center'} variant='h5'>$xx,xxx</Typography>
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
              <Typography textAlign={'center'} variant='h5'>$xx,xxx</Typography>
            </Paper>
          </Grid>
        </Grid>
        <ProgressBar back={'otherexpenses'} next={'incomeyear1'} value={40} budgetId={budgetId} />
      </Container>
      <Footer/>
    </Main>
  );
}


