import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';

function PersonalSavings(props) {
    const [formValues, setFormValues] = useState({
        personalAllowance: '',
        emergencySavings: '',
        retirement: '',
        investments: '',
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
        console.log('Savings Form Values: ', formValues);
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
                    <Box textAlign="center" marginTop={4} display="flex" justifyContent="space-between">
                        <Button variant="outlined" color="secondary">
                            Previous
                        </Button>
                        <Button type="submit" variant="contained" color="primary">
                            Submit
                        </Button>
                        <Button variant="outlined" color="secondary">
                            Next
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default PersonalSavings;
