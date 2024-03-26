import React, { useState } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import ProgressBar from '../ProgressBar/ProgressBar';

function MarketingBudgetYear1() {
    const dispatch = useDispatch();
    const { budgetId } = useParams();
    const [expenseName, setExpenseName] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [paymentInterval, setPaymentInterval] = useState('');
    const [assetsNeeded, setAssetsNeeded] = useState('');
    const [costPerUse, setCostPerUse] = useState('');
    const [vendor, setVendor] = useState(''); // Use "vendor" to store either "Contractor" or "In-House"
    const [monthlyUsageCount, setMonthlyUsageCount] = useState('');
    const [marketingValues, setMarketingValues] = useState([]);

    const handleAddMarketingValue = () => {
        if (!expenseName || !costPerUse) return; // Basic validation

        const newExpense = {
            expenseName,
            serviceProvider,
            paymentInterval,
            assetsNeeded,
            costPerUse,
            vendor, // Use "vendor" here
            monthlyUsageCount,
            budgetId
        };

        setMarketingValues(prevValues => [...prevValues, newExpense]);

        // Reset form fields
        setExpenseName('');
        setServiceProvider('');
        setPaymentInterval('');
        setAssetsNeeded('');
        setCostPerUse('');
        setVendor(''); // Reset "vendor"
        setMonthlyUsageCount('');
    };

    const handleDeleteMarketingValue = (index) => {
        const updatedValues = marketingValues.filter((_, i) => i !== index);
        setMarketingValues(updatedValues);
    };


    return (
        <Container sx={{ paddingTop: '64px' }}>
            <Typography variant="h4" gutterBottom >Marketing Budget</Typography>
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <TextField
                        name="expense_name"
                        label="Service/ Item"
                        value={formValues.expense_name}
                        onChange={handleInputChange('expense_name')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="service_provider"
                        label="Service Provider"
                        value={formValues.service_provider}
                        onChange={handleInputChange('service_provider')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="cost_per_use"
                        label="Cost Per Use"
                        value={formValues.cost_per_use}
                        onChange={handleInputChange('cost_per_use')}
                        fullWidth
                    />
                </Grid>

                <Grid item xs={12} md={6}>
                    <TextField
                        name="assets_needed"
                        label="Assets Needed"
                        value={formValues.assets_needed}
                        onChange={handleInputChange('assets_needed')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="monthly_usage_count"
                        label="Monthly Usage Count"
                        value={formValues.monthly_usage_count}
                        onChange={handleInputChange('monthly_usage_count')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="vendor-label">Vendor</InputLabel>
                        <Select
                            labelId="vendor-label"
                            value={vendor}
                            onChange={(e) => setVendor(e.target.value)} // Set "vendor" based on selection
                        >
                            <MenuItem value="Contractor">Contractor</MenuItem>
                            <MenuItem value="In-House">In-House</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="payment_interval"
                        label="Payment Interval"
                        value={formValues.payment_interval}
                        onChange={handleInputChange('payment_interval')}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddMarketingValues}>Add Values</Button>
                </Grid>
            </Grid>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Service/ Item</TableCell>
                        <TableCell align="right">Service Provider</TableCell>
                        <TableCell align="right">Payment Interval</TableCell>
                        <TableCell align="right">Assets Needed</TableCell>
                        <TableCell align="right">Cost Per Use</TableCell>
                        <TableCell align="right">Contractor or In-House</TableCell>
                        <TableCell align="right">Monthly Usage Count</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {marketingValues.map((value, index) => (
                        <TableRow key={index}>
                            <TableCell>{value.expense_name}</TableCell>
                            <TableCell align="right">{value.service_provider}</TableCell>
                            <TableCell align="right">{value.payment_interval}</TableCell>
                            <TableCell align="right">{value.assets_needed}</TableCell>
                            <TableCell align="right"><Currency value={value.cost_per_use} /></TableCell>
                            <TableCell align="right">{value.contractor_in_house}</TableCell>
                            <TableCell align="right">{value.monthly_usage_count}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDeleteMarketingValue(index)} variant="contained" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <ProgressBar next={'marketingy2'} back={'otherexpenses'} value={72} budgetId={budgetId} />
        </Container>
    );
}

export default MarketingBudgetYear1;
