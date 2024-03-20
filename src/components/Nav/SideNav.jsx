import { AppBar, Box, Collapse, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogOutButton from "../LogOutButton/LogOutButton";
import { useSelector } from "react-redux";


export default function SideNav(){
    
    

        const menuList = ['Personal Budget', 'Business Income', 'Business Expenses', '2 Year Cash Flow'];
    const menu = {
        personalBudget: ['Fudamental Living Expense', 'Regular Finacial Responsibilities', 'Other Expenses', 'Future Plans']
    }
    return (
        <>
            
            {/* <NavDrawer menuList={menuList}/> */}
            <PersistentDrawerLeft/>
                
        </>
    )
}

function PersistentDrawerLeft() {
    const theme = useTheme();
    const user = useSelector((store) => store.user);
    const [open, setOpen] = useState(false);

    const drawerWidth = 350;

    const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    }));


    // const handleDrawerOpen = () => {
    //   setOpen(true);
    // };
  
    // const handleDrawerClose = () => {
    //   setOpen(false);
    // };

    const toggleDrawer = () => {
        setOpen(!open);
    };
    
    return (
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <MenuIcon onClick={()=>toggleDrawer()}/>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          onClose={()=>toggleDrawer()}
        >
          <DrawerHeader>
            <IconButton onClick={()=>toggleDrawer()}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ width: 380 }} role="presentation" >
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
          <Divider />
          
          {user.id ? <LogOutButton /> : ''}
        </Drawer>
      </Box>
    );
}

const CollapeMenu = (props)=>{
    const [open, setOpen] = useState(true); 
  
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