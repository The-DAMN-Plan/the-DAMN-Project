import { Box, TableBody, TableCell, TableRow } from "@mui/material";

//displayed when a table is empty
export default function NoData({colSpan}){
    return (
        <TableBody>
            <TableRow >
                <TableCell colSpan={colSpan}>
                <Box sx={{display: 'flex', alignItems: 'center',justifyContent:'center'}} >
                    <img width="200px" src='/gallery/no-data-2.png' alt="" />
                </Box>
                </TableCell>
            </TableRow>
        
        </TableBody>
    )
}