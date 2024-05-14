import { Dialog, DialogContent,TextField, DialogActions,Button, DialogTitle, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import EditIcon from '@mui/icons-material/Edit';

// A reusable dialog for edit(update) a goal, reflection, action plan and comment.
// title and descriptions are common fields for goal, reflection, action plan and comment.
// other input elements can be passed through props.children
export default function EditDialog(props){
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries(formData.entries());
        console.log("form JSON", formJson);
        console.log('id',props.budget_id, props.expense_id);
        dispatch({
            type: props.action,
            payload: [{budget_id:props.budget_id, id:props.id,  ...formJson}]
        });
        // [{
        //     budget_id: "3",
        //     expense_amount: 1200,
        //     expense_name: "accountingSupport",
        //     type: "business expense"
        // }]
        // dispatch({
        //     type: props.action,
        //     payload: {id:props.id, goal_id: props.goal_id, ...formJson}
        // });
        handleClose();
    }

    // console.log('edit props', props.children);
    return(
        <>
            <Button variant="outlined" onClick={handleClickOpen}>Edit</Button>
            <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{
                component:'form',
                onSubmit: (event)=>{handleSubmit(event)}}}>
                <DialogContent>
                    <DialogTitle component={'contianer'}>
                        <Typography variant="h4" color={'primary'} textAlign={'center'}>
                            Update Item
                        </Typography>
                    </DialogTitle>
                    {props.children}
                </DialogContent>
                <DialogActions>
                    <Button  onClick={handleClose} variant='outlined'>Cancel</Button>
                    <Button type='submit' variant='outlined'>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}