import React, { useState, useEffect } from 'react';
import {
    TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow,
    Typography, Box, FormControl, InputLabel, Select, MenuItem, Grid, Paper, TableContainer, Stack, Chip, FormHelperText
} from '@mui/material';
// import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';
import ProgressBar from '../ProgressBar/ProgressBar';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import EditDialog from './EditDialog';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import CustomCheckbox from '../Shared/CustomCheckbox';

function MarketingBudgetYear1() {
    const dispatch = useDispatch();
    const budgetId = useParams();
    const expense = useSelector((store) => store.expense);
    const open = useSelector(store => store.sideNav);
    const [expenseName, setExpenseName] = useState('');
    const [serviceProvider, setServiceProvider] = useState('');
    const [paymentInterval, setPaymentInterval] = useState('');
    const [assetsNeeded, setAssetsNeeded] = useState('');
    const [costPerUse, setCostPerUse] = useState('');
    const [vendor, setVendor] = useState('');
    const [monthlyUsageCount, setMonthlyUsageCount] = useState('');


    const [userEntry, setuserEntry] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
    }, [dispatch, budgetId]);

    const handleAddExpense = () => {
        if (!expenseName || !costPerUse || !vendor) return; // Validate input
        const budgetIdObj = budgetId.budgetId;
        const expenseNumber = Number(costPerUse * monthlyUsageCount * 12).toFixed(2);
        const newCostPerUse = Number(parseFloat(costPerUse).toFixed(2));

        const formData = {
            expense_name: expenseName,
            facilitator: serviceProvider,
            timing: paymentInterval,
            assets_needed: assetsNeeded,
            cost_per_use: newCostPerUse,
            vendor: vendor,
            frequency: monthlyUsageCount,
            year: 1,
            budget_id: budgetIdObj,
            expense_amount: expenseNumber,
            type: 'business marketing'
        };
        setuserEntry([...userEntry, formData]);
        resetForm();

    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();

    //     if (!expenseName || !costPerUse || !vendor) return; // Validate input
    //     const budgetIdObj = budgetId.budgetId;
    //     const expenseNumber = Number(costPerUse * monthlyUsageCount * 12).toFixed(2);
    //     const newCostPerUse = Number(parseFloat(costPerUse).toFixed(2));

    //     const formData = {
    //         expense_name: expenseName,
    //         facilitator: serviceProvider,
    //         timing: paymentInterval,
    //         assets_needed: assetsNeeded,
    //         cost_per_use: newCostPerUse,
    //         vendor: vendor,
    //         frequency: monthlyUsageCount,
    //         year: 1,
    //         budget_id: budgetIdObj,
    //         expense_amount: expenseNumber,
    //         type: 'business marketing'
    //     };

    //     console.log(formData);
    //     setuserEntry([formData]);
    //     console.log([formData]);
    //     dispatch({ type: 'ADD_PERSONAL_EXPENSE', payload: [formData] });
    //     const updateObj = {
    //         completed: true,
    //         budget_id: Number(budgetId.budgetId),
    //         step: 'marketingy1'
    //     }

    //     dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
    //     setuserEntry([]);
    // };

    const handleDeleteExpense = (id) => {

        const newUserEntry = userEntry.filter((i) => i.id !== id);
        setuserEntry(newUserEntry);

    };
    // ===== new stuff =======
    const [serviceChoice,setServiceChoice] = useState('');

    function handleServiceChoice(event){
        event.preventDefault();
        setServiceChoice(event.target.textContent)
        setSelectServiceError('');
        console.log(serviceChoice);
        // console.log(event.target.textContent);
    }

    // list of services to prompt the user
    const [services, setServices] = useState(['Website',
    "Business Card",
    "Flyers",
    "Other"])
    const firstHalfYear = ['Jan', 'Feb', 'Mar', 'Apr','May', 'Jun'];
    const secondHalfYear = ['Jul', 'Aug', 'Sep', 'Oct','Nov', 'Dec'];
    //new service
    const [newService, setNewService] = useState('');

    // adds a service in the list of services
    // they will be displayed on screen in MUI Chip component
    function handleAddService(event) {
        event.preventDefault();
        const newServiceList = services.slice(0,services.length-1);
        newServiceList.push(newService);
        newServiceList.push(services[services.length-1]);
        setServices(newServiceList);
        setServiceChoice(newService);
        setNewService('');

    }

    const [frequency, setFrequency] = useState('Monthly');
    const [selectServiceError, setSelectServiceError] = useState('');
    const [showServiceChoiceError, setShowServiceChoiceError] = useState(false) ;
    const [selectedMonths, setSelectedMonths] = useState(['1']);     
    // const [selectedMonths, setSelectedMonths] = useState([{
    //     month: '1',
    //     checked: true
    // }]); 
    const [selectedMonth, setSelectedMonth] = useState(''); 
    // const selectedMonthsError = selectedMonths.filter((month) => month).length < 1;
    const [selectedMonthsError, setSelectedMonthsError] = useState(false);
    const [selectedMonthsErrorMsg, setSelectedMonthsErrorMsg] = useState('');
    function handleSubmit(event) {
        event.preventDefault();
        console.log(selectedMonth);
        if (serviceChoice === '' || serviceChoice === 'Other' ){
            setSelectServiceError('Please, Select one of the services above or select Others to add a new one');
            setShowServiceChoiceError(true);
        }

        if ((selectedMonths.length < 1 && frequency === 'Monthly')  || (selectedMonth === '' && frequency === 'Yearly')){
            setSelectedMonthsErrorMsg('Please, select month');
            setSelectedMonthsError(true);
        }
        
    }
    
    const addServiceFormDisabled = serviceChoice !== 'Other';

    function handleMonthSelection(monthSelected) {
        if(frequency === 'Monthly'){
            // add month
            if (!selectedMonths.find((item) => item.month === monthSelected)){
                console.log('monthly ...',);
                setSelectedMonths([...selectedMonths,monthSelected]);
                // setSelectedMonths([...selectedMonths,{month: event.target.value, checked: true}]);
            }
            // else remove month
            else{
                const index = selectedMonths.findIndex((item) => item.month === monthSelected);
                console.log('found index', index);
                const newSelectedMonths = selectedMonths.slice();
                newSelectedMonths.splice(index,1)
                console.log(selectedMonths);
                console.log('new selected month',newSelectedMonths);
                setSelectedMonths([...newSelectedMonths,monthSelected])
                // selectedMonths[index].checked = !selectedMonths[index].checked;
            }
            setSelectedMonthsErrorMsg('');
        }
        else{
            console.log(monthSelected);
            setSelectedMonth(monthSelected);
            setSelectedMonthsErrorMsg('');
        }
    }

    // ===== end of new stuff =======

    const resetForm = () => {
        // Reset form fields after adding a new expense
        setExpenseName('');
        setServiceProvider('');
        setPaymentInterval('');
        setAssetsNeeded('');
        setCostPerUse('');
        setVendor('');
        setMonthlyUsageCount('');
    };

    const handleDeleteFromDB = (expenseId) => {
        const budgetObjId = budgetId.budgetId;
        dispatch({ type: 'DELETE_EXPENSE', payload: { expenseId, budgetObjId } })
    };
    // const handleEdit = (expenseId) => {
    //     const budgetObjId = budgetId.budgetId;
    //     data = [{
    //         budget_id: "3",
    //         expense_amount: 1200,
    //         expense_name: "accountingSupport",
    //         type: "business expense"}]
    //     dispatch({ type: 'DELETE_EXPENSE', payload: { expenseId, budgetObjId } })
    // };

    const filteredExpenses = expense.filter(item => item.type === 'business marketing');
    console.log('selected months',selectedMonths);
    console.log('selected month',selectedMonth);

    return (

        <Main open={open}>
            <Container >
                <Paper sx={{ p: 3 }}>

                    <Typography variant="h3" color={'primary'} gutterBottom marginTop={'24px'} textAlign={'center'} marginBottom={'24px'} >
                        Marketing Budget
                    </Typography>

                    <Typography variant="body1" marginTop={'24px'} textAlign={'center'} marginBottom={'24px'} >
                    Whether you know your Marketing Budget or you are planning for the future, begin with market research to determine which marketing strategy and tools work best for your business. Once you’ve decided on your marketing plan, use this page to list each marketing activity's cost. 
                    Note, do not enter employee costs or contractor fees on this page.
                    </Typography>
                    <Typography variant="body1" marginTop={'24px'} textAlign={'center'} marginBottom={'24px'} >
                    Note, do not enter employee costs or contractor fees on this page.
                    </Typography>
                    {/* <FormControl
                        required
                        error={error}
                        component="fieldset"
                        sx={{ m: 3 }}
                        variant="standard"
                    > */}
                    
                    <Box component={'form'} onSubmit={(event)=>handleAddService(event)}>
                        <FormControl>
                            <FormLabel>Choose a Service</FormLabel>
                            <Stack direction="row" spacing={1}>
                                    {services.map((service,i)=>
                                        <Chip key={i} label={service} sx={{backgroundColor: `${serviceChoice === service? 'red' : 'default'}`}} onClick={handleServiceChoice} />
                                    )}
                            </Stack>
                            <FormHelperText error={showServiceChoiceError}>{selectServiceError}</FormHelperText>
                            <TextField
                                sx={{ m: 1, width: 300}}
                                name="name_of_service"
                                label="Name of a Service"
                                value={newService}
                                onChange={(event)=>{setNewService(event.target.value)}}
                                required
                                disabled={addServiceFormDisabled}
                            />
                            <Button disabled={addServiceFormDisabled} type='submit'>Add Service</Button>
                        </FormControl>
                    </Box>
                    <Box component={'form'} onSubmit={(event)=>handleSubmit(event)} >
                        <FormControl >
                            {/* <Typography variant="h5" marginTop={'24px'} textAlign={'left'} marginBottom={'24px'} >
                            Choose a Service
                            </Typography> */}

                            
                            
                            {/* <Stack direction="row" spacing={1}>
                                <Chip sx={{backgroundColor: `${serviceChoice === 'Website'? 'red' : 'default'}`}}label="Website" onClick={handleServiceChoice}/>
                                <Chip label="Business Card" clickable onClick={handleServiceChoice}/>
                                <Chip label="Flyers" clickable onClick={handleServiceChoice}/>
                                <Chip label="Other" clickable onClick={handleServiceChoice}/>
                            </Stack> */}
                            
                            
                            {/* <Typography variant="body1" marginTop={'24px'} textAlign={'center'} marginBottom={'24px'} >
                            {selectServiceError}
                            </Typography> */}
                            
                            
                            
                            {/* {serviceChoice !== 'Other' && 
                                <Box>
                                    <TextField
                                    sx={{ m: 1, width: 300}}
                                    name="name_of_service"
                                    label="Name of a Service"
                                    disabled
                                    required
                                    />
                                    <Button disabled>Add Service</Button>
                                </Box>
                            } */}

                            {/* <Box component={'form'} onSubmit={(event)=>handleAddService(event)}>
                                <TextField
                                    sx={{ m: 1, width: 300}}
                                    name="name_of_service"
                                    label="Name of a Service"
                                    value={newService}
                                    onChange={(event)=>{setNewService(event.target.value)}}
                                    required
                                    disabled={addServiceFormDisabled}
                                />
                                <Button disabled={addServiceFormDisabled} type='submit'>Add Service</Button>
                            </Box> */}
                            {/* <Divider /> */}
                            <Box>
                                <TextField
                                    sx={{ m: 1, width: 300}}
                                    name="amount"
                                    label="Amount"
                                    required
                                    /> 
                            </Box>
                            

                            <FormControl sx={{ m: 1, width: 300}}>
                                <InputLabel>Frequency</InputLabel>
                                <Select
                                labelId="demo-multiple-name-label"
                                id="demo-multiple-name"
                                value={frequency}
                                label='Frequency'
                                onChange={(event)=>{setFrequency(event.target.value); setSelectedMonths([])}}
                                >
                                    <MenuItem value='Monthly'> Monthly</MenuItem>
                                    <MenuItem value='Yearly'>Yearly</MenuItem>
                                </Select>
                            </FormControl>

                            {/* todo: change this in to an array and apply error messages */}
                            {frequency === 'Monthly' &&
                            <FormGroup>
                                <FormLabel>Select Months</FormLabel>
                                <FormHelperText error >{selectedMonthsErrorMsg}</FormHelperText>
                                <Stack direction="row" spacing={1}>
                                    {/* <FormControlLabel control={<Checkbox  />} label="Jan" />
                                    <FormControlLabel control={<Checkbox />} label="Feb" />
                                    <FormControlLabel control={<Checkbox  />} label="Mar" />
                                    <FormControlLabel control={<Checkbox />} label="April" />
                                    <FormControlLabel control={<Checkbox  />} label="May" />
                                    <FormControlLabel control={<Checkbox />} label="Jun" /> */}
                                    {/* checked={selectedMonths.includes((i+1).toString)}  */}
                                    {/* value={i+1}  */}
                                    {/* onChange={(event)=>handleMonthSelection(event)} */}
                                    {/* (selectedMonths.find((month) => month === (i+1).toString).checked) */}
                                    {/* (selectedMonths.find((item) => item.month === (i+1).toString))? (selectedMonths.find((item) => item.month === (i+1).toString)).checked: false */}

                                    {firstHalfYear.map((month,i)=>
                                        <FormControlLabel key={i} control={<Checkbox checked={selectedMonths.find((item) => item.month ===(i+1).toString) === undefined? false: true} value={i+1} onChange={(event)=>handleMonthSelection(event)}  />} label={month}/>)}
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    {/* <FormControlLabel control={<Checkbox />} label="Jul" />
                                    <FormControlLabel control={<Checkbox />} label="Aug" />
                                    <FormControlLabel control={<Checkbox  />} label="Sep" />
                                    <FormControlLabel control={<Checkbox />} label="Oct" />
                                    <FormControlLabel control={<Checkbox  />} label="Nov" />
                                    <FormControlLabel control={<Checkbox />} label="Dec" /> */}
                                    {/* <FormControlLabel key={i} control={<Checkbox value={i+7} checked={selectedMonths.includes((i+7).toString)} onChange={(event)=>handleMonthSelection(event)} />} label={month}/> */}
                                    {secondHalfYear.map((month,i)=>
                                            <CustomCheckbox key={i} value={i+7} label={month} handleMonthSelection={handleMonthSelection}/>
                                        )}
                                </Stack>
                            </FormGroup>}

                            {frequency === 'Yearly' &&
                            <FormControl>
                                <FormLabel>Select Month</FormLabel>
                                <RadioGroup
                                value={selectedMonth}
                                onChange={(event)=>handleMonthSelection(event.target.value)}
                                >
                                    <FormHelperText error >{selectedMonthsErrorMsg}</FormHelperText>
                                    <Stack direction="row" spacing={1}>
                                        {/* <FormControlLabel value="1" control={<Radio />} label="Jan" />
                                        <FormControlLabel value="2" control={<Radio />} label="Feb" />
                                        <FormControlLabel value="3" control={<Radio />} label="Mar" />
                                        <FormControlLabel value="4" control={<Radio />} label="April" />
                                        <FormControlLabel value="5" control={<Radio />} label="May" />
                                        <FormControlLabel value="6" control={<Radio />} label="Jun" /> */}
                                        {firstHalfYear.map((month,i)=>
                                        <FormControlLabel key={i} value={i+1} control={<Radio />} label={month}/>)}
                                    </Stack>
                                        
                                    <Stack direction="row" spacing={1}>
                                        {/* <FormControlLabel value="7" control={<Radio />} label="Jul" />
                                        <FormControlLabel value="8" control={<Radio />} label="Aug" />
                                        <FormControlLabel value="9" control={<Radio />} label="Sep" />
                                        <FormControlLabel value="10" control={<Radio />} label="Oct" />
                                        <FormControlLabel value="11" control={<Radio />} label="Nov" />
                                        <FormControlLabel value="12" control={<Radio />} label="Dec" /> */}

                                        {secondHalfYear.map((month,i)=>
                                            <FormControlLabel key={i} value={i+7} control={<Radio />} label={month}/>)}
                                    </Stack>
                                    
                                </RadioGroup>
                            </FormControl>}
                            <Button type='submit'>Submit</Button>
                        </FormControl>
                    </Box>
                    {/* ===================================================================================== */}
                    <TableContainer>
                        <Table sx={{ mt: 5, mb: 8 }}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Service/ Item</TableCell>
                                    <TableCell align="right">Service Provider</TableCell>
                                    <TableCell align="right">Payment Interval</TableCell>
                                    <TableCell align="right">Assets Needed</TableCell>
                                    <TableCell align="right">Cost Per Use</TableCell>
                                    <TableCell align="right">Contractor or In-House</TableCell>
                                    <TableCell align="right">Monthly Usage Count</TableCell>
                                    <TableCell align="right">Monthly Expense</TableCell> {/* New Column */}
                                    <TableCell align="right">Yearly Expense</TableCell> {/* New Column */}
                                    <TableCell align="right">Edit</TableCell>
                                    <TableCell align="right">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {filteredExpenses?.map((expense) => (
                                    <TableRow key={expense.id}>
                                        <TableCell>{expense.expense_name}</TableCell>
                                        <TableCell align="right">{expense.facilitator}</TableCell>
                                        <TableCell align="right">{expense.timing}</TableCell>
                                        <TableCell align="right">{expense.assets_needed}</TableCell>
                                        <TableCell align="right"><Currency value={expense.cost_per_use} /></TableCell>
                                        <TableCell align="right">{expense.vendor}</TableCell>
                                        <TableCell align="right">{expense.frequency}</TableCell>
                                        <TableCell align="right">
                                            {/* Calculate Monthly Expense */}
                                            <Currency value={expense.frequency * expense.cost_per_use} />
                                        </TableCell>
                                        <TableCell align="right">
                                            {/* Calculate Yearly Expense */}
                                            <Currency value={expense.frequency * expense.cost_per_use * 12} />
                                        </TableCell>
                                        <TableCell align='right'>
                                            <EditDialog budget_id={budgetId.budgetId} id={expense.id}  action='UPDATE_EXPENSE'>
                                                <Grid container spacing={2} alignItems="center" justifyContent={'center'}>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField
                                                            name="expense_name"
                                                            label="Service/ Item"
                                                            defaultValue={expense.expense_name}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField
                                                            name="facilitator"
                                                            label="Service Provider"
                                                            defaultValue={expense.facilitator}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <TextField
                                                            name="cost_per_use"
                                                            label="Cost Per Use"
                                                            defaultValue={expense.cost_per_use}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            name="assets_needed"
                                                            label="Assets Needed"
                                                            defaultValue={expense.assets_needed}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            name="frequency"
                                                            label="Monthly Usage Count"
                                                            defaultValue={expense.frequency}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <FormControl fullWidth>
                                                            <InputLabel id="vendor-label">Vendor</InputLabel>
                                                            <Select
                                                                labelId="vendor-label"
                                                                name='vendor'
                                                                defaultValue={expense.vendor}
                                                                label="Vendor"
                                                            >
                                                                <MenuItem value="Contractor">Contractor</MenuItem>
                                                                <MenuItem value="In-House">In-House</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={6}>
                                                        <TextField
                                                            name="timing"
                                                            label="Payment Interval"
                                                            defaultValue={expense.timing}
                                                            fullWidth
                                                        />
                                                    </Grid>
                                                </Grid>     
                                            </EditDialog>
                                        </TableCell>
                                        <TableCell align="center">
                                            <Button onClick={() => handleDeleteFromDB(expense.id)} variant="contained" color="secondary">Delete</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <ProgressBar next={'hrpagey1'} back={'businessexpensepage2'} value={72} budgetId={budgetId} />
                </Paper>
            </Container>
            <Footer />
        </Main>
    );
}

export default MarketingBudgetYear1;
