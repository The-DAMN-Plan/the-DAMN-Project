import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import SideNav from '../Nav/SideNav';
import ProgressBar from '../ProgressBar/ProgressBar';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

function PBpage2() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const finalBudget = useSelector((store) => store.finalBudget);
    const expense = useSelector((store) => store.expense);
    const status = useSelector((store) => store.status);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const open = useSelector(store => store.sideNav);
    const [formValues, setFormValues] = useState({
        realEstateTax: '',
        carInsurance: '',
        houseInsurance: '',
        creditCard: '',
        loanPayments: ''
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
            realEstateTax: getExpenseAmount('realEstateTax'),
            carInsurance: getExpenseAmount('carInsurance'),
            houseInsurance: getExpenseAmount('houseInsurance'),
            creditCard: getExpenseAmount('creditCard'),
            loanPayments: getExpenseAmount('loanPayments')
        };
        setFormValues(newFormValues);
    };

    const [userEntry, setUserEntry] = useState([
        {
            id: getExpenseId('realEstateTax'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('realEstateTax') || "0",
            expense_name: "realEstateTax",
            type: "personal committed"
        },
        {
            id: getExpenseId('carInsurance'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('carInsurance') || "0",
            expense_name: "carInsurance",
            type: "personal committed"
        },
        {
            id: getExpenseId('houseInsurance'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('houseInsurance') || "0",
            expense_name: "houseInsurance",
            type: "personal committed"
        },
        {
            id: getExpenseId('creditCard'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('creditCard') || "0",
            expense_name: "creditCard",
            type: "personal committed"
        },
        {
            id: getExpenseId('loanPayments'),
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('loanPayments') || "0",
            expense_name: "loanPayments",
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
            step: 'fundamentalexpenses'
        }

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
        dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
    };

    const handleEdit = () => {
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const isStartPlanCompleted = status.find(s => s.step === 'fundamentalexpenses')?.completed;

    return (
        <Main open={open}>
            <Container maxWidth="md" style={{ padding: 24, marginTop: 32 }}>
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} align="center" gutterBottom>
                        Personal Expenses
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        We recognize that some of these expenses are paid annually. If so, divide the annual cost by 12 to get your monthly “bill” payment.
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} md={6}>
                                <TextField name="realEstateTax"
                                    label="Real Estate Taxes"
                                    fullWidth
                                    value={formValues.realEstateTax}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="carInsurance"
                                    label="Car Insurance"
                                    fullWidth
                                    value={formValues.carInsurance}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="houseInsurance"
                                    label="Home Insurance"
                                    fullWidth
                                    value={formValues.houseInsurance}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <TextField name="creditCard"
                                    label="All Credit Card Payments"
                                    fullWidth
                                    value={formValues.creditCard}
                                    onChange={handleInputChange}
                                    sx={{ marginBottom: 2 }} />
                                <TextField name="loanPayments"
                                    label="All Loan Payments"
                                    fullWidth
                                    value={formValues.loanPayments}
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

                    <ProgressBar back={'startplan'} next={'personalsavings'} value={12} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>
    );
}

export default PBpage2;