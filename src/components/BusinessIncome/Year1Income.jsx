import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { InputLabel, Select, MenuItem, InputAdornment } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Footer from '../Footer/Footer';
import Main from '../Main/Main';
import Currency from '../Shared/Currency';
import FormControl from '@mui/material/FormControl';
import EditDialog from '../BusinessExpense/EditDialog';


function Year1Income() {
  const dispatch = useDispatch();
  const budgetId = useParams();
  const income = useSelector((store) => store.income);
  const [revenueStream, setRevenueStream] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [unit, setUnit] = useState('');
  const [timeUsed, setTimeUsed] = useState('');
  const [costPerDelivery, setCostPerDelivery] = useState('');
  const [idealClient, setIdealClient] = useState('');
  const [rateOfLove, setRateOfLove] = useState('');
  const [purchasers, setPurchasers] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [revenueStreams, setRevenueStreams] = useState([]);
  const [userEntry, setUserEntry] = useState([]);
  const open = useSelector((store) => store.sideNav);

  useEffect(() => {
    dispatch({ type: 'BUDGET_PLAN', payload: budgetId.budgetId });
  }, [dispatch, budgetId]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!revenueStream || !description || !price || !unit || !timeUsed || !costPerDelivery || !idealClient || !rateOfLove || !purchasers) return;

    const newRevenueStream = {
      revenueStream,
      description,
      price,
      unit,
      timeUsed,
      costPerDelivery,
      idealClient,
      rateOfLove,
      purchasers
    };

    setRevenueStreams([...revenueStreams, newRevenueStream]);
    setRevenueStream('');
    setDescription('');
    setPrice('');
    setUnit('');
    setTimeUsed('');
    setCostPerDelivery('');
    setIdealClient('');
    setRateOfLove('');
    setPurchasers('');

    const formData = {
      budget_id: budgetId.budgetId,
      revenue_stream: revenueStream,
      description: description,
      price: price,
      unit: unit,
      time_used: timeUsed,
      ideal_client: idealClient,
      rate_of_love: rateOfLove,
      purchasers: purchasers,
      cost_of_delivery: Number(costPerDelivery)
    };

    dispatch({ type: 'ADD_BUSINESS_INCOME', payload: [formData] });

    const updateObj = {
      completed: true,
      budget_id: Number(budgetId.budgetId),
      step: 'incomeyear1'
    }

    dispatch({ type: 'UPDATE_STATUS', payload: updateObj })
    setRevenueStreams([]);
  };

  const handleDeleteProduct = (index) => {
    const filteredStreams = revenueStreams.filter((_, i) => i !== index);
    setRevenueStreams(filteredStreams);

    const newUserEntry = userEntry.filter((_, i) => i !== index);
    setUserEntry(newUserEntry);
  };

  const deleteProductFromDB = (incomeId) => {
    const budgetObjId = budgetId.budgetId;
    dispatch({ type: 'DELETE_INCOME', payload: { incomeId, budgetObjId } });
  };

  const filteredIncomes = income.filter(item => item);

  const openVideo = () => {
    window.open('https://youtu.be/80XT9e_yN2Y', '_blank');
  };

  return (
    <Main open={open}>
      <Container sx={{ paddingTop: '64px', paddingBottom: '64px' }}>
        <Paper sx={{ p: 3 }}>

          <Typography variant="h3" color={'primary'} gutterBottom align="center">
            Sales Projections
          </Typography>
          <Typography variant="h6" gutterBottom>
            Add New Revenue Stream
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Name of Service/Product"
                value={revenueStream}
                onChange={(e) => setRevenueStream(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Price"
                type='number'
                InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Time Used"
                value={timeUsed}
                onChange={(e) => setTimeUsed(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Cost Per Delivery"
                value={costPerDelivery}
                onChange={(e) => setCostPerDelivery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Ideal Client"
                value={idealClient}
                onChange={(e) => setIdealClient(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <FormControl fullWidth>
                <InputLabel id="rate-of-love-label">Rate of Love</InputLabel>
                <Select
                  labelId="rate-of-love-label"
                  id="rate-of-love"
                  value={rateOfLove}
                  label="Rate of Love"
                  style={{ width: '100%' }}
                  onChange={(e) => setRateOfLove(e.target.value)}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <TextField
                fullWidth
                label="Purchasers"
                value={purchasers}
                onChange={(e) => setPurchasers(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={3} display={'flex'} alignItems={'center'}>
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Submit
              </Button>
            </Grid>
          </Grid>
          <Typography variant="h6" sx={{ mt: 4 }} gutterBottom>
            Revenue Streams
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name of Service/Product</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Unit</TableCell>
                <TableCell>Time Used</TableCell>
                <TableCell>Cost Per Delivery</TableCell>
                <TableCell>Ideal Clients</TableCell>
                <TableCell>Love Rating</TableCell>
                <TableCell>Purchasers</TableCell>
                <TableCell>Rate for Money</TableCell>
                <TableCell>Edit</TableCell>
                <TableCell>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredIncomes?.map((income1) => (
                <TableRow key={income1.id}>
                  <TableCell>{income1.revenue_stream}</TableCell>
                  <TableCell>{income1.description}</TableCell>
                  <TableCell><Currency value={income1.price} /></TableCell>
                  <TableCell>{income1.unit}</TableCell>
                  <TableCell>{income1.time_used}</TableCell>
                  <TableCell><Currency value={income1.cost_of_delivery} /></TableCell>
                  <TableCell>{income1.ideal_client}</TableCell>
                  <TableCell>{income1.rate_of_love}</TableCell>
                  <TableCell>{income1.purchasers}</TableCell>
                  <TableCell><Currency value={(income1.price - income1.cost_of_delivery) / income1.time_used} /></TableCell>
                  <TableCell>
                    <EditDialog budget_id={budgetId.budgetId} id={income1.id} action='UPDATE_REVENUE' >
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='revenue_stream'
                            fullWidth
                            label="Name of Service/Product"
                            defaultValue={income1.revenue_stream}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='description'
                            fullWidth
                            label="Description"
                            defaultValue={income1.description}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='price'
                            fullWidth
                            label="Price"
                            type='number'
                            InputProps={{ startAdornment: <InputAdornment position="start">$</InputAdornment> }}
                            defaultValue={income1.price}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='unit'
                            fullWidth
                            label="Unit"
                            defaultValue={income1.unit}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='time_used'
                            fullWidth
                            label="Time Used"
                            defaultValue={income1.time_used}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='cost_of_delivery'
                            fullWidth
                            label="Cost Per Delivery"
                            defaultValue={income1.cost_of_delivery}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='ideal_client'
                            fullWidth
                            label="Ideal Client"
                            defaultValue={income1.ideal_client}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <FormControl fullWidth>
                            <InputLabel id="rate-of-love-label">Rate of Love</InputLabel>
                            <Select
                              name='rate_of_love'
                              labelId="rate-of-love-label"
                              id="rate-of-love"
                              defaultValue={income1.rate_of_love}
                              label="Rate of Love"
                              style={{ width: '100%' }}
                            >
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                            </Select>
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <TextField
                            name='purchasers'
                            fullWidth
                            label="Purchasers"
                            defaultValue={income1.purchasers}
                          />
                        </Grid>
                      </Grid>
                    </EditDialog>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => deleteProductFromDB(income1.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <Box textAlign={'center'}>
            <Button variant='contained' type='button' onClick={() => handleSubmit(event)}>
              Save
            </Button>
          </Box> */}
          <ProgressBar back={'valuepay'} next={'overview'} submit={handleSubmit} value={42} budgetId={budgetId} />
          <Grid container justifyContent="center" style={{ marginTop: 16 }}>
            <Grid item>
              <Button variant="contained" color="primary" onClick={openVideo}>
                Watch Video
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
      <Footer />

    </Main>
  );
}

export default Year1Income;
