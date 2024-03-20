import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import SideNav from '../Nav/SideNav';

function StartPlan({handleShowNav}) {
    const history = useHistory();
    const store = useSelector((store) => store);
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
            <SideNav/>
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
                    <Box textAlign="center" marginTop={4}>
                        <Button type="submit" variant="contained" color="primary" onClick={() => { history.push('/plan2')}}>
                            Next Page
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
}

export default StartPlan;
