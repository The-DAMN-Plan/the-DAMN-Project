import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';

function OtherExpenses() {
    const dispatch = useDispatch();
    const budget = useSelector((store) => store.budget);
    const budgetObj = budget[0];
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [userEntry, setUserEntry] = useState([]);

    const handleAddExpense = () => {
        if (!expenseName || !amount) return;
        // Remove any non-numeric characters except for a decimal point and a minus sign
        const sanitizedAmount = amount.replace(/[^\d.-]/g, '');
        setExpenses([...expenses, { name: expenseName, amount: parseFloat(sanitizedAmount).toFixed(2) }]);
        setExpenseName('');
        setAmount('');

        const formData = {
            budget_id: budgetObj.id,
            type: 'personal other',
            expense_name: expenseName,
            expense_amount: sanitizedAmount 
        };
        setUserEntry([...userEntry, formData]);
    };
    console.log(userEntry);

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userEntry });
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
                Other Expenses
            </Typography>
            <Typography variant="body1" gutterBottom>
                Enter any additional expenses you have here. You can add as many as you need.
            </Typography>
            <TextField label="Name of Expense" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
            <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <Button onClick={handleAddExpense}>Submit</Button>

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
            <ProgressBar back={'futureplans'} next={'valuepay'} value={30} submit={handleSubmit}/>
        </Container>
    );
}

export default OtherExpenses;
