import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../Main/Main';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';



function FuturePlans() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const futurePlans = useSelector((store) => store.futurePlans);
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [expenses, setExpenses] = useState([]);
    const [userEntry, setUserEntry] = useState([]);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    const open = useSelector(s => s.sideNav);

    const handleAddExpense = () => {
        if (!expenseName || !amount) return;
        // Remove any non-numeric characters except for a decimal point and a minus sign
        const sanitizedAmount = amount.replace(/[^\d.-]/g, '');
        setExpenses([...expenses, { name: expenseName, amount: parseFloat(sanitizedAmount).toFixed(2), startDate: startDate.format('MM/DD/YYYY'), endDate: endDate.format('MM/DD/YYYY'), monthsToSave: endDate.diff(startDate, 'months') }]);

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

        dispatch({ type: 'ADD_FUTURE_PLAN', payload: tableData });

        setExpenseName('');
        setStartDate(null);
        setEndDate(null);
        setAmount('');
    };

    // Deletes an future plan from the ta ble before it's added to the DB
    const handleDeleteExpense = (index) => {
        const newExpenses = expenses.filter((_, i) => i !== index);
        setExpenses(newExpenses);

        const newUserEntry = userEntry.filter((_, i) => i !== index);
        setUserEntry(newUserEntry);
    };

    // Deletes a future plan that's already been added to the DB
    const handleDeleteFromDB = (futurePlanId) => {
        const budgetObjId = budgetId.budgetId;
        dispatch({ type: 'DELETE_FUTURE_PLAN', payload: { futurePlanId, budgetObjId } });
    };

    return (
        <Main open={open}>
            <Container sx={{ paddingTop: '64px' }} > {/* Adjust this value based on the height of your nav bar */}
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} gutterBottom textAlign={'center'}>
                        Future Plans
                    </Typography>
                    <Typography variant="body1" gutterBottom textAlign={'center'}>
                        If you have any future plans that you’d like to account for. Now is the time to put as many of them into your budget as you’d like. These could be many things like trips, etc.</Typography>
                    <Grid container justifyContent={'center'}>
                        <Grid display={'flex'} alignItems={'center'}>
                            <TextField label="Name of Plan" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                            <DatePicker value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                            <DatePicker value={endDate} onChange={(newValue) => setEndDate(newValue)} />
                            <TextField label="Amount to Save" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <Button variant='contained' onClick={handleAddExpense}>Add Plan</Button>
                        </Grid>
                    </Grid>
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
                            {futurePlans?.map((plan, index) => (
                                <TableRow key={plan.id}>
                                    <TableCell>{plan.name}</TableCell>
                                    <TableCell>{`${plan.start_date}`}</TableCell>
                                    <TableCell>{`${plan.end_date}`}</TableCell>
                                    <TableCell>{`${moment(plan.end_date).diff(moment(plan.start_date), 'months')}`}</TableCell>
                                    <TableCell>{`$${plan.savings_needed}`}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleDeleteFromDB(plan.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ProgressBar next={'otherexpenses'} back={'variableexpenses'} value={30} budgetId={budgetId} />
                </Paper>
            </Container>
        </Main>
    )
}

export default FuturePlans;
