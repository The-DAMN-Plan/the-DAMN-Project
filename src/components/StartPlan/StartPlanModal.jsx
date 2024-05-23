import React, { useEffect, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Box, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

function StartPlanModal({ open, handleClose, business, selectedBusiness, setSelectedBusiness, name, setName, setPendingCreate, handle}) {
    // const business = useSelector((store) => store.business);

    // useEffect(() => {
    //     dispatch({ type: 'FETCH_BUSINESS' });
    //   }, [dispatch]);

    const handleChange = (event) => {
        setSelectedBusiness(event.target.value);
    };

    console.log('business:', business);

    const startPlan = () => {
        // Find the selected business object based on its name
        const selectedBusinessObj = business.find(business => business.name === selectedBusiness);

        // Check if a business is selected
        if (selectedBusinessObj) {
            const budgetData = {
                business_id: selectedBusinessObj.id, // Get the business_id of the selected business
                name: name
            }
            dispatch({ type: 'START_PLAN', payload: budgetData })
            setPendingCreate(true);
            handleClose();
        } else {
            console.error('No business selected for starting a plan.');
        }
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="create-plan-modal-title"
            aria-describedby="create-plan-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                width: 400,
            }}>
                <Typography variant="h6" component="h2" textAlign="center" gutterBottom>
                    Create a New Plan
                </Typography>
                <FormControl fullWidth sx={{ mt: 2 }}>
                    <InputLabel id="business-select-label">Select Business</InputLabel>
                    <Select
                        labelId="business-select-label"
                        id="business-select"
                        value={selectedBusiness}
                        onChange={handleChange}
                        label="Select Business"
                    >
                        {business.map((business) => (
                            <MenuItem key={business.id} value={business.name}>{business.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="Plan Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        margin="normal"
                        required
                    />
                    <Button onClick={startPlan} color="primary" variant="contained" sx={{ mt: 2 }}>
                        Start Plan
                    </Button>
                </FormControl>
            </Box>
        </Modal>
    );
}

export default StartPlanModal;
