import React, { useState, useEffect } from 'react';
import { Typography, Paper, Button, Container, Grid, Select, MenuItem, FormControl, InputLabel, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom';
import Currency from '../Shared/Currency';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import moment from 'moment';

function CashFlow() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const cashflow = useSelector((store) => store.cashflow);
    const expense = useSelector((store) => store.expense);
    const filteredExpenses = expense.filter(item => item.type === 'business marketing' || item.type === 'business hr' || item.type === 'business other' || item.type === 'business expense');
    const futurePlans = useSelector((store) => store.futurePlans);
    const income = useSelector((store) => store.income);
    const open = useSelector(store => store.sideNav);
    const budget = useSelector(store => store.finalBudget);
    const [beginningCash, setBeginningCash] = useState(0);
    const [salesPercent, setSalesPercent] = useState(0);
    const [selectedYear, setSelectedYear] = useState(1);
    const [selectedMonth, setSelectedMonth] = useState(1);
    const [monthlySales, setMonthlySales] = useState(0);
    const [totalFutureSavings, setTotalFutureSavings] = useState(0);

    // todo: needs fixing
    function calculateOperatingCosts() {
        let total = 0;
        for (const expense of filteredExpenses) {

            total += expense.expense_amount;

        }
        total += Number(budget[0].valuepay) ? Number(budget[0].valuepay) : 0;
        return total;
    }

    const totalExpenseAmount = calculateOperatingCosts();


    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);


    // Calulates the total of income for the year
    function calculateTotal() {
        let total = 0;

        for (const item of income) {
                total += (item.price / item.time_used) * Number(item.purchasers);
        }
        return total;
    }

    const totalIncome = calculateTotal();

    function mapArrays() {
        let annualCashflow = []
        let lastCashBalance = 0;
        let beginningCashBalance = Number(beginningCash);

        for (const item of cashflow) {
            if (item.month !== 1) {
                beginningCashBalance = lastCashBalance;
            }

            // console.log('month', item.month, 'monthly sales', calculateMonthlySales(item.month));
            const endingCashBalance = beginningCashBalance + calculateMonthlySales(item.month) - totalExpenseAmount;
            // console.log('month', item.month, 'monthly sales', calculateMonthlySales(item.month), 'beginning cash balance', beginningCashBalance, 'ending cash balance', endingCashBalance);
            lastCashBalance = endingCashBalance;

            // console.log("month", item.month, 'beginning cash balance', beginningCashBalance, 'monthly sales', monthlySales, "total expense", totalExpenseAmount, 'ending cash balance', endingCashBalance);

            // console.log('monthly sales', monthlySales,);
            annualCashflow.push({
                month: item.month,
                beginningCashBalance,
                monthlySales: calculateMonthlySales(item.month),
                totalExpenseAmount,
                endingCashBalance,
            })
        }

        return annualCashflow;
    }

    // When the year/month/cashflow changes, we want to run some calculations
    // useEffect(() => {
    //     setMonthlySales(calculateMonthlySales(selectedMonth));
    //     console.log('updating ', calculateMonthlySales(selectedMonth) );
    // }, [selectedMonth, cashflow]);

    // useEffect(() => {
    //     mapArrays();
    // }, [selectedMonth, beginningCash]);

    // calculate monthly sales for each month selected
    // it takes a month value as an integer
    function calculateMonthlySales(month) {
        let calculatedCashFlow = {};
        let monthlyPercentOfCashFlow = 0;
        // let yearIndex = '';
        let yearlyIncome = 0;
        let tempYear= 0
        // each year
        for (let i = 0; i < 2; i++) {
            // console.log('cash flow',cashflow);
            calculatedCashFlow = cashflow.find(item => item.month === month);
            // console.log('Month', month, 'calculated cash flow',calculatedCashFlow);
            monthlyPercentOfCashFlow = calculatedCashFlow.percent / 100;
            yearlyIncome = totalIncome;
        
            if (i === 0) {
                tempYear= yearlyIncome * monthlyPercentOfCashFlow;
            }
        }
        return tempYear;
    }


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

    const handleYearChange = (year) => {
        setSelectedYear(year);
    };

    const handleMonthChange = (event) => {
        setSelectedMonth(parseInt(event.target.value));
    };

    const filteredCashflow = cashflow.filter(item => item.year === selectedYear);
    const arrays = mapArrays();

    const findEndingBalance = () => {

        console.log(arrays);
        let endingBalance = arrays.find(eb => eb.month === selectedMonth);
        return endingBalance;
    }

    const endingBalance = findEndingBalance().endingCashBalance;

    // const findEndingBalance = () => {
    //     let endingBalance = 0;
        
    // }

    useEffect(() => {
        // Find the item in cashflow array corresponding to selectedMonth
        const percentItem = cashflow.find(item => item.month === selectedMonth);
        // If found, update salesPercent with the percent value, else set it to 0
        if (percentItem) {
            setSalesPercent(percentItem.percent);
        } else {
            setSalesPercent(0);
        }
    }, [selectedMonth, selectedYear, cashflow]);


    return (
        <Main open={open}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h3" color={'primary'} align="center" gutterBottom>
                                Cash Flow
                            </Typography>
                                    <Typography align='center' sx={{ marginBottom: 2}}>
                                        Year Breakdown
                                    </Typography>
                            <TextField
                                name="beginningCash"
                                label="Beginning Cash Balance"
                                fullWidth
                                value={beginningCash}
                                onChange={(e) => setBeginningCash(e.target.value)}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="salesPercent"
                                label="Sales Percent"
                                fullWidth
                                value={salesPercent}
                                // onChange={} Need to set up to update percent. Later Goal
                                sx={{ marginBottom: 2 }}
                            />
                            <FormControl fullWidth>
                                <InputLabel id="month-select-label">Select Month</InputLabel>
                                <Select
                                    labelId="month-select-label"
                                    id="month-select"
                                    label="Select Month"
                                    value={selectedMonth}
                                    onChange={(event) => handleMonthChange(event)}
                                >
                                    {filteredCashflow.map(item => (
                                        <MenuItem key={item.id} value={item.month}>
                                            Month {item.month}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>
                </Grid>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ m: 2, p: 2 }}>
                            <Typography variant="subtitle1" textAlign="center">Annual Projected Sales</Typography>
                            <Typography variant="h5" textAlign="center"><Currency value={totalIncome || 0} /></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ m: 2, p: 2 }}>
                            <Typography variant="subtitle1" textAlign="center">Sales for the Month</Typography>
                            <Typography variant="h5" textAlign="center"><Currency value={calculateMonthlySales(selectedMonth) || 0 } /></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ m: 2, p: 2 }}>
                            <Typography variant="subtitle1" textAlign="center">Total Cash Paid Out</Typography>
                            <Typography variant="h5" textAlign="center"><Currency value={totalExpenseAmount || 0} /></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ m: 2, p: 2 }}>
                            <Typography variant="subtitle1" textAlign="center">Ending Cash Balance</Typography>
                            {/* we need ending cash balance here */}
                            <Typography variant="h5" textAlign="center"><Currency value={endingBalance || 0} /></Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </Main>
    );
}

export default CashFlow;