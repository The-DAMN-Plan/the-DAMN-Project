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
import NoData from '../Shared/NoData';


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
                    <Grid spacing={2} container alignItems="center" justifyContent={'center'} sx={{ mt: 5}}>
                            {/* <TextField label="Name of Expense" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                            <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} /> */}
                            <Grid>
                                <TextField label="Name of Expense" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                            </Grid>
                            <Grid>
                                <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </Grid>
                            <Grid>
                                <Button size='large' variant='contained' onClick={handleAddExpense}>Submit</Button>
                            </Grid>
                            
                    </Grid>
                    <Table sx={{ mt: 5, mb: 8 }}>
                        <TableHead>
                            <TableRow>
                                <TableCell align='left'>Name of Expense</TableCell>
                                <TableCell align='left'>Amount</TableCell>
                                <TableCell align='center'>Edit</TableCell>
                                <TableCell align='center'>Delete</TableCell>
                            </TableRow>
                        </TableHead>
                        {filteredExpenses.length === 0 ? <NoData colSpan={4} /> :<TableBody>
                            {filteredExpenses?.map((expense) => (
                                <TableRow key={expense.id}>
                                    <TableCell align='left' >{expense.expense_name}</TableCell>
                                    <TableCell align='left'>
                                        <Currency value={Number(expense.expense_amount)} />
                                    </TableCell>
                                    <TableCell align='center'>
                                        <EditDialog budget_id={budgetId.budgetId} id={expense.id} action='UPDATE_EXPENSE'>
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
                                    <TableCell align='center'>
                                        <Button variant='contained' color='secondary' onClick={() => handleDeleteFromDB(expense.id)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>}
                    </Table>
                    <ProgressBar back={'hrpagey1'} next={'breakeven'} value={95} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>
    );
}

export default OtherBusinessExp;