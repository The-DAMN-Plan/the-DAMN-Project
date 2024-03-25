import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import ProgressBar from '../ProgressBar/ProgressBar';

function PBPage2() {
    const dispatch = useDispatch();
    const budget = useSelector((store) => store.budget);
    const budgetObj = budget[0];
    const [userEntry, setUserEntry] = useState([])

    const [formValues, setFormValues] = useState({
        realEstateTaxes: '',
        carInsurance: '',
        houseInsurance: '',
        creditCard: '',
        loanPayment: ''
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
                type: 'personal committed',
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
                <Typography variant="h4" align="center" gutterBottom>
                    Fundamental Living Expenses
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                    Take some time to think about the monthy bill payments you have to pay.
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <TextField name="realEstateTaxes" label="Real Estate Taxes" fullWidth value={formValues.realEstateTaxes} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="carInsurance" label="Car Insurance" fullWidth value={formValues.carInsurance} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="houseInsurance" label="House Insurance" fullWidth value={formValues.houseInsurance} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="creditCard" label="All Credit Card Payment" fullWidth value={formValues.creditCard} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="loanPayment" label="All Loan Payments" fullWidth value={formValues.loanPayment} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                    </Grid>
                    <ProgressBar back={'startplan'} next={'personalsavings'} value={12}/>
                </form>
            </Paper>
        </Container>
    );
}

export default PBPage2;
