import { Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";


export default function NavVertical(){
    
    const menuList = ['Inbox', 'Starred', 'Send email', 'Drafts'];
    return (
        <>
            
            <NavDrawer menuList={menuList}/>
                
        </>
    )
}

// takes in a list of items as props
// lists the items in a drop down style
const NavDrawer = ({menuList})=>{
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => {
        setOpen(newOpen);
    };
    
    return(
        <>
            <IconButton onClick={()=>toggleDrawer(true)}>
                <MenuIcon/>
            </IconButton>
            <Drawer open={open} onClose={()=>toggleDrawer(false)}>
                <Box sx={{ width: 250 }} role="presentation" >
                    <List>
                    {menuList.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                        <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>))}
                    </List>
                </Box>
            </Drawer>
            
        </>
    )
   
      

}