import React, { useEffect, useState } from 'react';
import { Box, Container, Grid, Paper, Typography, Button, Modal } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

import CreateBusiness from '../CreateBusiness/CreateBusiness';
import CreatePlanModal from '../CreatePlanModal/CreatePlanModal';
import CustomToolTip from '../Shared/CustomToolTip';

function UserPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const budget = useSelector(store => store.budget);
  const budgetObj = budget[0];
  const business = useSelector(store => store.business);

  const [name, setName] = useState('');
  const [pendingCreate, setPendingCreate] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState('');
  const [open, setOpen] = useState(false); // For CreateBusiness modal
  const [modalOpen, setModalOpen] = useState(false); // For CreatePlanModal
  const [openSnack, setOpenSnack] = useState(false);

  useEffect(() => {
    dispatch({ type: 'FETCH_BUSINESS' });
  }, [dispatch]);

  useEffect(() => {
    if (pendingCreate) {
      history.push(`/startplan/${budgetObj.id}`);
    }
  }, [pendingCreate, budgetObj, history]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleChange = (event) => {
    setSelectedBusiness(event.target.value);
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnack(false);
  };

  const action = (
    <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
      <CloseIcon fontSize="small" />
    </IconButton>
  );

  function startPlan() {
    const selectedBusinessObj = business.find(b => b.name === selectedBusiness);
    if (selectedBusinessObj) {
      dispatch({
        type: 'START_PLAN',
        payload: { business_id: selectedBusinessObj.id, name }
      });
      setPendingCreate(true);
      setName('');
    } else {
      console.error('No business selected for starting a plan.');
    }
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3} justifyContent="center" alignItems="center" sx={{ mt: 4 }}>
        <Grid item xs={8}>
          <Paper sx={{ maxHeight: '400px', overflowY: 'auto', p: 3 }}>
            <Typography variant="h3" color={'primary'} gutterBottom textAlign='center'>
              Your Businesses
            </Typography>
            <Box textAlign={'right'}>
              <CustomToolTip title="Add a business to get started" />
            </Box>
            {business.length === 0 ? (
              <Typography variant="body1">
                You have no businesses. Please add a business.
              </Typography>
            ) : (
              business.map(item => (
                <Typography sx={{ my: 1 }} key={item.id} variant='body1'>
                  {item.name}
                </Typography>
              ))
            )}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button onClick={handleOpen} color='primary' variant='contained'>Create a Business</Button>
              <Button onClick={handleOpenModal} color='primary' variant='contained'>Start a Damn Plan!</Button>
            </Box>
            <Modal open={open} onClose={handleClose}>
              <CreateBusiness handleClose={handleClose} setOpenSnack={setOpenSnack} />
            </Modal>
          </Paper>
        </Grid>
      </Grid>
      <CreatePlanModal open={modalOpen} handleClose={handleCloseModal} businesses={business} />
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack} message="Business Created!" action={action}>
        <Alert onClose={handleClose} severity="success" variant="filled" sx={{ width: '100%' }}>
          Successfully Created Business!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default UserPage;
