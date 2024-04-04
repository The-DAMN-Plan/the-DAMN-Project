import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Box, FormControl, InputLabel, Select, MenuItem, Grid, Paper
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import ProgressBar from '../ProgressBar/ProgressBar';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

function MarketingPageYear2() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const expense = useSelector((store) => store.expense);
    const open = useSelector(store => store.sideNav);
    const [expenseName, setExpenseName] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [paymentInterval, setPaymentInterval] = useState('');
    const [assetsNeeded, setAssetsNeeded] = useState('');
    const [costPerUse, setCostPerUse] = useState('');
    const [vendor, setVendor] = useState('');
    const [monthlyUsageCount, setMonthlyUsageCount] = useState('');


    const [userEntry, setuserEntry] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    const handleAddExpense = () => {
        if (!expenseName || !costPerUse || !vendor) return; // Validate input
        const budgetIdObj = budgetId.budgetId;
        const expenseNumber = Number(costPerUse * monthlyUsageCount * 12).toFixed(2);
        const newCostPerUse = Number(parseFloat(costPerUse).toFixed(2));

        const formData = {
            expense_name: expenseName,
            facilitator: serviceProvider,
            timing: paymentInterval,
            assets_needed: assetsNeeded,
            cost_per_use: newCostPerUse,
            vendor: vendor,
            frequency: monthlyUsageCount,
            year: 2,
            budget_id: budgetIdObj,
            expense_amount: expenseNumber,
            type: 'business marketing'
        };
        setuserEntry([...userEntry, formData]);
        resetForm();

    };

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
        const updateObj = {
            completed: true,
            budget_id: Number(budgetId.budgetId),
            step: 'marketingy2'
        }

        dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
        setuserEntry([]);
    };

    const handleDeleteExpense = (id) => {

        const newUserEntry = userEntry.filter((i) => i.id !== id);
        setuserEntry(newUserEntry);


    };

    const resetForm = () => {
        // Reset form fields after adding a new expense
        setExpenseName('');
        setServiceProvider('');
        setPaymentInterval('');
        setAssetsNeeded('');
        setCostPerUse('');
        setVendor('');
        setMonthlyUsageCount('');
    };

    const handleDeleteFromDB = (expenseId) => {
        const budgetObjId = budgetId.budgetId;
        dispatch({ type: 'DELETE_EXPENSE', payload: { expenseId, budgetObjId } })
    };

    const filteredExpenses = expense.filter(item => item.type === 'business marketing' && item.year === 2);

    return (

        <Main open={open}>
            <Container >
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} gutterBottom marginTop={'24px'} textAlign={'center'} marginBottom={'24px'}>
                        Marketing Budget Year 2
                    </Typography>

                    <Typography variant="body1" marginTop={'24px'} textAlign={'center'} marginBottom={'24px'} >
                        To develop your marketing budget, follow these steps: Begin with market research and decisions on marketing strategy and tools, listing each activity's cost. Exclude costs covered by employee time or contractor fees but document these activities for completion records. Determine each item's frequency, timing, responsible party (contractor or in-house), and necessary assets like copy or photos. Enter the cost per use and calculate monthly and yearly expenses.
                    </Typography>
                    <Grid container spacing={2} alignItems="center" justifyContent={'center'}>
                        <Grid item xs={12} md={3}>
                            <TextField
                                name="expenseName"
                                label="Service/ Item"
                                value={expenseName}
                                onChange={(e) => setExpenseName(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                name="serviceProvider"
                                label="Service Provider"
                                value={serviceProvider}
                                onChange={(e) => setServiceProvider(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                name="costPerUse"
                                label="Cost Per Use"
                                value={costPerUse}
                                onChange={(e) => setCostPerUse(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="assetsNeeded"
                                label="Assets Needed"
                                value={assetsNeeded}
                                onChange={(e) => setAssetsNeeded(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                name="monthlyUsageCount"
                                label="Monthly Usage Count"
                                value={monthlyUsageCount}
                                onChange={(e) => setMonthlyUsageCount(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl fullWidth>
                                <InputLabel id="vendor-label">Vendor</InputLabel>
                                <Select
                                    labelId="vendor-label"
                                    value={vendor}
                                    label="Vendor"
                                    onChange={(e) => setVendor(e.target.value)}
                                >
                                    <MenuItem value="Contractor">Contractor</MenuItem>
                                    <MenuItem value="In-House">In-House</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                name="paymentInterval"
                                label="Payment Interval"
                                value={paymentInterval}
                                onChange={(e) => setPaymentInterval(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} textAlign={'center'} >
                            <Button variant="contained" color="primary" onClick={handleAddExpense}>Submit</Button>
                        </Grid>
                    </Grid>

                    <Table sx={{ mt: 2 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Service/ Item</TableCell>
                                <TableCell align="right">Service Provider</TableCell>
                                <TableCell align="right">Payment Interval</TableCell>
                                <TableCell align="right">Assets Needed</TableCell>
                                <TableCell align="right">Cost Per Use</TableCell>
                                <TableCell align="right">Contractor or In-House</TableCell>
                                <TableCell align="right">Monthly Usage Count</TableCell>
                                <TableCell align="right">Monthly Expense</TableCell> {/* New Column */}
                                <TableCell align="right">Yearly Expense</TableCell> {/* New Column */}
                                <TableCell align="center"></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userEntry.map((value, index) => (
                                <TableRow key={index}>
                                    <TableCell>{value.expense_name}</TableCell>
                                    <TableCell align="right">{value.facilitator}</TableCell>
                                    <TableCell align="right">{value.timing}</TableCell>
                                    <TableCell align="right">{value.assets_needed}</TableCell>
                                    <TableCell align="right"><Currency value={value.cost_per_use} /></TableCell>
                                    <TableCell align="right">{value.vendor}</TableCell>
                                    <TableCell align="right">{value.frequency}</TableCell>
                                    <TableCell align="right">
                                        {/* Calculate Monthly Expense */}
                                        <Currency value={value.frequency * value.cost_per_use} />
                                    </TableCell>
                                    <TableCell align="right">
                                        {/* Calculate Yearly Expense */}
                                        <Currency value={value.frequency * value.cost_per_use * 12} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleDeleteExpense(value.id)} variant="outlined" color="secondary">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {filteredExpenses?.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.expense_name}</TableCell>
                                    <TableCell align="right">{expense.facilitator}</TableCell>
                                    <TableCell align="right">{expense.timing}</TableCell>
                                    <TableCell align="right">{expense.assets_needed}</TableCell>
                                    <TableCell align="right"><Currency value={expense.cost_per_use} /></TableCell>
                                    <TableCell align="right">{expense.vendor}</TableCell>
                                    <TableCell align="right">{expense.frequency}</TableCell>
                                    <TableCell align="right">
                                        {/* Calculate Monthly Expense */}
                                        <Currency value={expense.frequency * expense.cost_per_use} />
                                    </TableCell>
                                    <TableCell align="right">
                                        {/* Calculate Yearly Expense */}
                                        <Currency value={expense.frequency * expense.cost_per_use * 12} />
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleDeleteFromDB(expense.id)} variant="outlined" color="secondary">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>


                    <Box paddingTop={'24px'} textAlign={'center'}>
                        <Button variant='contained' type='button' onClick={() => handleSubmit(event)}>
                            Save
                        </Button>
                    </Box>

                    <ProgressBar back={'marketingy1'} next={'hrpagey1'} value={78} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>
    );
}

export default MarketingPageYear2;
