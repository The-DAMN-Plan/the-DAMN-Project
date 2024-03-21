import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';



function Year1Income() {
    const budget = useSelector((store) => store.budget);
    const budgetObj = budget[0];

    const [productName, setProductName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [unit, setUnit] = useState('');
    const [timeUsed, setTimeUsed] = useState('');
    const [idealClient, setIdealClient] = useState('');
    const [rateOfLove, setRateOfLove] = useState('');
    const [purchasers, setPurchasers] = useState('');
    const [revenueStreams, setRevenueStreams] = useState([]);

  const handleAddRevenueStream = () => {
    // Validate fields before adding to revenueStreams array
    if (revenueStream && price && timeUsed) {
      const newRevenueStream = {
        revenueStream,
        description,
        price,
        unit,
        timeUsed,
        idealClient
      };
      setRevenueStreams([...revenueStreams, newRevenueStream]);
      // Reset fields after submission
      setProductName('');
      setDescription('');
      setPrice('');
      setUnit('');
      setTimeUsed('');
      setIdealClient('');
      setRateOfLove('');
      setPurchasers('');
    }
  };
  

  return (
    <Container sx={{ paddingTop: '64px' }}> {/* Adjust this value based on the height of your nav bar */}
    <Typography variant="h1" gutterBottom>
        Year 1 Businness income
    </Typography>
    <Typography variant="body1" gutterBottom>
        Take some time to think about some services you'll offer in year one of your business.
    </Typography>
    <TextField label="Name of Product" value={productName} onChange={(e) => setProductName(e.target.value)} />
    <TextField label="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
    <TextField label="Price" value={price} onChange={(e) => setPrice(e.target.value)} />
    <TextField label="Unit" value={unit} onChange={(e) => setUnit(e.target.value)} />
    <TextField label="Time Used" value={timeUsed} onChange={(e) => setTimeUsed(e.target.value)} />
    <TextField label="Ideal Client" value={idealClient} onChange={(e) => setIdealClient(e.target.value)} />
    <TextField label="Rate of Love" value={rateOfLove} onChange={(e) => setRateOfLove(e.target.value)} />
    <TextField label="Purchasers" value={purchasers} onChange={(e) => setPurchasers(e.target.value)} />
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
            {revenueStreams.map((stream, index) => (
                <TableRow key={index}>
                    <TableCell>{stream.productName}</TableCell>
                    <TableCell>{stream.description}</TableCell>
                    <TableCell>{stream.price}</TableCell>
                    <TableCell>{stream.unit}</TableCell>
                    <TableCell>{stream.timeUsed}</TableCell>
                    <TableCell>{stream.idealClient}</TableCell>
                    <TableCell>{stream.rateOfLove}</TableCell>
                    <TableCell>{stream.purchasers}</TableCell>
                    <TableCell>
                        <Button onClick={() => handleDeleteExpense(index)}>Delete</Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    </Table>
    <ProgressBar back={''} next={''} value={5}/>
</Container>
);
}

export default Year1Income;
