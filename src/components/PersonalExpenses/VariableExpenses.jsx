import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

function VariableExpenses() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const expense = useSelector((store) => store.expense);
    const status = useSelector((store) => store.status);
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

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    useEffect(() => {
        handleExpense();
    }, [expense]); // Call handleExpense whenever expense changes

    const handleExpense = () => {
        const newFormValues = {
            food: getExpenseAmount('food'),
            clothing: getExpenseAmount('clothing'),
            personalCare: getExpenseAmount('personalCare'),
            recreation: getExpenseAmount('recreation'),
            gifts: getExpenseAmount('gifts'),
            gas: getExpenseAmount('gas'),
            carRepairs: getExpenseAmount('carRepairs'),
            homeMaintenance: getExpenseAmount('homeMaintenance')
        };
        setFormValues(newFormValues);
    };

    const getExpenseAmount = (expenseName) => {
        const expenseItem = expense.find(item => item.expense_name === expenseName);
        return expenseItem ? expenseItem.expense_amount : '';
    };


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
                budget_id: Number(budgetId.budgetId),
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

    const handleSubmit = (event) => {
        event.preventDefault();
        
        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });

        const updateObj = {
            completed: true,
            budget_id: Number(budgetId.budgetId),
            step: 'variableexpenses'
        }

        dispatch({ type: 'UPDATE_STATUS', payload: updateObj }) // Will need to be set up later to post the completed step to the status table
    };

    const handleEdit = () => {
        console.log('Update', userEntry);
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const isStartPlanCompleted = status.find(s => s.step === 'startplan')?.completed;

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
                            {isStartPlanCompleted ? (
                                <Button type='button' onClick={handleEdit}>
                                    Update
                                </Button>
                                ) : (
                                <Button type='submit'>
                                    Save
                                </Button>
                            )}
                        </Grid>
                    </Grid>
                    <ProgressBar next={'futureplans'} back={'personalsavings'} value={24} budgetId={budgetId}/>
                </form>
            </Paper>
        </Container>
    );
}

export default VariableExpenses;
