import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import questionMarkIcon from './question-mark-circle-svgrepo-com.svg'; 

function CustomTooltip({ title }) {
    return (
        <Tooltip title={title}>
            <IconButton>
                <img src={questionMarkIcon} alt="Question Mark" style={{ width: 24, height: 24 }} />
            </IconButton>
        </Tooltip>
    );
}

export default CustomTooltip;