import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import SideNav from '../Nav/SideNav';
import ProgressBar from '../ProgressBar/ProgressBar';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

function PersonalSavings() {
    const dispatch = useDispatch();


    const open = useSelector(store => store.sideNav);


    const budgetId = useParams();
    const finalBudget = useSelector((store) => store.finalBudget);
    const expense = useSelector((store) => store.expense);
    const status = useSelector((store) => store.status);
    const [formValues, setFormValues] = useState({
        personalAllowance: '',
        emergencySavings: '',
        retirement: '',
        investments: '',
        othersavings: ''
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
            personalAllowance: getExpenseAmount('personalAllowance'),
            emergencySavings: getExpenseAmount('emergencySavings'),
            retirement: getExpenseAmount('retirement'),
            investments: getExpenseAmount('investments'),
            othersavings: getExpenseAmount('othersavings')
        };
        setFormValues(newFormValues);
    };

    const [userEntry, setUserEntry] = useState([
        {
            id: getExpenseId('personalAllowance'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('personalAllowance') || "0",
            expense_name: "personalAllowance",
            type: "personal committed"
        },
        {
            id: getExpenseId('emergencySavings'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('emergencySavings') || "0",
            expense_name: "emergencySavings",
            type: "personal committed"
        },
        {
            id: getExpenseId('retirement'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('retirement') || "0",
            expense_name: "retirement",
            type: "personal committed"
        },
        {
            id: getExpenseId('investments'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('investments') || "0",
            expense_name: "investments",
            type: "personal committed"
        },
        {
            id: getExpenseId('othersavings'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('othersavings') || "0",
            expense_name: "othersavings",
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
            step: 'personalsavings'
        }

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
        dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
    };

    const handleEdit = () => {
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const isStartPlanCompleted = status.find(s => s.step === 'personalsavings')?.completed;

    return (
        <Main open={open}>
            <Container maxWidth="md" style={{ padding: 24, marginTop: 32 }}>
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} align="center" gutterBottom>
                        Personal Expenses
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        One of the ways to better manage your personal spending is to give yourself an allowance every month to spend on yourself. 
                        If you learn to stay within the limit you have set, you can greatly decrease the leaks in your bank account. 
                        In addition, planning for emergencies and stashing away cash into a savings account every month can help eliminate the pain of unexpected expenses that may drain the bank account.
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        Finally, your pathway to financial success is to invest in your future. Make it a budget item, not a hope.
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
                                <TextField name="othersavings"
                                label="Other Savings"
                                fullWidth
                                value={formValues.othersavings}
                                onChange={handleInputChange}
                                sx={{ marginBottom: 2 }}/>
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
                    <ProgressBar back={'fundamentalexpenses'} next={'variableexpenses'} value={18} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>
    );
}

export default PersonalSavings;