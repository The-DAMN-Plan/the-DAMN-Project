import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';

export default function OtherBusinessExpenses() {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);
    const [budgetId] = useParams();
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    // const [expenses, setExpenses] = useState([]);
    const [userEntry, setUserEntry] = useState([]);

    // const handleAddExpense = () => {
    //     if (!expenseName || !amount) return;
    //     // Remove any non-numeric characters except for a decimal point and a minus sign
    //     const sanitizedAmount = amount.replace(/[^\d.-]/g, '');
    //     setExpenses([...expenses, { name: expenseName, amount: parseFloat(sanitizedAmount).toFixed(2) }]);
    //     setExpenseName('');
    //     setAmount('');

    //     const formData = {
    //         budget_id: budgetObj.id,
    //         type: 'business other',
    //         expense_name: expenseName,
    //         expense_amount: sanitizedAmount 
    //     };
    //     setUserEntry([...userEntry, formData]);
    // };
    console.log(userEntry);

    const handleSubmit = (event) => {
        event.preventDefault()
        
        if (!expenseName || !amount) return;
        // Remove any non-numeric characters except for a decimal point and a minus sign
        const sanitizedAmount = amount.replace(/[^\d.-]/g, '');
        setExpenses([{ name: expenseName, amount: parseFloat(sanitizedAmount).toFixed(2) }]);
        setExpenseName('');
        setAmount('');

        const formData = {
            budget_id: budgetObj.id,
            type: 'business other',
            expense_name: expenseName,
            expense_amount: sanitizedAmount 
        };
        setUserEntry([...userEntry, formData]);

        dispatch({ type: 'ADD_BUSINESS_EXPENSE', payload: userEntry });
    };

    const handleDeleteExpense = (index) => {
        const newExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(newExpenses);

        const newUserEntry = userEntry.filter((_, i) => i !== index);
        setUserEntry(newUserEntry);
    };

    return (
        <Container sx={{ paddingTop: '64px' }}> {/* Adjust this value based on the height of your nav bar */}
            <Typography variant="h4" gutterBottom>
                Other Business Expenses
            </Typography>
            <Typography variant="body1" gutterBottom>
                Enter any additional business expenses you have here. You can add as many as you need.
            </Typography>
            <TextField label="Name of Expense" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
            <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Button onClick={(event)=>handleSubmit(event)}>Submit</Button>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name of Expense</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Delete</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {expenses.map((expense, index) => (
                        <TableRow key={index}>
                            <TableCell>{expense.name}</TableCell>
                            <TableCell>{`$${expense.amount}`}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteExpense(index)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <ProgressBar back={''} next={''} value={5}/>
        </Container>
    );
}