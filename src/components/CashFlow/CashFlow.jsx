import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, Container, Grid, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Currency from '../Shared/Currency';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';


function CashFlow() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const cashflow = useSelector((store) => store.cashflow);
    console.log(cashflow);
    const totalExpenseAmount = useSelector((store) =>
    store.expense.reduce((total, currentExpense) => {
        if (currentExpense.year === null || currentExpense.year === selectedYear) {
            return total + currentExpense.expense_amount;
        }
        return total;
    }, 0)
);
    const futurePlans = useSelector((store) => store.futurePlans);
    const income = useSelector((store) => store.income);
    const open = useSelector(store=>store.sideNav);
    const [beginningCash, setBeginningCash] = useState(0);
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [monthlySales, setMonthlySales] = useState(0);

    
    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    function calculateTotal() {
        let total = { y1: 0, y2: 0 };
        for (const item of income) {
            if (item.year === 1) {
                total.y1 += item.price * Number(item.time_used);
            } else {
                total.y2 += item.price * Number(item.time_used);
            }
        }
        return total;
    }
    const totalIncome = calculateTotal();

    // When the year/month/cashflow changes, we want to run some calculations
    useEffect(() => {
        const calculatedCashFlow = cashflow.find(item => item.year === selectedYear && item.month === selectedMonth);
        const monthlyPercentOfCashFlow = calculatedCashFlow.percent / 100;
        const yearIndex = 'y' + selectedYear;
        const yearlyIncome = totalIncome[yearIndex];
        setMonthlySales(yearlyIncome * monthlyPercentOfCashFlow);
    }, [selectedMonth, selectedYear, cashflow, totalIncome]);


    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

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
            <Button onClick={() => handleYearChange(1)} variant={selectedYear === 1 ? 'contained' : 'outlined'}>
                Year 1
            </Button>
            <Button onClick={() => handleYearChange(2)} variant={selectedYear === 2 ? 'contained' : 'outlined'}>
                Year 2
            </Button>
            <TextField 
                name="beginningCash"
                label="Beginning Cash Balance"
                fullWidth
                value={beginningCash}
                // onChange={}
                sx={{ marginBottom: 2 }} 
                />
            <TextField 
                name="salesPercent"
                label="Sales Percent"
                fullWidth
                value={beginningCash}
                // onChange={}
                sx={{ marginBottom: 2 }} 
                />
            <FormControl fullWidth>
            <InputLabel id="month-select-label">Select Month</InputLabel>
                    <Select
                    labelId="month-select-label"
                    id="month-select"
                    label="Select Month"
                    value={selectedMonth}
                    onChange={(event)=>handleMonthChange(event)}
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
                <Typography textAlign={'center'} variant='subtitle1'>Annual Projected Sales</Typography>
                <Typography textAlign={'center'} variant='h5'><Currency value={totalIncome.y1 || 0}/></Typography>
                </Paper>
            </Grid>
            <Grid xs={6} textAlign={'center'}>
                <Paper sx={{ m: 2, p: 2 }}>
                <Typography textAlign={'center'} variant='subtitle1'>Sales for the Month</Typography>
                <Typography textAlign={'center'} variant='h5'><Currency value={monthlySales} /></Typography>
                </Paper>
            </Grid>
            <Grid xs={6} textAlign={'center'}>
                <Paper sx={{ m: 2, p: 2 }}>
                <Typography textAlign={'center'} variant='subtitle1'>Total Cash Paid Out</Typography>
                <Typography textAlign={'center'} variant='h5'><Currency value={totalExpenseAmount || 0} /></Typography>
                </Paper>
            </Grid>
            <Grid xs={6} textAlign={'center'}>
                <Paper sx={{ m: 2, p: 2 }}>
                <Typography textAlign={'center'} variant='subtitle1'>Ending Cash Balance</Typography>
                {/* <Typography textAlign={'center'} variant='h5'><Currency value={cashBalanceTotal || 0} /></Typography> */}
                </Paper>
            </Grid>
        </Container>
        <Footer />
        </Main>
    );
    }

    export default CashFlow;