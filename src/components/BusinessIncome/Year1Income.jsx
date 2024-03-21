import React, { useState } from 'react';
import { TextField, Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Paper, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../ProgressBar/ProgressBar';



function Year1Income() {
  const budget = useSelector((store) => store.budget);
  const budgetObj = budget[0];
  

  return (
    <Container>
        <Typography
        textAlign="center"
        variant='h2'
        color='primary'>Year 1 Business Income</Typography>
        <Typography
        textAlign="center"
        variant='subtitle1'>Take some time to plan out what services you plan to offer in your first year of business.</Typography>
        <Box sx={{ flexGrow: 1 }}>
        <Grid container
            spacing={2}
            direction="column"
            alignItems="center"
            justifyContent="center"
            sx={{ minHeight: '30vh' }}
        >

          {/* {this is the center spot} */}
            <Grid container xs={12}>
            <Box sx={{ mt: 4 }}>
                <TextField label="Name of Expense" value={expenseName} onChange={(e) => setExpenseName(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <TextField label="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} fullWidth sx={{ mb: 2 }} />
                <Button onClick={handleAddExpense} variant="contained" color="primary">Submit</Button>

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
                                <TableCell>{`$${expense.amount}`}</TableCell>
                                <TableCell>
                                    <Button onClick={() => handleDeleteExpense(index)} variant="outlined" color="secondary">Delete</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Grid>
          {/* {end} */}
        </Grid>
        <ProgressBar next={'futureplans'} back={'incomeyear2'} value={75} />
        </Box>
    </Container>
  );
}

export default Year1Income;
