import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography, TableContainer } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import ProgressBar from '../ProgressBar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import Main from '../Main/Main';
import Grid from '@mui/material/Unstable_Grid2';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import moment from 'moment';
import EditDialog from '../BusinessExpense/EditDialog';
import dayjs from "dayjs";
import NoData from '../Shared/NoData';


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
    // const handleDeleteExpense = (index) => {
    //     const newExpenses = expenses.filter((_, i) => i !== index);
    //     setExpenses(newExpenses);

    //     const newUserEntry = userEntry.filter((_, i) => i !== index);
    //     setUserEntry(newUserEntry);
    // };

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
                        Saving for future expenses is always a damn good idea! In this section identify your future planned expenses. 
                        These items may include a down payment on a house, a trip, a new car, or paying for your child’s education. This is all about your plan - your dreams.
                    </Typography>
                    <Typography variant="body1" gutterBottom textAlign={'center'}>
                        Your future plans can be the kickass motivation you need to work your DAMN Plan!
                    </Typography>
                    <Grid container spacing={1} alignItems={'center'} justifyContent={'center'} sx={{ mt: 3}}>
                            <Grid item md={3} lg={2}> 
                                <TextField label="Name of Plan" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} />
                            </Grid>
                            <Grid item  md={3} lg={2}> 
                                <TextField label="Amount to Save" value={amount} onChange={(e) => setAmount(e.target.value)} />
                            </Grid>
                            <Grid item  md={3} lg={2}> 
                                <DatePicker label='Save from' value={startDate} onChange={(newValue) => setStartDate(newValue)} />
                            </Grid>
                            <Grid item md={3} lg={2}> 
                                <DatePicker label='To' value={endDate} onChange={(newValue) => setEndDate(newValue)} /> 
                            </Grid>
                            <Grid item spacing={1} md={12} lg={2}> 
                                <Button variant='contained' onClick={handleAddExpense}>Add Plan</Button>
                            </Grid>
                    </Grid>
                    <TableContainer>
                        <Table sx={{ mt: 5, mb: 8 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name of Plan</TableCell>
                                    <TableCell>Start Date</TableCell>
                                    <TableCell>End Date</TableCell>
                                    <TableCell>Months to Save</TableCell>
                                    <TableCell>Total Amount</TableCell>
                                    <TableCell>Edit</TableCell>
                                    <TableCell>Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            
                            {futurePlans.length === 0 ? <NoData colSpan={7} /> :<TableBody>
                                
                                {futurePlans?.map((plan, index) => (
                                    <TableRow key={plan.id}>
                                        <TableCell>{plan.name}</TableCell>
                                        <TableCell>{`${moment(plan.start_date).format('MM-DD-YYYY')}`}</TableCell>
                                        <TableCell>{`${moment(plan.end_date).format('MM-DD-YYYY')}`}</TableCell>
                                        <TableCell>{`${moment(plan.end_date).diff(moment(plan.start_date), 'months')}`}</TableCell>
                                        <TableCell>{`$${plan.savings_needed}`}</TableCell>
                                        <TableCell>
                                            <EditDialog budget_id={budgetId.budgetId} id={plan.id}  action='UPDATE_FUTURE_PLAN'>
                                            <Grid container spacing={3} alignItems={'center'} justifyContent={'center'}>
                                                <Grid item spacing={1} md={6}>
                                                    <TextField fullWidth name='name' label="Name of Plan" defaultValue={plan.name}/>
                                                </Grid>
                                                <Grid item spacing={1} md={6}> 
                                                    <TextField fullWidth name='savings_needed' label="Amount to Save" defaultValue={plan.savings_needed}/>
                                                </Grid>

                                                <Grid item spacing={1} md={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>
                                                            <DatePicker 
                                                                name='start_date'
                                                                label='Save from'
                                                                defaultValue={dayjs(plan.start_date)}
                                                                slotProps={{
                                                                    textField: {
                                                                    required: true,
                                                                },
                                                                }}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </Grid>
                                                <Grid item spacing={1} md={6}>
                                                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                        <DemoContainer sx={{mt:'5px'}} components={['DatePicker']}>
                                                            <DatePicker 
                                                                name='end_date'
                                                                label='To'
                                                                defaultValue={dayjs(plan.end_date)}
                                                                slotProps={{
                                                                    textField: {
                                                                    required: true,
                                                                },
                                                                }}
                                                            />
                                                        </DemoContainer>
                                                    </LocalizationProvider>
                                                </Grid>
                                            </Grid>
                                            </EditDialog>
                                        </TableCell>
                                        <TableCell>
                                            <Button onClick={() => handleDeleteFromDB(plan.id)} variant="contained" color="secondary">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>}
                        </Table>
                    </TableContainer>
                    <ProgressBar next={'otherexpenses'} back={'variableexpenses'} value={30} budgetId={budgetId} />
                </Paper>
            </Container>
        </Main>
    )
}

export default FuturePlans;
