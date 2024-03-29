import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Container, Grid } from '@mui/material';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import SideNav from '../Nav/SideNav';
import ProgressBar from '../ProgressBar/ProgressBar';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

function PersonalSavings() {
    const dispatch = useDispatch();

    
    const open = useSelector(store=>store.sideNav);


    const budgetId = useParams();
    const finalBudget = useSelector((store) => store.finalBudget);
    const expense = useSelector((store) => store.expense);
    const status = useSelector((store) => store.status);
    const [userEntry, setUserEntry] = useState([]);
    const [formValues, setFormValues] = useState({
        personalAllowance: '',
        emergencySavings: '',
        retirement: '',
        investments: '',
    });

    console.log(formValues);

    console.log('Expense reducer', expense);
    console.log('URL', budgetId);
    console.log('Big budget object', finalBudget);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    useEffect(() => {
        handleExpense();
    }, [expense]); // Call handleExpense whenever expense changes

    const handleExpense = () => {
        const newFormValues = {
            personalAllowance: getExpenseAmount('personalAllowance'),
            emergencySavings: getExpenseAmount('emergencySavings'),
            retirement: getExpenseAmount('retirement'),
            investments: getExpenseAmount('investments')
        };
        setFormValues(newFormValues);
        console.log('Here be new values', newFormValues);
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

    console.log(userEntry);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updateObj = {
            completed: true, 
            budget_id: Number(budgetId.budgetId), 
            step: 'personalsavings'
        }

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
        dispatch({type: 'UPDATE_STATUS', payload: updateObj})
    };

    const handleEdit = () => {
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const isStartPlanCompleted = status.find(s => s.step === 'personalsavings')?.completed;

    return (
        <Main open={open}>
            <Container maxWidth="md" style={{ padding: 24, marginTop: 32 }}>
                <Typography variant="h3" color={'primary'} align="center" gutterBottom>
                    Personal Savings
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                    Take some time to think about the money you want to save for like retirement, spending money, etc.
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} justifyContent="center">
                        <Grid item xs={12} md={6}>
                            <TextField name="personalAllowance"
                                label="Personal Allowance"
                                fullWidth
                                value={formValues.personalAllowance}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }} />
                            <TextField name="emergencySavings"
                                label="Emergency Savings"
                                fullWidth
                                value={formValues.emergencySavings}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField name="retirement"
                                label="Retirement"
                                fullWidth
                                value={formValues.retirement}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }} />
                            <TextField name="investments"
                                label="Investments"
                                fullWidth
                                value={formValues.investments}
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
                </form>
                <ProgressBar back={'fundamentalexpenses'} next={'variableexpenses'} value={18} budgetId={budgetId}/>
            </Container>
            <Footer/>
        </Main>
    );
}

export default PersonalSavings;