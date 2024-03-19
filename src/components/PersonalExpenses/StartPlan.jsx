import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';

function StartPlan(props) {
    const store = useSelector((store) => store);

    // Form state
    const [formValues, setFormValues] = useState({
        rentOrMortgage: '',
        electric: '',
        heat: '',
        waterSewerageGarbage: '',
        insuranceCar: '',
        creditCard: '',
        telephoneCell: '',
        cableDishInternet: '',
        realEstateTaxes: '',
        insuranceHouse: '',
        loanPayment: '',
        loanPaymentCar: '',
        // Add more fields if there are more on the image that are not listed here
    });


    // Handle form input changes
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        // This is where the dispatch to the saga would go
        console.log('Form Values: ', formValues);
    };

    return (
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 24, marginTop: 32 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Start a DAMN Plan
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                    Your singular goal in business is to "meet your customer's wants and needs at a profit" and pay yourself!
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        {/* Left column */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="rentOrMortgage"
                                label="Rent or Mortgage"
                                fullWidth
                                value={formValues.rentOrMortgage}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="electric"
                                label="Electric"
                                fullWidth
                                value={formValues.electric}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="heat"
                                label="Heat"
                                fullWidth
                                value={formValues.heat}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="waterSewerageGarbage"
                                label="Water, Sewerage and Garbage"
                                fullWidth
                                value={formValues.waterSewerageGarbage}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="insuranceCar"
                                label="Insurance - Car"
                                fullWidth
                                value={formValues.insuranceCar}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="creditCard"
                                label="Credit Card"
                                fullWidth
                                value={formValues.creditCard}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                        </Grid>
                        {/* Right column */}
                        <Grid item xs={12} md={6}>
                            <TextField
                                name="telephoneCell"
                                label="Telephone - Cell"
                                fullWidth
                                value={formValues.telephoneCell}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="cableDishInternet"
                                label="Cable, Dish, and/Internet"
                                fullWidth
                                value={formValues.cableDishInternet}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="realEstateTaxes"
                                label="Real Estate Taxes"
                                fullWidth
                                value={formValues.realEstateTaxes}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="insuranceHouse"
                                label="Insurance - House"
                                fullWidth
                                value={formValues.insuranceHouse}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="loanPayment"
                                label="Loan Payment"
                                fullWidth
                                value={formValues.loanPayment}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
                            <TextField
                                name="loanPaymentCar"
                                label="Loan Payment Car"
                                fullWidth
                                value={formValues.loanPaymentCar}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}
                            />
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
