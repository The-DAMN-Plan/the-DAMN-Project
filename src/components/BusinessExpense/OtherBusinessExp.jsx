import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Currency from '../Shared/Currency';


function OtherBusinessExp() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const expense = useSelector((store) => store.expense);
    const [formSubmitted, setFormSubmitted] = useState(false);
    const open = useSelector(store=>store.sideNav);
    const [expenseName, setExpenseName] = useState('');
    const [amount, setAmount] = useState('');
    const [expenses, setExpenses] = useState([]);
    const [userEntry, setUserEntry] = useState([]);

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

        const formData = {
            budget_id: budgetId.budgetId,
            type: 'business other',
            expense_name: expenseName,
            expense_amount: sanitizedAmount 
        };
        setUserEntry([...userEntry, formData]);
    };

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

    const handleDeleteFromDB = (expenseId) => {
        const budgetObjId = budgetId.budgetId;
        dispatch({ type: 'DELETE_EXPENSE', payload: { expenseId, budgetObjId } });
    };
    
    const filteredExpenses = expense.filter(item => item.type === 'business other');
    

    return (
        <Main open={open}>
            <Container sx={{ paddingTop: '64px' }}> {/* Adjust this value based on the height of your nav bar */}
            <Typography variant="h4" gutterBottom>
                Other Business Expenses
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
                            <TableCell>
                                <Currency  value={expense.amount} />
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteExpense(index)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    {filteredExpenses?.map((expense) => (
                        <TableRow key={expense.id}>
                            <TableCell>{expense.expense_name}</TableCell>
                            <TableCell>
                                <Currency  value={Number(expense.expense_amount)} />
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleDeleteFromDB(expense.id)}>Delete</Button>
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
                                Save
                            </Button>
                        )}
            </Box>
            <ProgressBar back={'hrpagey2'} next={'breakeven'} value={95} budgetId={budgetId} />
        </Container>
        <Footer/>
        </Main>
    );
}

export default OtherBusinessExp;