import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import ProgressBar from '../ProgressBar/ProgressBar';

export default function BusinessExpense(params) {
    const dispatch = useDispatch();
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
            cellPhones: getExpenseAmount('cellPhones'),
            internet: getExpenseAmount('internet'),
            printPublish: getExpenseAmount('printPublish'),
            softwareTech: getExpenseAmount('softwareTech'),
            officeSupply: getExpenseAmount('officeSupply'),
            miscellaneous: getExpenseAmount('miscellaneous')
        };
        setFormValues(newFormValues);
    };

    //default values for each input start at 0 incase user does not input anything 
    const [userEntry, setUserEntry] = useState([
        {
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('cellPhones') || "0",
            expense_name: "cellPhones",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('internet') || "0",
            expense_name: "internet",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('printPublish') || "0",
            expense_name: "printPublish",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('softwareTech') || "0",
            expense_name: "softwareTech",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: getExpenseAmount('officeSupply') || "0",
            expense_name: "officeSupply",
            type: "business expense"
        },
        {
            budget_id: budgetId.budgetId,
            expense_amount: "0",
            expense_name: getExpenseAmount('miscellaneous') || "miscellaneous",
            type: "business expense"
        },
    ])

    const [formValues, setFormValues] = useState({
        cellPhones:'',
        internet: '',
        printPublish: '',
        softwareTech: '',
        officeSupply: '',
        miscellaneous: ''
    });


    const handleInputChange = (event) => {
        const { name, value } = event.target;
    
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
        event.preventDefault()
        const updateObj = {
            completed: true, 
            budget_id: Number(budgetId.budgetId), 
            step: 'businessexpensepage2'
        }
        
        dispatch({ type: 'ADD_BUSINESS_EXPENSE', payload: userEntry });
        dispatch({type: 'UPDATE_STATUS', payload: updateObj})
    };

    const handleEdit = () => {
        console.log('Update', userEntry);
        dispatch({ type: 'UPDATE_EXPENSE', payload: userEntry })
    }

    const isStartPlanCompleted = status.find(s => s.step === 'businessexpensepage2')?.completed;

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
                            <TextField name='cellPhones' label="Cell Phones" fullWidth value={formValues.cellPhones} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="internet" label="Internet & Utilities" fullWidth value={formValues.internet} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="printPublish" label="Printing & Publishing"  fullWidth value={formValues.printPublish} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                        </Grid>
                        <Grid item xs={12} md={6}>
                        <TextField name="softwareTech" label="Software & Technology"  fullWidth value={formValues.softwareTech} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="officeSupply" label="Office Supplies" fullWidth value={formValues.officeSupply} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
                            <TextField name="miscellaneous" label="Miscellaneous"  fullWidth value={formValues.miscellaneous} onChange={handleInputChange} sx={{ marginBottom: 2 }} />
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
                <ProgressBar back={'businessexpensepage1'} next={'marketingy1'} value={66} budgetId={budgetId}/>
            </Paper>
        </Container>
        <Footer/>
        </Main>
    )
}