import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Main from '../Main/Main';

function VariableExpenses() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const expense = useSelector((store) => store.expense);
    const status = useSelector((store) => store.status);
    const open = useSelector((store) => store.sideNav);
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

    const getExpenseAmount = (expenseName) => {
        const expenseItem = expense.find(item => item.expense_name === expenseName);
        return expenseItem ? expenseItem.expense_amount : '';
    };

    const getExpenseId = (expenseName) => {
        const expenseItem = expense.find(item => item.expense_name === expenseName);
        return expenseItem ? expenseItem.id : '';
    };

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

    const [userEntry, setUserEntry] = useState([
        {
            expense_id: getExpenseId('food'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('food') || "0",
            expense_name: "food",
            type: "personal decision"
        },
        {
            expense_id: getExpenseId('clothing'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('clothing') || "0",
            expense_name: "clothing",
            type: "personal decision"
        },
        {
            expense_id: getExpenseId('personalCare'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('personalCare') || "0",
            expense_name: "personalCare",
            type: "personal decision"
        },
        {
            expense_id: getExpenseId('recreation'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('recreation') || "0",
            expense_name: "recreation",
            type: "personal decision"
        },
        {
            expense_id: getExpenseId('gifts'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('gifts') || "0",
            expense_name: "gifts",
            type: "personal decision"
        },
        {
            expense_id: getExpenseId('gas'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('gas') || "0",
            expense_name: "gas",
            type: "personal decision"
        },
        {
            expense_id: getExpenseId('carRepairs'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('carRepairs') || "0",
            expense_name: "carRepairs",
            type: "personal decision"
        },
        {
            expense_id: getExpenseId('homeMaintenance'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('homeMaintenance') || "0",
            expense_name: "homeMaintenance",
            type: "personal decision"
        }
    ]);


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
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const isStartPlanCompleted = status.find(s => s.step === 'variableexpenses')?.completed;

    return (
        <Main open={open}>
            <Container maxWidth="md">
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} align="center" gutterBottom>
                        Determined-Decisions Expenses
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        In the DAMN Plan, Determined-Decisions are decisions you make that are based on the truth and backed up with your resolve and willingness to act.
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        With that definition in mind, as you enter your expenses you can decide to enter your expenses as they are today or 
                        you can choose to enter your estimated expenses based on your goals and your DAMN Plan for the future.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <TextField name="food" label="Groceries" fullWidth value={formValues.food} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="clothing" label="Clothing" fullWidth value={formValues.clothing} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="personalCare" label="Personal Care" fullWidth value={formValues.personalCare} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="recreation" label="Recreation" fullWidth value={formValues.recreation} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="gifts" label="Gifts" fullWidth value={formValues.gifts} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="gas" label="Gas" fullWidth value={formValues.gas} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="carRepairs" label="Car Repairs" fullWidth value={formValues.carRepairs} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="homeMaintenance" label="Home Maintenance" fullWidth value={formValues.homeMaintenance} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            </Grid>
                            {isStartPlanCompleted ? (
                                <Button variant='outlined' type='button' onClick={handleEdit}>
                                    Update
                                </Button>
                            ) : (
                                <Button variant='contained' type='submit'>
                                    Save
                                </Button>
                            )}
                        </Grid>
                        <ProgressBar next={'futureplans'} back={'personalsavings'} value={24} budgetId={budgetId} />
                    </form>
                </Paper>
            </Container>
        </Main>
    );
}

export default VariableExpenses;
