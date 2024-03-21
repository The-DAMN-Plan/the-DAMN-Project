import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography, Grid, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Currency from '../Shared/Currency';


function MarketingBudget() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [contractLabor, setContractLabor] = useState('');
    const [notes, setNotes] = useState('');
    const [newItem, setNewItem] = useState({ item: '', yearOne: '', yearTwo: '' });
    const [marketingBudget, setMarketingBudget] = useState([]);

    const handleAddMarketingItem = () => {
        if (!newItem.item || newItem.yearOne === '' || newItem.yearTwo === '') return;
        setMarketingBudget([...marketingBudget, { ...newItem }]);
        setNewItem({ item: '', yearOne: '', yearTwo: '' }); // Reset the newItem state
    };

    const handleDeleteMarketingItem = (index) => {
        const newMarketingBudget = marketingBudget.filter((_, i) => i !== index);
        setMarketingBudget(newMarketingBudget);
    };

    const handleInputChange = (name, value) => {
        setNewItem({ ...newItem, [name]: value });
    };

    return (
        <Container sx={{ paddingTop: '64px' }}>
            <Typography variant="h4" gutterBottom>
                Marketing Budget
            </Typography>

            <TextField
                label="Contract Labor"
                value={contractLabor}
                onChange={(e) => setContractLabor(e.target.value)}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                fullWidth
                margin="normal"
                multiline
                rows={4}
            />

            {/* Grid container to align items and button */}
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={3}>
                    <TextField
                        label="Item"
                        value={newItem.item}
                        onChange={(e) => handleInputChange('item', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Year One Amount"
                        value={newItem.yearOne}
                        onChange={(e) => handleInputChange('yearOne', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        label="Year Two Amount"
                        value={newItem.yearTwo}
                        onChange={(e) => handleInputChange('yearTwo', e.target.value)}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={3}>
                    <Button variant="contained" color="primary" onClick={handleAddMarketingItem}>
                        Add Item
                    </Button>
                </Grid>
            </Grid>

            {/* Table to display marketing budget items */}
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Item</TableCell>
                        <TableCell align="right">Year One Amount</TableCell>
                        <TableCell align="right">Year Two Amount</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {marketingBudget.map((item, index) => (
                        <TableRow key={index}>
                            <TableCell>{item.item}</TableCell>
                            <TableCell align="right">
                                <Currency value={item.yearOne} />
                            </TableCell>
                            <TableCell align="right">
                                <Currency value={item.yearTwo} />
                            </TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDeleteMarketingItem(index)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box sx={{ pt: 4 }}>
                <ProgressBar activeStep={5} />
            </Box>
        </Container>
    );
}

export default MarketingBudget;