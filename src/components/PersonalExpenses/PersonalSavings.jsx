import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import ProgressBar from '../ProgressBar/ProgressBar';

function PersonalSavings() {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);
    console.log('Budget store', budget);
    const budgetObj = budget[0];
    console.log('BUDGET ID', budgetObj);
    const [userEntry, setUserEntry] = useState([]);

    const [formValues, setFormValues] = useState({
        personalAllowance: '',
        emergencySavings: '',
        retirement: '',
        investments: '',
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
        history.push('/plan4');
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 24, marginTop: 32 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Personal Savings
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        {/* Each TextField in its own Grid item, taking up 6 columns (half of the container) */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="personalAllowance"
                                label="Personal Allowance"
                                fullWidth
                                value={formValues.personalAllowance}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="emergencySavings"
                                label="Emergency Savings"
                                fullWidth
                                value={formValues.emergencySavings}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="retirement"
                                label="Retirement"
                                fullWidth
                                value={formValues.retirement}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="investments"
                                label="Investments"
                                fullWidth
                                value={formValues.investments}
                                onChange={handleInputChange}
                                sx={{ mb: 2 }}
                            />
                        </Grid>
                    </Grid>
                    <ProgressBar back={'fundamentalexpenses'} next={'variableexpenses'} value={5}/>
                </form>
            </Paper>
        </Container>
    );
}

export default PersonalSavings;
