import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, TextField, Button, Container, Grid, Paper } from '@mui/material';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

export default function BusinessExpense(params) {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);
    const budgetObj = budget[0];
    const [userEntry, setUserEntry] = useState([
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "cellPhones",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "internet",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "printPublish",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "softwareTech",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "officeSupply",
            type: "business expense"
        },
        {
            budget_id: budgetObj.id,
            expense_amount: "0",
            expense_name: "miscellaneous",
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
        console.log(userEntry);
        dispatch({ type: 'ADD_BUSINESS_EXPENSE', payload: userEntry });
    };
    return(
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
                        </Grid>
                    </Grid>
                    <Box textAlign="center" marginTop={4}>
                        <Button type="submit" variant="contained" color="primary" >
                            Next Page
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    )
    
}