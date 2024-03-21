import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProgressBar from '../ProgressBar/ProgressBar';

function StartPlan() {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);

    console.log(budget);

    useEffect(() => {
        dispatch({ type: 'FETCH_BUDGET' })
    }, [dispatch]);

    const budgetObj = budget[0];
    const [userEntry, setUserEntry] = useState([])

    const [formValues, setFormValues] = useState({
        rentOrMortgage: '',
        electric: '',
        heat: '',
        water: '',
        internet: '',
        telephone: '',
        childcare: '',
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
        history.push('/plan2');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 24, marginTop: 32 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Start a DAMN Plan
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                    Fundamental Living Expenses
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                    Your singular goal in business is to "meet your customer's wants and needs at a profit" and pay yourself!
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <TextField name="rentOrMortgage" label="Rent or Mortgage" fullWidth value={formValues.rentOrMortgage} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="electric" label="Electric" fullWidth value={formValues.electric} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="heat" label="Heat" fullWidth value={formValues.heat} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="water" label="Water" fullWidth value={formValues.water} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="internet" label="Internet" fullWidth value={formValues.internet} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="telephone" label="Telephone" fullWidth value={formValues.telephone} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="childcare" label="Childcare" fullWidth value={formValues.childcare} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                    </Grid>
                    <ProgressBar back={'startplan'} next={'fundamentalexpenses'} value={5} submit={handleSubmit}/>
                </form>
            </Paper>
        </Container>
    );
}

export default StartPlan;
