import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function BusinessExpense(params) {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);
    const budgetObj = budget[0];
    const budgetId = useParams();

    //default values for each input start at 0 incase user does not input anything 
    const [userEntry, setUserEntry] = useState([
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "accountingSupport",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "insuranceGeneral",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "insuranceHealthLifeDisability",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "legal",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "coaching",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "travelLodging",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "clientTravelMeals",
            type: "business expense"
        },
    ])

    const [formValues, setFormValues] = useState({
        accountingSupport: '',
        insuranceGeneral: '',
        insuranceHealthLifeDisability: '',
        legal: '',
        coaching: '',
        travelLodging: '',
        clientTravelMeals: ''
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
                type: 'business expense',
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


    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(userEntry);
        
        dispatch({ type: 'ADD_BUSINESS_EXPENSE', payload: userEntry });
        history.push('businessexpensepage2');
    };
    return(
        <Container maxWidth="md">
            <Paper elevation={3} style={{ padding: 24, marginTop: 32 }}>
                <Typography variant="h4" align="center" gutterBottom>
                    Business Expense 
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                    Fundamental Business Expenses
                </Typography>
                

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <TextField name="accountingSupport" label="Accounting Support" fullWidth value={formValues.accountingSupport} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="insuranceGeneral" label="Insurance General"  fullWidth value={formValues.insuranceGeneral} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name='insuranceHealthLifeDisability' label="Insurance - Health, Life & Disability" defaultValue={0}  fullWidth value={formValues.insuranceHealthLifeDisability} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="legal" label="Legal or Other Professional Support"  fullWidth value={formValues.legal} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField name="coaching" label="Coaching & Professional Development"  fullWidth value={formValues.coaching} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="travelLodging" label="Travel/Lodging" fullWidth value={formValues.travelLodging} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="clientTravelMeals" label="Client/Travel Meals"  fullWidth value={formValues.clientTravelMeals} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                    </Grid>
                </form>
                <ProgressBar back={'overview'} next={'businessexpensepage2'} value={60} budgetId={budgetId}/>
            </Paper>
        </Container>
    )
    
}