import {Box, Button, Collapse, Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useState } from "react";
import React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function SideNav({drawerWidth}) {
    const theme = useTheme();
    const open = useSelector(((store) => store.sideNav));
    const location = useLocation();
    const dispatch = useDispatch();
    //handles opening and closing the side nav
    function toggleDrawer() {
        dispatch({
            type: 'TOGGLE_SIDE_NAV'
        })
        
    }

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
          transitionDuration={{enter:500, exit: 1000 }}
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

            {/* Open/Close sub menu */}
            <IconButton onClick={()=>toggleDrawer()}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
            </DrawerHeader>
                <Divider />
                {/* A collapsable menu and sub menu */}
                <Box sx={{ width: 380}} role="presentation" >
                            <List>
                                <CollapeMenu>
                                    <ListItemText sx={{pl:1}} primary={'Personal Budget'} />
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/startplan/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}  >
                                            <ListItemText sx={{pl: 2}} primary={'Commited Expenses Page 1'} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/fundamentalexpenses/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}  >
                                            <ListItemText sx={{pl: 2}} primary={'Commited Expenses Page 2'} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/personalsavings/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}} >
                                            <ListItemText sx={{pl: 2}} primary={'Commited Expenses Page 3'} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/variableexpenses/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}  >
                                            <ListItemText sx={{pl: 2}} primary={'Decision Expenses'} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/futureplans/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Future Plans'}  />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/otherexpenses/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Other Expenses'}  />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/valuepay/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Value Pay'}  />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </CollapeMenu>
                                <CollapeMenu>
                                    <ListItemText sx={{pl:1}} primary={'Business Income'} />
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/incomeyear1/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Sales Projection'} />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </CollapeMenu>
                                <CollapeMenu>
                                    <ListItemText sx={{pl:1}} primary={'Business Operating Expenses'} />
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/overview/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Overview'} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/businessexpensepage1/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Business Operating Expenses Page 1'} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/businessexpensepage2/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Business Operating Expenses Page 2'} />
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/marketingy1/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Marketing Budget'} />
                                            </ListItemButton>
                                        </ListItem>
                                        {/* Comment out Marketing Year 2  */}
                                        {/* <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/marketingy2/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Marketing Expense Page 2'} />
                                            </ListItemButton>
                                        </ListItem> */}
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/hrpagey1/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Resource Expense Budget'} />
                                            </ListItemButton>
                                        </ListItem>
                                        {/* Just commented out the HR page 2 */}
                                        {/* <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/hrpagey2/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Human Resource Expense Page 2'} />
                                            </ListItemButton>
                                        </ListItem> */}
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/otherbusiness/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Other Businsess Expense'} />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </CollapeMenu>
                                <CollapeMenu>
                                    <ListItemText sx={{pl:1}} primary={'Break Even'} />
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/breakeven/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl: 2}} primary={'Break Even'} />
                                            </ListItemButton>
                                        </ListItem>
                                        
                                    </List>
                                </CollapeMenu>
                                <CollapeMenu>
                                    <ListItemText sx={{pl:1}} primary={'Cashflow'} />
                                    <List>
                                        <ListItem disablePadding>
                                            <ListItemButton component={NavLink} to={`/cashflow/${budgetId}`} sx={{"&.active": {background:theme => theme.palette.third.main, color:'white'}}}>
                                            <ListItemText sx={{pl:2}} primary={'Cashflow'} />
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </CollapeMenu>
                            </List>
                        </Box>
                <Divider />
            {/* acts like a footer for the side bar */}
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
        {/* open/close hidden sub menu when clicked */}
        <ListItemButton sx={{p:1}} onClick={()=>handleClick()}>
            {/* ListTextItem is passed as props */}
            {props.children[0]} 
            <ListItemIcon>
                {open? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon/> }
              </ListItemIcon>
        </ListItemButton>
        
        {/* collapsable sub menu */}
        <Collapse in={open} timeout="auto" unmountOnExit>
            {props.children[1]}
        </Collapse>
        </>
    )

}