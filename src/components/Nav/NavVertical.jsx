import { IconButton } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import { useState } from "react";


export default function NavVertical(){

    menuList = ['Inbox', 'Starred', 'Send email', 'Drafts'];
    return (
        <>
            <IconButton>
                <MenuIcon/>
            </IconButton>
            <NavDrawer menuList={menuList}/>
        </>
    )
}

const NavDrawer = ({menuList})=>{
    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };
    
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>toggleDrawer(false)}>
        <List>
        {menuList.map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>))}
        </List>
    </Box>
      

}