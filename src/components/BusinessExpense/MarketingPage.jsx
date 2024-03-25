import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';

function Budget() {
    const dispatch = useDispatch();
    const history = useHistory();
    const budgetList = useSelector((store) => store.budget);

    useEffect(() => {
        dispatch({ type: 'FETCH_BUDGET' });
    }, [dispatch]);

    const [formValues, setFormValues] = useState({
        expense_name: '',
        service_provider: '',
        payment_interval: '',
        assets_needed: '',
        cost_per_use: '',
        contractor_in_house: '',
        monthly_usage_count: '',
    });

    const handleAddMarketingformValues = (event) => {
        event.preventDefault();
        if (!Object.values(formValues).every(value => value)) return;
        // Assuming dispatch to save the formValues here
        dispatch({ type: 'ADD_MARKETING_formValues', payload: formValues });
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

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        setFormValues(prev => ({
            ...prev,
            [name]: value,
        }));
    };



    return (
        <Container sx={{ paddingTop: '64px' }}>
            <Typography variant="h4" gutterBottom>Marketing Budget</Typography>

            {/* Grid container for input fields */}
            <Grid container spacing={2} alignformValuess="center">
                <Grid formValues xs={12} md={3}>
                    <TextField
                        name="expense_name"
                        label="Service/ formValues"
                        value={formValues.expense_name}
                        onChange={(e) => handleInputChange('expense_name', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid formValues xs={12} md={3}>
                    <TextField
                        name="cost_per_use"
                        label="Cost Per Use"
                        value={formValues.cost_per_use}
                        onChange={(e) => handleInputChange('cost_per_use', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid formValues xs={12} md={3}>
                    <TextField
                        name="frequency"
                        label="Monthly Frequency"
                        value={formValues.frequency}
                        onChange={(e) => handleInputChange('frequency', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid formValues xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="vendor-label">Select One</InputLabel>
                        <Select
                            labelId="vendor-label"
                            id="vendor"
                            name="vendor"
                            value={formValues.vendor}
                            label="Select One"
                            onChange={(e) => handleInputChange(e, 'vendor')} // Pass 'vendor' explicitly
                        >
                            <MenuItem value="Contractor">Contractor</MenuItem>
                            <MenuItem value="In-House">In-House</MenuItem>
                        </Select>
                    </FormControl>


                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="service_provider"
                        label="Service Provider"
                        value={formValues.service_provider}
                        onChange={(e) => handleInputChange('service_provider', e.target.value)}
                        fullWidth
                    />
                </Grid>

                {/* Additional inputs for the new fields */}
                <Grid item xs={12} md={3}>
                    <TextField
                        name="payment_interval"
                        label="Payment Interval"
                        value={formValues.payment_interval}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="assets_needed"
                        label="Assets Needed"
                        value={formValues.assets_needed}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="monthly_usage_count"
                        label="Monthly Usage Count"
                        value={formValues.monthly_usage_count}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddMarketingformValues}>Add formValues</Button>
                </Grid>
            </Grid>

            <Table>
                <TableHead>
                    {/* Table headers aligned with the input fields */}
                    <TableRow>
                        <TableCell>Service/ formValues</TableCell>
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
                    {budgetList.map((formValues, index) => (
                        <TableRow key={index}>
                            <TableCell>{formValues.expense_name}</TableCell>
                            <TableCell align="right">{formValues.service_provider}</TableCell>
                            <TableCell align="right">{formValues.payment_interval}</TableCell>
                            <TableCell align="right">{formValues.assets_needed}</TableCell>
                            <TableCell align="right"><Currency value={formValues.cost_per_use} /></TableCell>
                            <TableCell align="right">{formValues.contractor_in_house}</TableCell>
                            <TableCell align="right">{formValues.monthly_usage_count}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDeleteMarketingformValues(index)} variant="contained" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ pt: 4 }}>
                <ProgressBar activeStep={72} />
            </Box>
        </Container>
    );
}

export default Budget;
