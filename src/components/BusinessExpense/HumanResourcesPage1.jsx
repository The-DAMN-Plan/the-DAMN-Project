import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Box, Paper
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import EditDialog from './EditDialog';

export default function HumanResourcesPage1() {
    const dispatch = useDispatch();
    const expenses = useSelector((store) => store.expense);
    const budgetId = useParams();
    const open = useSelector((store) => store.sideNav);
    const [expenseName, setExpenseName] = useState('');
    const [service, setService] = useState('');
    const [expenseAmount, setExpenseAmount] = useState(0);
    const [frequency, setFrequency] = useState(0);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);


    const handleSubmit = (event) => {
        event.preventDefault();

        const userInput = [{ expense_name: expenseName, service, frequency, expense_amount: expenseAmount, type: 'business hr',budget_id: Number(budgetId.budgetId) }]

        dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: userInput });
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });

        setExpenseName('');
        setService('');
        setExpenseAmount(0);
        setFrequency(0);
    };

    // function handleSave() {
    //     const updateObj = {
    //         completed: true,
    //         budget_id: Number(budgetId.budgetId),
    //         step: 'hrpagey1'
    //     }
    //     dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
    // }

    function handleDelete(expenseId) {
        const budgetObjId = budgetId.budgetId;
        dispatch({ type: 'DELETE_EXPENSE', payload: { expenseId, budgetObjId } })
    }

    const filteredExpenses = expenses.filter(item => item.type === 'business hr');


    return (
        <Main open={open}>
            <Container >
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} textAlign={'center'} gutterBottom>Human Resource Expense to Resource Expense Budget</Typography>
                    <Typography variant="subtitle1" textAlign={'center'} gutterBottom>Okay! Time for some more determined-decisions! Start by thinking about all the tasks that must be done for your business to run smoothly. Ask yourself, am I the best person for the job? If no, determine your human resources. Ask yourself, can this be outsourced or should I hire staff? Once you’ve made your plan, add those decisions below.</Typography>
                    {/* Grid container for input fields */}
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <Grid container spacing={2} alignformValuess="center" justifyContent={'center'} sx={{ mt: 4 }}>
                            <Grid formValues xs={12} md={3}>
                                <TextField
                                    name="expense_name"
                                    label="Name"
                                    value={expenseName}
                                    onChange={(e) => setExpenseName(e.target.value)}
                                    fullWidth
                                    required
                                />
                            </Grid>
                            <Grid formValues xs={12} md={3}>
                                <TextField
                                    name="service"
                                    label="Service"
                                    value={service}
                                    onChange={(e) => setService(e.target.value)}
                                    fullWidth
                                    required
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
                            <Grid item xs={12} textAlign={'center'} >
                                <Button variant="contained" type='submit' color="primary">Submit</Button>
                            </Grid>
                        </Grid>
                    </form>

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
                            {filteredExpenses?.map((formValues, index) => (
                                <TableRow key={index}>
                                    
                                    <TableCell>{formValues.expense_name}</TableCell>
                                    <TableCell align="right">{formValues.service}</TableCell>
                                    <TableCell align="right">{formValues.frequency}</TableCell>
                                    <TableCell align="right"><Currency value={formValues.expense_amount} /></TableCell>
                                    <TableCell align="right"><Currency value={formValues.expense_amount * formValues.frequency} /></TableCell>
                                    <TableCell align="right"><Currency value={formValues.expense_amount * formValues.frequency * 4.3333333333} /></TableCell>
                                    <TableCell align="center">
                                        <EditDialog budget_id={budgetId.budgetId} expense_id={formValues.id} action='UPDATE_EXPENSE'>
                                            <Grid container spacing={2} alignformValuess="center" justifyContent={'center'} sx={{ mt: 4 }}>
                                                <Grid formValues xs={12} md={5}>
                                                    <TextField
                                                        name="expense_name"
                                                        label="Name"
                                                        defaultValue={formValues.expense_name}
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                
                                                <Grid formValues xs={12} md={5}>
                                                    <TextField
                                                        name="frequency"
                                                        label="Units/Hours"
                                                        defaultValue={formValues.frequency}
                                                        fullWidth
                                                    />
                                                </Grid>
                                                <Grid formValues xs={12} md={5}>
                                                    <TextField
                                                        name="service"
                                                        label="Service"
                                                        defaultValue={formValues.service}
                                                        fullWidth
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={5}>
                                                    <TextField
                                                        name="expense_amount"
                                                        label="Fee"
                                                        defaultValue={formValues.expense_amount}
                                                        fullWidth
                                                    />
                                                </Grid>
                                            </Grid>
                                        </EditDialog>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button onClick={() => handleDelete(formValues.id)} variant="contained" color="secondary">Delete</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* <Box paddingTop={'24px'} textAlign={'center'}>
                        <Button variant='contained' onClick={handleSave}>
                            Save
                        </Button>
                    </Box> */}
                    <ProgressBar back={'marketingy1'} next={'otherbusiness'} value={84} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>

    );
}


