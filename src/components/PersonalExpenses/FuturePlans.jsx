import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProgressBar from '../ProgressBar/ProgressBar';
import Main from '../Main/Main';
import { useSelector } from 'react-redux';
import Footer from '../Footer/Footer';

export default function FuturePlans() {
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const open = useSelector(s=>s.sideNav);

    const handleAddExpense = () => {
        if (!expenseName || !amount) return;
        // Remove any non-numeric characters except for a decimal point and a minus sign
        const sanitizedAmount = amount.replace(/[^\d.-]/g, '');
        setExpenses([...expenses, { name: expenseName, amount: parseFloat(sanitizedAmount).toFixed(2), startDate: startDate.format('MM/DD/YYYY'), endDate: endDate.format('MM/DD/YYYY'), monthsToSave: endDate.diff(startDate, 'months')}]);
        setExpenseName('');
        setStartDate(null);
        setEndDate(null);
        setAmount('');
    };

    const handleDeleteExpense = (index) => {
        const newExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(newExpenses);
    };

    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({ type: 'ADD_FUTURE_PLAN', payload: expenses });
    };

    return (
        <Main open={open}>
            <Container sx={{ paddingTop: '64px' }}> {/* Adjust this value based on the height of your nav bar */}
                <Typography variant="h4" gutterBottom>
                    Future Plans
                </Typography>
                <Typography variant="body1" gutterBottom>
                    If you have any future plans that you’d like to account for. Now is the time to put as many of them into your budget as you’d like. These could be many things like trips, etc., etc...</Typography>
                <TextField label="Name of Plan" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                <DatePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                <DatePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                <TextField label="Amount to Save" value={amount} onChange={(e) => setAmount(e.target.value)} />
                <Button onClick={handleAddExpense}>Add Plan</Button>

                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name of Plan</TableCell>
                            <TableCell>Todays Date</TableCell>
                            <TableCell>End Date</TableCell>
                            <TableCell>Months to Save</TableCell>
                            <TableCell>Total Amount</TableCell>
                            <TableCell>Delete</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {expenses.map((expense, index) => (
                            <TableRow key={index}>
                                <TableCell>{expense.name}</TableCell>
                                <TableCell>{`${expense.startDate}`}</TableCell>
                                <TableCell>{`${expense.endDate}`}</TableCell>
                                <TableCell>{`${expense.monthsToSave}`}</TableCell>
                                <TableCell>{`$${expense.amount}`}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteExpense(index)}>Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <ProgressBar next={'otherexpenses'} back={'variableexpenses'} value={60} />
                <Footer/>
            </Container>


        </Main>
        
    );
}
