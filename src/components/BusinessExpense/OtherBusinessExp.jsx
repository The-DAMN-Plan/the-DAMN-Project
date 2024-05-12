import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Grid from '@mui/material/Unstable_Grid2';
import EditDialog from './EditDialog';


function OtherBusinessExp() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const expense = useSelector((store) => store.expense);
    const open = useSelector(store => store.sideNav);
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    const handleAddExpense = () => {
        if (!expenseName || !amount) return;
        // Remove any non-numeric characters except for a decimal point and a minus sign
        const sanitizedAmount = amount.replace(/[^\d.-]/g, '');
        setExpenses([...expenses, { name: expenseName, amount: parseFloat(sanitizedAmount).toFixed(2) }]);
        setExpenseName('');
        setAmount('');

        const formData = [{
            budget_id: budgetId.budgetId,
            type: 'business other',
            expense_name: expenseName,
            expense_amount: sanitizedAmount
        }];

        console.log('business other expense',formData);

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: formData });

        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });

    };

    const handleDeleteFromDB = (expenseId) => {
        const budgetObjId = budgetId.budgetId;
        dispatch({ type: 'DELETE_EXPENSE', payload: { expenseId, budgetObjId } });
    };

    const filteredExpenses = expense.filter(item => item.type === 'business other');

    return (
        <Main open={open}>
            <Container sx={{ paddingTop: '64px' }}> {/* Adjust this value based on the height of your nav bar */}
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} textAlign={'center'} gutterBottom>
                        Other Business Expenses
                    </Typography>
                    <Typography variant="body1" textAlign={'center'} gutterBottom>
                    If you have items on your budget that have not been mentioned, enter any additional items here.                    </Typography>
                    <Grid container justifyContent={'center'}>
                        <Grid display={'flex'} alignItems={'center'}>
                            <TextField label="Name of Expense" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                            <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            <Button variant='contained' onClick={handleAddExpense}>Submit</Button>
                        </Grid>
                    </Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name of Expense</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredExpenses?.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell>{expense.expense_name}</TableCell>
                                    <TableCell>
                                        <Currency value={Number(expense.expense_amount)} />
                                    </TableCell>
                                    <TableCell>
                                        <EditDialog budget_id={budgetId.budgetId} expense_id={expense.id} action='UPDATE_EXPENSE'>
                                            <Grid container spacing={2} alignItems="center" justifyContent='center' >
                                                <Grid>
                                                    <TextField name="expense_name" label="Name of Expense"  defaultValue={expense.expense_name}/>
                                                </Grid>
                                                <Grid>
                                                    <TextField name="expense_amount" label="Amount" defaultValue={expense.expense_amount}/>
                                                </Grid>
                                            </Grid>
                                        </EditDialog>
                                    </TableCell>
                                    <TableCell>
                                        <Button variant='contained' color='secondary' onClick={() => handleDeleteFromDB(expense.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <ProgressBar back={'hrpagey1'} next={'breakeven'} value={95} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>
    );
}

export default OtherBusinessExp;