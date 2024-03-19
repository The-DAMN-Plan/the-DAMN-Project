import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';

function StartPlan(props) {
    const [formValues, setFormValues] = useState({
        realEstateTaxes: 0,
        carInsurance: 0,
        houseInsurance: 0,
        creditCard: 0,
        loanPayment: 0
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Values: ', formValues);
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
                            <TextField name="realEstateTaxes" label="Real Estate Taxes" fullWidth value={formValues.realEstateTaxes} onChange={(event) => setFormValues({...formValues, realEstateTaxes: event.target.value})} sx={{ marginBottom: 2 }} />
                            <TextField name="carInsurance" label="Car Insurance" fullWidth value={formValues.carInsurance} onChange={(event) => setFormValues({...formValues, carInsurance: event.target.value})} sx={{ marginBottom: 2 }} />
                            <TextField name="houseInsurance" label="House Insurance" fullWidth value={formValues.houseInsurance} onChange={(event) => setFormValues({...formValues, houseInsurance: event.target.value})} sx={{ marginBottom: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="creditCard" label="All Credit Card Payment" fullWidth value={formValues.creditCard} onChange={(event) => setFormValues({...formValues, creditCard: event.target.value})} sx={{ marginBottom: 2 }} />
                            <TextField name="loanPayment" label="All Loan Payments" fullWidth value={formValues.loanPayment} onChange={(event) => setFormValues({...formValues, loanPaymeant: event.target.value})} sx={{ marginBottom: 2 }} />
                        </Grid>
                    </Grid>
                    <Box textAlign="center" marginTop={4}>
                        <Button type="submit" variant="contained" color="primary">
                            Next Page
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default StartPlan;
