import { Checkbox, FormControlLabel } from "@mui/material";
import { useState } from "react";

export default function CustomCheckbox({label, value, handleMonthSelection}) {
    const [checked, setChecked] = useState(false);

    function handleChecked(event) {
        setChecked(!checked);
        console.log('value: ', event.target.value);
        handleMonthSelection(event.target.value);
    }
    return (
        <FormControlLabel control={<Checkbox checked={checked} value={value} onChange={(event)=> handleChecked(event)} />} label={label}/>
    )
}