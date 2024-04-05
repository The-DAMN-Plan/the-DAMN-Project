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
    const [monthlySales, setMonthlySales] = useState({ y1: 0, y2: 0 });
    const [totalFutureSavings, setTotalFutureSavings] = useState(0);

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

    function calculateTotal() {
        let total = { y1: 0, y2: 0 };
        for (const item of income) {
            if (item.year === 1) {
                total.y1 += (item.price / item.time_used) * Number(item.purchasers);
            } else {
                total.y2 += (item.price / item.time_used) * Number(item.purchasers);
            }
        }
        return total;
    }
    const totalIncome = calculateTotal();

    function mapArrays() {
        let year = { one: [], two: [] }
        let lastCashBalance = 0;
        let beginningCashBalance = Number(beginningCash);

        for (const item of cashflow) {
            if (item.year === 1) {
                if (item.month === 1) {
                } else {
                    beginningCashBalance = lastCashBalance;
                }
                const endingCashBalance = beginningCashBalance + monthlySales.y1 - totalExpenseAmount;
                lastCashBalance = endingCashBalance;

                year.one.push({
                    year: item.year,
                    month: item.month,
                    beginningCashBalance,
                    monthlySales: monthlySales.y1,
                    totalExpenseAmount,
                    endingCashBalance,
                })
            }

            if (item.year === 2) {

                beginningCashBalance = lastCashBalance;
                const endingCashBalance = beginningCashBalance + monthlySales.y2 - totalExpenseAmount;
                lastCashBalance = endingCashBalance;

                year.two.push({
                    year: item.year,
                    month: item.month,
                    beginningCashBalance,
                    monthlySales: monthlySales.y2,
                    totalExpenseAmount,
                    endingCashBalance,
                })
            }
        }

        return year;
    }

    // When the year/month/cashflow changes, we want to run some calculations
    useEffect(() => {
        setMonthlySales(calculateMonthlySales(selectedMonth));
    }, [selectedMonth, selectedYear, cashflow]);

    useEffect(() => {
        mapArrays();
    }, [selectedMonth, beginningCash]);

    function calculateMonthlySales(month) {
        let calculatedCashFlow = {};
        let monthlyPercentOfCashFlow = 0;
        let yearIndex = '';
        let yearlyIncome = 0;
        let tempYearObj = { y1: 0, y2: 0 }
        // each year
        for (let i = 0; i < 2; i++) {
            calculatedCashFlow = cashflow.find(item => item.month === month);
            monthlyPercentOfCashFlow = calculatedCashFlow.percent / 100;
            yearIndex = 'y' + (i + 1);
            yearlyIncome = totalIncome[yearIndex];
            if (i === 0) {
                tempYearObj.y1 = yearlyIncome * monthlyPercentOfCashFlow;
            } else {
                tempYearObj.y2 = yearlyIncome * monthlyPercentOfCashFlow;
            }
        }
        return tempYearObj;
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
        if (selectedYear === 1) {
            let endingBalance = arrays.one.find(eb => eb.month === selectedMonth);
            return endingBalance;
        } else if (selectedYear === 2) {
            let endingBalance = arrays.two.find(eb => eb.month === selectedMonth);
            return endingBalance;
        }
    }

    const endingBalance = findEndingBalance().endingCashBalance;

    useEffect(() => {
        // Find the item in cashflow array corresponding to selectedMonth and selectedYear
        const percentItem = cashflow.find(item => item.month === selectedMonth && item.year === selectedYear);
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
                            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
                                <Grid item xs={6}>
                                    <Button onClick={() => handleYearChange(1)} variant={selectedYear === 1 ? 'contained' : 'outlined'} size="large" fullWidth>
                                        Year 1
                                    </Button>
                                </Grid>
                                <Grid item xs={6}>
                                    <Button onClick={() => handleYearChange(2)} variant={selectedYear === 2 ? 'contained' : 'outlined'} size="large" fullWidth>
                                        Year 2
                                    </Button>
                                </Grid>
                            </Grid>
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
                            <Typography variant="h5" textAlign="center"><Currency value={selectedYear === 1 ? totalIncome.y1 : totalIncome.y2 || 0} /></Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ m: 2, p: 2 }}>
                            <Typography variant="subtitle1" textAlign="center">Sales for the Month</Typography>
                            <Typography variant="h5" textAlign="center"><Currency value={selectedYear === 1 ? monthlySales.y1 : monthlySales.y2} /></Typography>
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