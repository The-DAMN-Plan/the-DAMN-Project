import { Box, Collapse, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";


export default function SideNav(){
    
    const menuList = ['Personal Budget', 'Business Income', 'Business Expenses', '2 Year Cash Flow'];
    const menu = {
        personalBudget: ['Fudamental Living Expense', 'Regular Finacial Responsibilities', 'Other Expenses', 'Future Plans']
    }
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
            <Drawer open={open} onClose={()=>toggleDrawer(false)}
        anchor="left">
            
                <Typography
            variant="h6"
            noWrap
            component="a"
            href="#/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 900,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            The DAMN Plan
          </Typography>
                <Box sx={{ width: 250 }} role="presentation" >
                    {/* <IconButton onClick={()=>toggleDrawer(false)}>
                        <MenuIcon/>
                    </IconButton> */}
                    <List>
                        <CollapeMenu>
                            <ListItemText primary={'Personal Budget'} />
                            {/* 'Fudamental Living Expense', 'Regular Finacial Responsibilities', 'Other Expenses', 'Future Plans' */}
                            <List>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={'Fudamental Living Expense'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={'Regular Finacial Responsibilities'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={'Other Expenses'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={'Future Plans'} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </CollapeMenu>

                        <CollapeMenu>
                            <ListItemText primary={'Business Income'} />
                            {/* 'Fudamental Living Expense', 'Regular Finacial Responsibilities', 'Other Expenses', 'Future Plans' */}
                            <List>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={'Contractor'} />
                                    </ListItemButton>
                                </ListItem>
                                
                            </List>
                        </CollapeMenu>
                        
                    </List>
                </Box>
            </Drawer>
            
        </>
    )
   
      

}