import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Modal from '@mui/material/Modal';
import CreateBusiness from '../CreateBusiness/CreateBusiness';

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const budget = useSelector((store) => store.budget);
  const budgetObj = budget[0];
  const business = useSelector((store) => store.business);
  console.log(budget);

  useEffect(() => {
    dispatch({ type: 'FETCH_BUSINESS' })
  }, [dispatch]);

  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (event) => {
    setSelectedBusiness(event.target.value);
  };

  function startPlan() {
    // Find the selected business object based on its name
    const selectedBusinessObj = business.find(business => business.name === selectedBusiness);

    // Check if a business is selected
    if (selectedBusinessObj) {
      const budgetData = {
        business_id: selectedBusinessObj.id, // Get the business_id of the selected business
        name: 'test'
      }
      dispatch({ type: 'START_PLAN', payload: budgetData })
      history.push(`/startplan/${budgetObj.id}`);
    } else {
      console.error('No business selected for starting a plan.');
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} sx={{mt:4}}>
        <Grid item xs={6}>
          <Paper style={{ maxHeight: '400px', overflowY: 'auto' }}>
            <Box p={3}>
              <Typography variant="h5" gutterBottom textAlign='center'>
                Your Businesses
              </Typography>
              {business.length === 0 ? (
                <Typography variant="body1">
                  You have no businesses. Please add a business.
                </Typography>
              ) : (
                business.map(item => (
                  <Typography key={item.id} variant='body1'>
                    {item.name}
                  </Typography>
                ))
              )}
              <Button onClick={handleOpen} color='primary' variant='contained'>Create a Business</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="child-modal-title"
                aria-describedby="child-modal-description"
              >
                <CreateBusiness />
              </Modal>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="business-select-label">Select Business</InputLabel>
                <Select
                  labelId="business-select-label"
                  id="business-select"
                  value={selectedBusiness}
                  onChange={handleChange}
                >
                  {business.map(business => (
                    <MenuItem key={business.id} value={business.name}>
                      {business.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box p={3}>
              {/* Need a reducer for budgets and loop over budgets associated with that business */}
              <Typography variant="h5" gutterBottom>
                Budgets
              </Typography>
              <Box display="flex" justifyContent="space-between" marginBottom="10px">
                <Button variant="contained" color="primary" onClick={() => startPlan()}>
                  Start a New Plan
                </Button>
                <Button variant="contained" color="primary" onClick={() => { history.push('/info') }}>
                  Info
                </Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
