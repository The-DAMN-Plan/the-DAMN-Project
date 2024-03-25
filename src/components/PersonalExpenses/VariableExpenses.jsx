import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function VariableExpenses() {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);
    const budgetId = useParams();
    const budgetObj = budget[0];
    const [userEntry, setUserEntry] = useState([])

    const [formValues, setFormValues] = useState({
        food: '',
        clothing: '',
        personalCare: '',
        recreation: '',
        gifts: '',
        gas: '',
        carRepairs: '',
        homeMaintenance: ''
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // Find the index of the existing formData object with the same expense_name
        const existingIndex = userEntry.findIndex(item => item.expense_name === name);

        // If the formData object exists, update its expense_amount
        if (existingIndex !== -1) {
            const updatedUserEntry = [...userEntry];
            updatedUserEntry[existingIndex] = {
                ...updatedUserEntry[existingIndex],
                expense_amount: value
            };
            setUserEntry(updatedUserEntry);
        } else {
            // If the formData object doesn't exist, create a new one
            const formData = {
                budget_id: budgetObj.id,
                type: 'personal decision',
                expense_name: name,
                expense_amount: value
            };
            setUserEntry([...userEntry, formData]);
        }

        // Update the form values
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    console.log(userEntry);

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 24, marginTop: 32 }}>
                <Typography variant="h3" align="center" gutterBottom>
                    Variable Living Expenses
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                    On this page take some time to think about your monthly expenses that change and try to come up with an average of what you pay.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <TextField name="food" label="Food" fullWidth value={formValues.food} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="clothing" label="Clothing" fullWidth value={formValues.clothing} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="personalCare" label="Personal Care" fullWidth value={formValues.personalCare} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="recreation" label="Recreation" fullWidth value={formValues.recreation} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="gifts" label="Gifts" fullWidth value={formValues.gifts} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="gas" label="Gas" fullWidth value={formValues.gas} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="carRepairs" label="Car Repairs" fullWidth value={formValues.carRepairs} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="homeMaintenance" label="Home Maintenance" fullWidth value={formValues.homeMaintenance} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                    </Grid>
                    <ProgressBar next={'futureplans'} back={'personalsavings'} value={24} budgetId={budgetId}/>
                </form>
            </Paper>
        </Container>
    );
}

export default VariableExpenses;
