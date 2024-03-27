import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Box, FormControl, InputLabel, Select, MenuItem, Grid
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import ProgressBar from '../ProgressBar/ProgressBar';



function MarketingBudgetYear1() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const expense = useSelector((store) => store.expense);
    console.log('Expeense Array:', expense);
    const [expenseName, setExpenseName] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [paymentInterval, setPaymentInterval] = useState('');
    const [assetsNeeded, setAssetsNeeded] = useState('');
    const [costPerUse, setCostPerUse] = useState('');
    const [vendor, setVendor] = useState('');
    const [monthlyUsageCount, setMonthlyUsageCount] = useState('');
    const [userEntry, setuserEntry] = useState([]);
    const [expenses, setExpenses] = useState([]);
    const filteredExpenses = expense.filter(item => item.type === 'business marketing');
    console.log('business marketing', filteredExpenses);


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
            budget_id: budgetIdObj,
            expense_amount: expenseNumber,
            type: 'business marketing'
        };
        setuserEntry([...userEntry, formData]);
        resetForm();
    };
    console.log(userEntry);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);
    
    const handleDeleteExpense = (index) => {
        // Remove a marketing value from the list
        const updatedValues = userEntry.filter((_, i) => i !== index);
        setuserEntry(updatedValues);

        const deletedValue = expenses.filter((_, i) => i !== index);
        setuserEntry(deletedValue);
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
    


    return (
        <Container sx={{ paddingTop: '64px', paddingBottom: '64px' }}>
            <Typography variant="h4" gutterBottom >Marketing Budget Year 1</Typography>
            <Grid container spacing={2} alignItems="center">
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
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddExpense}>Add Marketing Value</Button>
                </Grid>
            </Grid>

            <Table >
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
                        <TableCell align="center">Actions</TableCell>
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
                                <Button onClick={() => handleDeleteExpense(index)} variant="outlined" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
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
                                <Button onClick={() => handleDeleteExpense(index)} variant="outlined" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                
        
            <Box paddingTop={'24px'}>
            <Grid>
                <Button onClick={handleSubmit}>
                    Save
                </Button>
            </Grid>
            </Box>
        
            <ProgressBar next={'marketingy2'} back={'otherexpenses'} value={72} budgetId={budgetId} />
        </Container>
    );
}

export default MarketingBudgetYear1;
