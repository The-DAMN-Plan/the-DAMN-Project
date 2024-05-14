import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, TextField, Button, Select, MenuItem, InputLabel, FormControl, Modal } from '@mui/material';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

const CreatePlanModal = ({ open, handleClose, businesses }) => {
    const dispatch = useDispatch();
    const [selectedBusiness, setSelectedBusiness] = useState('');
    const [planName, setPlanName] = useState('');

    useEffect(() => {
        // Automatically select the first business when the modal is opened or businesses are updated
        if (open && businesses.length > 0) {
            setSelectedBusiness(businesses[0].name);
        }
    }, [open, businesses]);

    const handleChange = (event) => {
        setSelectedBusiness(event.target.value);
    };

    const startPlan = () => {
        const selectedBusinessObj = businesses.find(business => business.name === selectedBusiness);
        if (selectedBusinessObj) {
            dispatch({
                type: 'START_PLAN',
                payload: {
                    business_id: selectedBusinessObj.id,
                    plan_name: planName
                }
            });
            handleClose();  // Close the modal after starting the plan
            setPlanName(''); // Reset plan name
        } else {
            console.error('No business selected for starting a plan.');
        }
    };

    return (
        <Modal
            open={open}
            onClose={() => {
                handleClose();
                setPlanName('');  // Reset plan name when modal is closed
            }}
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
                        {businesses.map((business) => (
                            <MenuItem key={business.id} value={business.name}>{business.name}</MenuItem>
                        ))}
                    </Select>
                    <TextField
                        label="Plan Name"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
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
};

CreatePlanModal.propTypes = {
    open: PropTypes.bool.isRequired,
    handleClose: PropTypes.func.isRequired,
    businesses: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired
    })).isRequired
};

export default CreatePlanModal;
