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
    const history = useHistory();
    const open = useSelector(store=>store.sideNav);
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
            budget_id: budgetId.budgetId,
            expense_amount: "0",
            expense_name: "accountingSupport",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: "0",
            expense_name: "insuranceGeneral",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: "0",
            expense_name: "insuranceHealthLifeDisability",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: "0",
            expense_name: "legal",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: "0",
            expense_name: "coaching",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: "0",
            expense_name: "travelLodging",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
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
        const updateObj = {
            completed: true, 
            budget_id: Number(budgetId.budgetId), 
            step: 'businessexpensepage1'
        }
        
        dispatch({ type: 'ADD_BUSINESS_EXPENSE', payload: userEntry });
        dispatch({type: 'UPDATE_STATUS', payload: updateObj})
    };

    const handleEdit = () => {
        console.log('Update', userEntry);
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const isStartPlanCompleted = status.find(s => s.step === 'businessexpensepage1')?.completed;

    return(
        <Main open={open}>
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
                </form>
                <ProgressBar back={'overview'} next={'businessexpensepage2'} value={60} budgetId={budgetId}/>
            </Paper>
        </Container>
        <Footer/>
        </Main>
    )
    
}