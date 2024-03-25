import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2'; // Assuming you're still using the unstable Grid
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';

function MarketingBudgetYear1() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { budgetId } = useParams(); // Capture the budgetId from URL params
    const budgetList = useSelector((store) => store.budget);

    useEffect(() => {
        dispatch({ type: 'FETCH_BUDGET', payload: budgetId }); // Use budgetId here if needed
    }, [dispatch, budgetId]);

    const [formValues, setFormValues] = useState({
        expense_name: '',
        service_provider: '',
        payment_interval: '',
        assets_needed: '',
        cost_per_use: '',
        contractor_in_house: '',
        monthly_usage_count: '',
    });

    const handleAddMarketingValues = (event) => {
        event.preventDefault();
        if (!Object.values(formValues).every(value => value)) return;
        // Assuming dispatch to save the formValues here
        dispatch({ 
            type: 'ADD_BUSINESS_EXPENSE', 
            payload: { ...formValues, budget_id: budgetId } // Use budgetId to associate the expense with the specific budget
        });
        setFormValues({
            expense_name: '',
            service_provider: '',
            payment_interval: '',
            assets_needed: '',
            cost_per_use: '',
            contractor_in_house: '',
            monthly_usage_count: '',
        });
    };

    const handleInputChange = (name) => (event) => {
        const value = event.target.value;
        setFormValues(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    // Function to handle deleting a marketing value entry
    const handleDeleteMarketingValue = (index) => {
        setMarketingValues(marketingValues.filter((_, i) => i !== index));
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
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel id="vendor-label">Contractor or In-House</InputLabel>
                        <Select
                            labelId="vendor-label"
                            id="vendor-select"
                            value={formValues.contractor_in_house}
                            onChange={handleInputChange('contractor_in_house')} // This now works correctly
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

            <Box sx={{ pt: 4 }}>
                <ProgressBar next={'/marketing_year_2/${budgetId}'} back={'/businessexpensepage2/${budgetId}'} value={72} budgetId={budgetId}/>
            </Box>
        </Container>
    );
}

export default MarketingBudgetYear1;
