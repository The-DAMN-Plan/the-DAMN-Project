import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, Container, Grid, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Currency from '../Shared/Currency';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';


function CashFlow() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const cashflow = useSelector((store) => store.cashflow);
    const expense = useSelector((store) => store.expense);
    const income = useSelector((store) => store.income);
    const open = useSelector(store=>store.sideNav);
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState('');

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    const handleMonthChange = (event) => {
        setSelectedMonth(event.target.value);
    };

    const filteredCashflow = cashflow.filter(item => item.year === selectedYear);

    return (
        <Main open={open}>
        <Container>
        <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
            </Grid>
            <Grid item xs={12} md={6}>
            <Typography variant="h4" gutterBottom>
                Cash Flow
            </Typography>
            {/* Year buttons */}
            <Button onClick={() => handleYearChange(1)} variant={selectedYear === 1 ? 'contained' : 'outlined'}>
                Year 1
            </Button>
            <Button onClick={() => handleYearChange(2)} variant={selectedYear === 2 ? 'contained' : 'outlined'}>
                Year 2
            </Button>
            <FormControl fullWidth>
            <InputLabel id="month-select-label">Select Month</InputLabel>
                    <Select
                    labelId="month-select-label"
                    id="month-select"
                    label="Select Month"
                    value={selectedMonth}
                    onChange={handleMonthChange}
                    >
                    {filteredCashflow.map(item => (
                        <MenuItem key={item.id} value={item.month}>
                        Month {item.month}
                        </MenuItem>
                    ))}
                    </Select>
            </FormControl>
                        
            </Grid>
        </Grid>
        <Grid xs={6} textAlign={'center'}>
                <Paper sx={{ m: 2, p: 2 }}>
                <Typography textAlign={'center'} variant='subtitle1'>Expected required income:</Typography>
                <Typography textAlign={'center'} variant='h5'></Typography>
                </Paper>
            </Grid>
        </Container>
        <Footer />
        </Main>
    );
    }

    export default CashFlow;