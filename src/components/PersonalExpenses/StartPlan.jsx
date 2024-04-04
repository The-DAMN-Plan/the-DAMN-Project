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
    };

    const getExpenseAmount = (expenseName) => {
        const expenseItem = expense.find(item => item.expense_name === expenseName);
        return expenseItem ? expenseItem.expense_amount : '';
    };

    const [userEntry, setUserEntry] = useState([])

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
                        Committed Expenses Page 1
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        Your singular goal in business is to "meet your customer's wants and needs at a profit" and pay yourself!
                    </Typography>
                    <Typography variant="subtitle1" align="center" gutterBottom sx={{ marginBottom: 2 }}>
                        Take some time to think about monthly living expenses. This will help figure out how much your value is.
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
