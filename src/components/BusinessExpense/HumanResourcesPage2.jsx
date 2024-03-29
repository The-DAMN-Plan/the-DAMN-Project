import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Box, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';

export default function HumanResourcesPage2() {
    const dispatch = useDispatch();
    const history = useHistory();
    const budget = useSelector((store) => store.budget);
    const status = useSelector((store) => store.status);
    const expenses = useSelector((store) => store.expense);
    const budgetId = useParams();
    const open = useSelector((store)=>store.sideNav);

    useEffect(() => {
        dispatch({ type: 'FETCH_BUDGET' });
    }, [dispatch]);

    const [expenseName, setExpenseName] = useState('');
    const [service, setService] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [frequency, setFrequency] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: { expense_name: expenseName, service, frequency, expense_amount: expenseAmount } });

        setExpenseName('');
        setService('');
        setExpenseAmount(0);
        setFrequency(0);
    };

    const isStartPlanCompleted = status.find(s => s.step === 'businessexpensepage2')?.completed;


    const filteredExpenses = expenses.filter(item => item.type === 'business hr');


    return (
        <Main open={open}>
        <Container sx={{ paddingTop: '64px' }}>
            <Typography variant="h4" color={'primary'} gutterBottom>Human Resource Budget Year 2</Typography>
            <Typography variant="subtitle1" gutterBottom>Make determined-decisions about which essential tasks and skills must be outsourced. Analyze the cost / benefit of outsourcing vs. either doing it all yourself or hiring staff. Make determined-decisions about which essential tasks and skills must be outsourced. Analyze the cost / benefit of outsourcing vs. either doing it all yourself or hiring staff. After vetting qualified contractors, enter their business name and service they will provide. </Typography>
            {/* Grid container for input fields */}
            <Grid container spacing={2} alignformValuess="center">
                <Grid formValues xs={12} md={3}>
                    <TextField
                        name="expense_name"
                        label="Name"
                        value={expenseName}
                        onChange={(e) => setExpenseName(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid formValues xs={12} md={3}>
                    <TextField
                        name="service"
                        label="Service"
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid formValues xs={12} md={3}>
                    <TextField
                        name="frequency"
                        label="Units/Hours"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} md={3}>
                    <TextField
                        name="expense_amount"
                        label="Fee"
                        value={expenseAmount}
                        onChange={(e) => setExpenseAmount(e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
                </Grid>
            </Grid>

            <Table>
                <TableHead>
                    {/* Table headers aligned with the input fields */}
                    <TableRow>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Service</TableCell>
                        <TableCell align="right">Hours/Units</TableCell>
                        <TableCell align="right">Fee</TableCell>
                        <TableCell align="right">Weekly Expense</TableCell>
                        <TableCell align="right">Monthly Expense</TableCell>
                        <TableCell align="right"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredExpenses.map((formValues, index) => (
                        <TableRow key={index}>
                            <TableCell>{formValues.expense_name}</TableCell>
                            <TableCell align="right">{formValues.expense_name}</TableCell>
                            <TableCell align="right">{formValues.service}</TableCell>
                            <TableCell align="right">{formValues.frequency}</TableCell>
                            <TableCell align="right"><Currency value={formValues.expense_amount} /></TableCell>
                            <TableCell align="right"><Currency value={formValues.expense_amount * formValues.frequency} /></TableCell>
                            <TableCell align="right"><Currency value={formValues.expense_amount * formValues.frequency * 12} /></TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDelete(index)} variant="contained" color="secondary">Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {isStartPlanCompleted ? (
                                <Button type='button' onClick={handleEdit}>
                                    Update
                                </Button>
                                ) : (
                                <Button type='submit'>
                                    Save
                                </Button>
                            )}
            <ProgressBar back={'hrpagey1'} next={'otherbusiness'} value={90} budgetId={budgetId} />
        </Container>
        <Footer/>
        </Main>
        
    );
}


