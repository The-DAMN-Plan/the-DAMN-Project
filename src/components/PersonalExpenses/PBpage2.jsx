import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function PBPage2() {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);
    console.log('Budget store', budget);
    const budgetObj = budget[0];
    console.log('BUDGET ID', budgetObj);
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
        setFormValues({
            ...formValues,
            [name]: value,
        });

        const formData = {
            budget_id: budgetObj.id,
            type: 'personal committed',
            expense_name: name, 
            expense_amount: value,
        };

        setUserEntry([...userEntry, formData]);
    };
    console.log(userEntry);

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
        history.push('/plan3');
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
                    <Box textAlign="center" marginTop={4}>
                        <Button type="submit" variant="contained" color="primary" onClick={() => { history.push('/plan3')}}>
                            Next Page
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default PBPage2;
