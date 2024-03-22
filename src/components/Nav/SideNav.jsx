import { AppBar, Box, Collapse, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from "@mui/material";
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
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function SideNav({open, toggleDrawer,drawerWidth}) {
    const theme = useTheme();
    const user = useSelector((store) => store.user);
    const location = useLocation();
    console.log(location.pathname);
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
            width: drawerWidth/3,
            flexShrink: 1,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
          onClose={toggleDrawer}
        >
          <DrawerHeader>
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
            <IconButton onClick={toggleDrawer}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <Box sx={{ width: 330 }} role="presentation" >
                    <List>
                        <CollapeMenu>
                            <ListItemText primary={'Personal Budget'} />
                            <List>
                                <ListItem >
                                    <ListItemButton component={NavLink} to="/startplan" sx={{"&.active": {background:'#5d5179', color:'white'}}}  >
                                    <ListItemText primary={'Start a Plan'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}}>
                                    <ListItemButton component={NavLink} to="/fundamentalexpenses" sx={{"&.active": {background:'#5d5179', color:'white'}}}  >
                                    <ListItemText primary={'Fudamental Living Expense'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton component={NavLink} to="/personalsavings" sx={{"&.active": {background:'#5d5179', color:'white'}}} >
                                    <ListItemText primary={'Regular Financial Responsibilities'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton component={NavLink} to="/futureplans" sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Future Plans'}  />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton component={NavLink} to="/otherexpenses" sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Other Expenses'}  />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText primary={'Business Income'} />
                            <List>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton>
                                    <ListItemText primary={'Contractor'} />
                                    </ListItemButton>
                                </ListItem>
                                
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText primary={'Business Expense'} />
                            <List>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton component={NavLink} to="/businessexpensepage1" sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Businsess Expense Page 1'} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton component={NavLink} to="/businessexpensepage2" sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Businsess Expense Page 2'} />
                                    </ListItemButton>
                                </ListItem>
                                
                            </List>
                        </CollapeMenu>
                        <CollapeMenu>
                            <ListItemText primary={'Break Even'} />
                            <List>
                                <ListItem sx={{pl:'15px'}} disablePadding>
                                    <ListItemButton component={NavLink} to="/budget/breakeven" sx={{"&.active": {background:'#5d5179', color:'white'}}}>
                                    <ListItemText primary={'Break Even'} />
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

// // takes in a list of items as props
// // lists the items in a drop down style
// const NavDrawer = ({menuList})=>{
//     const [open, setOpen] = useState(false);

//     const toggleDrawer = (newOpen) => {
//         setOpen(newOpen);
//     };
    
//     return(
//         <>
//             <IconButton onClick={()=>toggleDrawer(true)}>
//                 <MenuIcon/>
//             </IconButton>
//             <Drawer open={open} onClose={()=>toggleDrawer(false)}
//         anchor="left">
            
//                 <Typography
//             variant="h6"
//             noWrap
//             component="a"
//             href="#/"
//             sx={{
//               mr: 2,
//               display: { xs: 'none', md: 'flex' },
//               fontWeight: 900,
//               color: 'inherit',
//               textDecoration: 'none',
//             }}
//           >
//             The DAMN Plan
//           </Typography>
//                 <Box sx={{ width: 250 }} role="presentation" >
//                     {/* <IconButton onClick={()=>toggleDrawer(false)}>
//                         <MenuIcon/>
//                     </IconButton> */}
//                     <List>
//                         <CollapeMenu>
//                             <ListItemText primary={'Personal Budget'} />
//                             {/* 'Fudamental Living Expense', 'Regular Finacial Responsibilities', 'Other Expenses', 'Future Plans' */}
//                             <List>
//                                 <ListItem sx={{pl:'15px'}} disablePadding>
//                                     <ListItemButton>
//                                     <ListItemText primary={'Fudamental Living Expense'} />
//                                     </ListItemButton>
//                                 </ListItem>
//                                 <ListItem sx={{pl:'15px'}} disablePadding>
//                                     <ListItemButton>
//                                     <ListItemText primary={'Regular Finacial Responsibilities'} />
//                                     </ListItemButton>
//                                 </ListItem>
//                                 <ListItem sx={{pl:'15px'}} disablePadding>
//                                     <ListItemButton>
//                                     <ListItemText primary={'Other Expenses'} />
//                                     </ListItemButton>
//                                 </ListItem>
//                                 <ListItem sx={{pl:'15px'}} disablePadding>
//                                     <ListItemButton>
//                                     <ListItemText primary={'Future Plans'} />
//                                     </ListItemButton>
//                                 </ListItem>
//                             </List>
//                         </CollapeMenu>

//                         <CollapeMenu>
//                             <ListItemText primary={'Business Income'} />
//                             <List>
//                                 <ListItem sx={{pl:'15px'}} disablePadding>
//                                     <ListItemButton>
//                                     <ListItemText primary={'Contractor'} />
//                                     </ListItemButton>
//                                 </ListItem>
                                
//                             </List>
//                         </CollapeMenu>
//                         <CollapeMenu>
//                             <ListItemText primary={'Business Expense'} />
//                             <List>
//                                 <ListItem sx={{pl:'15px'}} disablePadding>
//                                     <ListItemButton>
//                                     <ListItemText primary={'Contractor'} />
//                                     </ListItemButton>
//                                 </ListItem>
                                
//                             </List>
//                         </CollapeMenu>
//                     </List>
//                 </Box>
//             </Drawer>
            
//         </>
//     )
   
      

// }