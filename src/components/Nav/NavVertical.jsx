import { Box, Collapse, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";


export default function NavVertical(){
    
    const menuList = ['Inbox', 'Starred', 'Send email', 'Drafts'];
    return (
        <>
            
            <NavDrawer menuList={menuList}/>
                
        </>
    )
}

const CollapeMenu = (props)=>{
    const [open, setOpen] = useState(false); 
  
    const handleClick = () => { 
        setOpen(!open); 
    }; 
    return (
        <>
        {/* toggle hidden sub menu when clicked */}
        <ListItemButton sx={{p:'10px'}} onClick={()=>handleClick()}>
            {/* ListTextItem is passed as props */}
            {props.children[0]} 
            <ListItemIcon>
                {open? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon/> }
              </ListItemIcon>
        </ListItemButton>
        
        {/* hidden sub menu */}
        <Collapse in={open} timeout="auto" unmountOnExit>
            {props.children[1]}
        </Collapse>
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
                    {/* <IconButton onClick={()=>toggleDrawer(false)}>
                        <MenuIcon/>
                    </IconButton> */}
                    <List>
                    {menuList.map((text, index) => (
                        
                        <CollapeMenu key={text}>
                            <ListItemText primary={text} />
                            <List>
                                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                                <ListItem sx={{pl:'15px'}} key={text} disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                                ))}
                            </List>
                        </CollapeMenu>
                        ))}
                        
                    </List>
                </Box>
            </Drawer>
            
        </>
    )
   
      

}