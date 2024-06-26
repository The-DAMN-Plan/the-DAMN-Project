import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import SideNav from '../Nav/SideNav';
import ProgressBar from '../ProgressBar/ProgressBar';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function StartPlan() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const open = useSelector(store => store.sideNav);
    const expense = useSelector((store) => store.expense);
    const status = useSelector((store) => store.status);
    const [formValues, setFormValues] = useState({
        rentOrMortgage: '',
        electric: '',
        heat: '',
        water: '',
        internet: '',
        telephone: '',
        childcare: '',
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
            rentOrMortgage: getExpenseAmount('rentOrMortgage'),
            electric: getExpenseAmount('electric'),
            heat: getExpenseAmount('heat'),
            water: getExpenseAmount('water'),
            internet: getExpenseAmount('internet'),
            telephone: getExpenseAmount('telephone'),
            childcare: getExpenseAmount('childcare'),
        };
        setFormValues(newFormValues);
        setUserEntry([
            {
                id: getExpenseId('rentOrMortgage'),
                budget_id: budgetId.budgetId,
                expense_amount: getExpenseAmount('rentOrMortgage') || "0",
                expense_name: "rentOrMortgage",
                type: "personal committed"
            },
            {
                id: getExpenseId('electric'),
                budget_id: budgetId.budgetId,
                expense_amount: getExpenseAmount('electric') || "0",
                expense_name: "electric",
                type: "personal committed"
            },
            {
                id: getExpenseId('heat'),
                budget_id: budgetId.budgetId,
                expense_amount: getExpenseAmount('heat') || "0",
                expense_name: "heat",
                type: "personal committed"
            },
            {
                id: getExpenseId('water'),
                budget_id: budgetId.budgetId,
                expense_amount: getExpenseAmount('water') || "0",
                expense_name: "water",
                type: "personal committed"
            },
            {
                id: getExpenseId('internet'),
                budget_id: budgetId.budgetId,
                expense_amount: getExpenseAmount('internet') || "0",
                expense_name: "internet",
                type: "personal committed"
            },
            {
                id: getExpenseId('telephone'),
                budget_id: budgetId.budgetId,
                expense_amount: getExpenseAmount('telephone') || "0",
                expense_name: "telephone",
                type: "personal committed"
            },
            {
                id: getExpenseId('childcare'),
                budget_id: budgetId.budgetId,
                expense_amount: getExpenseAmount('childcare') || "0",
                expense_name: "childcare",
                type: "personal committed"
            }
        ])
    };
    
    const [userEntry, setUserEntry] = useState([
        {
            id: getExpenseId('rentOrMortgage'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('rentOrMortgage') || "0",
            expense_name: "rentOrMortgage",
            type: "personal committed"
        },
        {
            id: getExpenseId('electric'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('electric') || "0",
            expense_name: "electric",
            type: "personal committed"
        },
        {
            id: getExpenseId('heat'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('heat') || "0",
            expense_name: "heat",
            type: "personal committed"
        },
        {
            id: getExpenseId('water'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('water') || "0",
            expense_name: "water",
            type: "personal committed"
        },
        {
            id: getExpenseId('internet'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('internet') || "0",
            expense_name: "internet",
            type: "personal committed"
        },
        {
            id: getExpenseId('telephone'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('telephone') || "0",
            expense_name: "telephone",
            type: "personal committed"
        },
        {
            id: getExpenseId('childcare'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('childcare') || "0",
            expense_name: "childcare",
            type: "personal committed"
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const updateObj = {
            completed: true,
            budget_id: Number(budgetId.budgetId),
            step: 'startplan'
        }

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
        dispatch({ type: 'UPDATE_STATUS', payload: updateObj }) // Will need to be set up later to post the completed step to the status table
    };

    const handleEdit = () => {
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const openVideo = () => {
        window.open('https://youtu.be/Aggc8EiMZBY', '_blank');
    };


    const isStartPlanCompleted = status.find(s => s.step === 'startplan')?.completed;

    return (
        <Main open={open}>
            <Container maxWidth="md" style={{ padding: 24, marginTop: 32 }}>
                <Paper sx={{p:3}}>

                    <Typography variant="h3" color={'primary'} align="center" gutterBottom>
                        Personal Expenses
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        Meeting your customer’s wants and needs at a profit is The DAMN Plan which means paying yourself at a minimum what you need to cover your monthly expenses.
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        In this section, you will enter your Personal Expenses. These are the bills that must be paid every month. 
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <TextField name="rentOrMortgage"
                                    label="Rent or Mortgage"
                                    fullWidth
                                    value={formValues.rentOrMortgage}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="electric"
                                    label="Electric"
                                    fullWidth
                                    value={formValues.electric}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="heat"
                                    label="Heat"
                                    fullWidth
                                    value={formValues.heat}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="water"
                                    label="Water"
                                    fullWidth
                                    value={formValues.water}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="internet"
                                    label="Internet"
                                    fullWidth
                                    value={formValues.internet}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="telephone"
                                    label="Telephone"
                                    fullWidth
                                    value={formValues.telephone}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="childcare"
                                    label="Childcare"
                                    fullWidth
                                    value={formValues.childcare}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
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
                        <ProgressBar back={`startplan`} next={`fundamentalexpenses`} value={6} budgetId={budgetId} />
                        <Grid container justifyContent="center" style={{ marginTop: 16 }}>
                            <Grid item>
                                <Button variant="contained" color="primary" onClick={openVideo}>
                                    Watch Video
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>

                <Footer />
            </Container>
        </Main >
    );
}

export default StartPlan;
