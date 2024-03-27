import { AppBar, Box, Button, Collapse, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import LogOutButton from "../LogOutButton/LogOutButton";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function SideNav({drawerWidth}) {
    const theme = useTheme();
    // const user = useSelector((store) => store.user);
    const open = useSelector(((store) => store.sideNav));
    const location = useLocation();
    const dispatch = useDispatch();
    function toggleDrawer() {
        dispatch({
            type: 'TOGGLE_SIDE_NAV'
        })
        
    }
    console.log(location.pathname);
    const pathNameArr = location.pathname.split('/');
    const budgetId = pathNameArr[pathNameArr.length-1];
    const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
    }));
    
    return (
        
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          sx={{
            
            width: open? drawerWidth :  0,
            flexShrink: 1,
            '& .MuiDrawer-paper': {
              width: open? drawerWidth :  0,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          onClose={()=>toggleDrawer()}
        >
          <DrawerHeader>
            
            <Container sx={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>
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
            </Container>
                <IconButton onClick={()=>toggleDrawer()}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
          </DrawerHeader>
          
          
          <Divider />
          <Box sx={{ width: 380}} role="presentation" >
                    <List>
                        <CollapeMenu>
                            <ListItemText sx={{pl:1}} primary={'Personal Budget'} />
                            <List>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/startplan/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}  >
                                    <ListItemText primary={'Start a Plan'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/fundamentalexpenses/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}  >
                                    <ListItemText primary={'Fudamental Living Expenses'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/variableexpenses/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}  >
                                    <ListItemText primary={'Variable Expenses'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/personalsavings/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}} >
                                    <ListItemText primary={'Regular Financial Responsibilities'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/futureplans/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Future Plans'}  />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/otherexpenses/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Other Expenses'}  />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/valuepay/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Value Pay'}  />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText sx={{pl:1}} primary={'Business Income'} />
                            <List>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/incomeyear1/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Businsess Income Page 1'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/incomeyear2/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Businsess Income Page 2'} />
                                    </ListItemButton>
                                </ListItem>
                                
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText sx={{pl:1}} primary={'Business Expense'} />
                            <List>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/businessexpensepage1/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Businsess Expense Page 1'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/businessexpensepage2/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Businsess Expense Page 2'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/marketingy1/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Marketing Expense Page 1'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/marketingy2/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Marketing Expense Page 2'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/hrpagey1/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Human Resource Expense Page 1'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/hrpagey2/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Human Resource Expense Page 2'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/otherbusiness/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Other Businsess Expense'} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText sx={{pl:1}} primary={'Break Even'} />
                            <List>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/breakeven/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Break Even'} />
                                    </ListItemButton>
                                </ListItem>
                                
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText sx={{pl:1}} primary={'Overview'} />
                            <List>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/overview/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Overview'} />
                                    </ListItemButton>
                                </ListItem>
                                
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText sx={{pl:1}} primary={'Cashflow'} />
                            <List>
                                <ListItem sx={{pl:2}} disablePadding>
                                    <ListItemButton component={NavLink} to={`/cashflow/${budgetId}`} sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Cashflow'} />
                                    </ListItemButton>
                                </ListItem>
                                
                            </List>
                        </CollapeMenu>
                        
                    </List>
                </Box>
          <Divider />
        <DrawerHeader/>
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
        <ListItemButton sx={{p:1}} onClick={()=>handleClick()}>
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