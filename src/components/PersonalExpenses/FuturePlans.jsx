import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';



export default function FuturePlans() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const futurePlans = useSelector((store) => store.futurePlans);
    console.log('Future Plans reducer', futurePlans);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [expenses, setExpenses] = useState([]);

    const [userEntry, setUserEntry] = useState([]);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);


    const handleAddExpense = () => {
        if (!expenseName || !amount) return;
        // Remove any non-numeric characters except for a decimal point and a minus sign
        const sanitizedAmount = amount.replace(/[^\d.-]/g, '');
        setExpenses([...expenses, { name: expenseName, amount: parseFloat(sanitizedAmount).toFixed(2), startDate: startDate.format('MM/DD/YYYY'), endDate: endDate.format('MM/DD/YYYY'), monthsToSave: endDate.diff(startDate, 'months')}]);

        let newStart = startDate.format('MM/DD/YYYY');
        let newEnd = endDate.format('MM/DD/YYYY');
        let newAmmount = parseFloat(sanitizedAmount).toFixed(2);
        const tableData = {
            budget_id: budgetId.budgetId,
            name: expenseName,
            start_date: newStart,
            end_date: newEnd,
            savings_needed: newAmmount
        };
        setUserEntry(...userEntry, tableData);
        setExpenseName('');
        setStartDate(null);
        setEndDate(null);
        setAmount('');
    };

    const handleDeleteExpense = (index) => {
        const newExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(newExpenses);

        const newUserEntry = userEntry.filter((_, i) => i !== index);
        setUserEntry(newUserEntry);
    };
    
console.log('user entry',userEntry);
    const handleSubmit = (event) => {
        event.preventDefault()

        dispatch({ type: 'ADD_FUTURE_PLAN', payload: userEntry });
    };

    return (
        <Container sx={{ paddingTop: '64px' }}> {/* Adjust this value based on the height of your nav bar */}
            <Typography variant="h4" gutterBottom>
                Future Plans
            </Typography>
            <Typography variant="body1" gutterBottom>
                If you have any future plans that you’d like to account for. Now is the time to put as many of them into your budget as you’d like. These could be many things like trips, etc.</Typography>
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
                    {futurePlans.map((plan, index) => (
                        <TableRow key={plan.id}>
                            <TableCell>{plan.name}</TableCell>
                            <TableCell>{`${plan.start_date}`}</TableCell>
                            <TableCell>{`${plan.end_date}`}</TableCell>
                            <TableCell>{`${moment(plan.end_date).diff(moment(plan.start_date), 'months')}`}</TableCell>
                            <TableCell>{`$${plan.savings_needed}`}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteExpense(index)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box>
            {formSubmitted ? (
                            <Button type='button' onClick={handleEdit}>
                                Edit
                            </Button>
                        ) : (
                            <Button type='button' onClick={() => handleSubmit(event)}>
                                Submit
                            </Button>
                        )}
            </Box>
            <ProgressBar next={'otherexpenses'} back={'variableexpenses'} value={30} budgetId={budgetId}/>
        </Container>
    );
}
