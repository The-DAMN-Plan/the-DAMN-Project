import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { InputLabel, Select, MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';

    
function Year1Income() {
    const dispatch = useDispatch();
    const budget = useSelector((store) => store.budget);
    const budgetObj = budget[0]
      
    const [revenueStream, setRevenueStream] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('');
    const [timeUsed, setTimeUsed] = useState('');
    const [idealClient, setIdealClient] = useState('');
    const [rateOfLove, setRateOfLove] = useState('');
    const [purchasers, setPurchasers] = useState('');
    const [revenueStreams, setRevenueStreams] = useState([]);
    const [userEntry, setUserEntry] = useState([]);
    
    const handleAddRevenueStream = () => {
        if (!revenueStream || !description || !price || !unit || !timeUsed || !idealClient || !rateOfLove || !purchasers) return;
        
        const newRevenueStream = {
            revenueStream,
            description,
            price,
            unit,
            timeUsed,
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
        setIdealClient('');
        setRateOfLove('');
        setPurchasers('');

        const formData = {
            budget_id: budgetObj.id,
            revenue_stream: revenueStream,
            description: description,
            price: price,
            unit: unit,
            time_used: timeUsed,
            ideal_client: idealClient,
            rate_of_love: rateOfLove,
            purchasers: purchasers,
            year: 1
        };

        setUserEntry([...userEntry, formData]);
    };
    console.log(userEntry);

    const handleSubmit = (event) => {
        event.preventDefault();

        dispatch({ type: 'ADD_BUSINESS_INCOME', payload: userEntry });
    };
    
    const handleDeleteProduct = (index) => {
        const filteredStreams = revenueStreams.filter((_, i) => i !== index);
        setRevenueStreams(filteredStreams);

        const newUserEntry = userEntry.filter((_, i) => i !== index);
        setUserEntry(newUserEntry);
    };
    
return (
        <Container sx={{ paddingTop: '64px', paddingBottom: '64px' }}>
          <Typography variant="h4" gutterBottom align="center">
            Year 1 Business Income
          </Typography>
          <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
            <Typography variant="h6" gutterBottom>
              Add New Revenue Stream
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Name of Product"
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
                  label="Ideal Client"
                  value={idealClient}
                  onChange={(e) => setIdealClient(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
              <InputLabel id="rate-of-love-label">Rate of Love</InputLabel>
              <Select
                labelId="rate-of-love-label"
                id="rate-of-love"
                value={rateOfLove}
                style={{ width: '100%' }} 
                onChange={(e) => setRateOfLove(e.target.value)}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                 <MenuItem value={3}>3</MenuItem>
                <MenuItem value={4}>4</MenuItem>
                <MenuItem value={5}>5</MenuItem>
              </Select>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <TextField
                  fullWidth
                  label="Purchasers"
                  value={purchasers}
                  onChange={(e) => setPurchasers(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Button variant="contained" color="primary" onClick={handleAddRevenueStream}>
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Paper>
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h6" gutterBottom>
              Revenue Streams
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Name of Service</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Price</TableCell>
                  <TableCell>Unit</TableCell>
                  <TableCell>Time Used</TableCell>
                  <TableCell>Ideal Clients</TableCell>
                  <TableCell>Love Rating</TableCell>
                  <TableCell>Purchasers</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {revenueStreams.map((stream, index) => (
                  <TableRow key={index}>
                    <TableCell>{stream.revenueStream}</TableCell>
                    <TableCell>{stream.description}</TableCell>
                    <TableCell>{stream.price}</TableCell>
                    <TableCell>{stream.unit}</TableCell>
                    <TableCell>{stream.timeUsed}</TableCell>
                    <TableCell>{stream.idealClient}</TableCell>
                    <TableCell>{stream.rateOfLove}</TableCell>
                    <TableCell>{stream.purchasers}</TableCell>
                    <TableCell>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => handleDeleteProduct(index)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <ProgressBar back={''} next={''} submit={handleSubmit} value={5}/>
      </Box>
    </Container>
  );
}

export default Year1Income;
