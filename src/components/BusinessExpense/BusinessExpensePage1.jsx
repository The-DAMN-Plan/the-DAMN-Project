import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function BusinessExpense(params) {
    const dispatch = useDispatch();
    const open = useSelector(store => store.sideNav);
    const status = useSelector((store) => store.status);
    const expense = useSelector((store) => store.expense);
    const budgetId = useParams();

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    useEffect(() => {
        handleExpense();
    }, [expense]);

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
            accountingSupport: getExpenseAmount('accountingSupport'),
            insuranceGeneral: getExpenseAmount('insuranceGeneral'),
            insuranceHealthLifeDisability: getExpenseAmount('insuranceHealthLifeDisability'),
            legal: getExpenseAmount('legal'),
            coaching: getExpenseAmount('coaching'),
            travelLodging: getExpenseAmount('travelLodging'),
            clientTravelMeals: getExpenseAmount('clientTravelMeals')
        };
        setFormValues(newFormValues);
    };

    //default values for each input start at 0 incase user does not input anything 
    const [userEntry, setUserEntry] = useState([
        {
            expense_id: getExpenseId('accountingSupport'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('accountingSupport') || "0",
            expense_name: "accountingSupport",
            type: "business expense"
        },
        {
            expense_id: getExpenseId('insuranceGeneral'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('insuranceGeneral') || "0",
            expense_name: "insuranceGeneral",
            type: "business expense"
        },
        {
            expense_id: getExpenseId('insuranceHealthLifeDisability'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('insuranceHealthLifeDisability') || "0",
            expense_name: "insuranceHealthLifeDisability",
            type: "business expense"
        },
        {
            expense_id: getExpenseId('legal'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('legal') || "0",
            expense_name: "legal",
            type: "business expense"
        },
        {
            expense_id: getExpenseId('coaching'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('coaching') || "0",
            expense_name: "coaching",
            type: "business expense"
        },
        {
            expense_id: getExpenseId('travelLodging'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('travelLodging') || "0",
            expense_name: "travelLodging",
            type: "business expense"
        },
        {
            expense_id: getExpenseId('clientTravelMeals'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('clientTravelMeals') || "0",
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
                budget_id: budgetId.budgetId,
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
        event.preventDefault();
        const updateObj = {
            completed: true,
            budget_id: Number(budgetId.budgetId),
            step: 'businessexpensepage1'
        }

        console.log(userEntry);
        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
        dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
    };

    const handleEdit = () => {
        console.log(userEntry);
        console.log('expense: ',expense);
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
       
    }

    const isStartPlanCompleted = status.find(s => s.step === 'businessexpensepage1')?.completed;

    return (
        <Main open={open}>
            <Container maxWidth="md">
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" sx={{ mb: 4 }} color={'primary'} align="center" gutterBottom>
                    Business Operating Expenses Page 1
                    </Typography>
                    <Typography variant="body1" marginTop={'24px'} textAlign={'center'} marginBottom={'24px'} >
                    Enter your current Business Operating Expenses. If you don’t see an expense category that your business accrues, please note there is an “Other Business Expense page to add those line items.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <TextField name="accountingSupport" label="Accounting Support" fullWidth value={formValues.accountingSupport} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="insuranceGeneral" label="Insurance General" fullWidth value={formValues.insuranceGeneral} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name='insuranceHealthLifeDisability' label="Insurance - Health, Life & Disability" fullWidth value={formValues.insuranceHealthLifeDisability} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="legal" label="Legal or Other Professional Support" fullWidth value={formValues.legal} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="coaching" label="Coaching & Professional Development" fullWidth value={formValues.coaching} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="travelLodging" label="Travel/Lodging" fullWidth value={formValues.travelLodging} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                                <TextField name="clientTravelMeals" label="Client/Travel Meals" fullWidth value={formValues.clientTravelMeals} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
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
                    </form>
                    <ProgressBar back={'overview'} next={'businessexpensepage2'} value={60} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>
    )

}