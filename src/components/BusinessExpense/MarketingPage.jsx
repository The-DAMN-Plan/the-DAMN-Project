import React, { useState } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Grid, Box, FormControl, InputLabel, Select, MenuItem,
} from '@mui/material';
import { useDispatch } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';

function MarketingBudget() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [marketingBudget, setMarketingBudget] = useState([]);
    const [newItem, setNewItem] = useState({
        expense_name: '',
        service_provider: '',
        payment_interval: '', // Added to align with "Payment Interval"
        assets_needed: '', // Added to align with "Assets Needed"
        cost_per_use: '',
        contractor_in_house: '', // Renamed to match "Contractor or In-House"
        monthly_usage_count: '', // Added to align with "Monthly Usage Count"
    });

    const handleAddMarketingItem = () => {
        if (!newItem.expense_name || !newItem.cost_per_use || !newItem.payment_interval || !newItem.assets_needed || !newItem.service_provider || !newItem.contractor_in_house || !newItem.monthly_usage_count) return;
        setMarketingBudget([...marketingBudget, { ...newItem }]);
        setNewItem({
            expense_name: '',
            service_provider: '',
            payment_interval: '',
            assets_needed: '',
            cost_per_use: '',
            contractor_in_house: '',
            monthly_usage_count: '',
        }); // Reset the newItem state
    };

    const handleDeleteMarketingItem = (index) => {
        const newMarketingBudget = marketingBudget.filter((_, i) => i !== index);
        setMarketingBudget(newMarketingBudget);
    };

    const handleInputChange = (event, fieldName = null) => {
        let name, value;

        // Check if the event is from Select component or TextField
        if (fieldName) {
            // For Select, use the provided fieldName and the value from the event
            name = fieldName;
            value = event.target.value;
        } else {
            // For TextField, extract name and value directly from the event
            name = event.target.name;
            value = event.target.value;
        }

        setNewItem({ ...newItem, [name]: value });
    };



    return (
        <Container sx={{ paddingTop: '64px' }}>
            <Typography variant="h4" gutterBottom>Marketing Budget</Typography>

            {/* Grid container for input fields */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <TextField
                        name="expense_name"
                        label="Service/ Item"
                        value={newItem.expense_name}
                        onChange={(e) => handleInputChange('expense_name', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="cost_per_use"
                        label="Cost Per Use"
                        value={newItem.cost_per_use}
                        onChange={(e) => handleInputChange('cost_per_use', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="frequency"
                        label="Monthly Frequency"
                        value={newItem.frequency}
                        onChange={(e) => handleInputChange('frequency', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="vendor-label">Select One</InputLabel>
                        <Select
                            labelId="vendor-label"
                            id="vendor"
                            name="vendor"
                            value={newItem.vendor}
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
                        value={newItem.service_provider}
                        onChange={(e) => handleInputChange('service_provider', e.target.value)}
                        fullWidth
                    />
                </Grid>

                {/* Additional inputs for the new fields */}
                <Grid item xs={12} md={3}>
                    <TextField
                        name="payment_interval"
                        label="Payment Interval"
                        value={newItem.payment_interval}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="assets_needed"
                        label="Assets Needed"
                        value={newItem.assets_needed}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="monthly_usage_count"
                        label="Monthly Usage Count"
                        value={newItem.monthly_usage_count}
                        onChange={handleInputChange}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleAddMarketingItem}>Add Item</Button>
                </Grid>
            </Grid>

            <Table>
                <TableHead>
                    {/* Table headers aligned with the input fields */}
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
                    {marketingBudget.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.expense_name}</TableCell>
                            <TableCell align="right">{item.service_provider}</TableCell>
                            <TableCell align="right">{item.payment_interval}</TableCell>
                            <TableCell align="right">{item.assets_needed}</TableCell>
                            <TableCell align="right"><Currency value={item.cost_per_use} /></TableCell>
                            <TableCell align="right">{item.contractor_in_house}</TableCell>
                            <TableCell align="right">{item.monthly_usage_count}</TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDeleteMarketingItem(index)} variant="contained" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <Box sx={{ pt: 4 }}>
                <ProgressBar activeStep={5} />
            </Box>
        </Container>
    );
}

export default MarketingBudget;
