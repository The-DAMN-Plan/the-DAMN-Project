import React from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom/cjs/react-router-dom.min';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import SideNav from './SideNav';
import { Grid } from '@mui/material';

function Nav({ drawerWidth }) {
  const user = useSelector((store) => store.user);
  const open = useSelector((store)=> store.sideNav);
  let { budgetId } = useParams();
  
  const history = useHistory();
  const location = useLocation();
  console.log(location);
  console.log(budgetId);
  console.log(history);

  // list of routes where side bar is available for the user
  const listOfRoutes = [
    `/user`,
    `/info`,
    `/about`,
    `/home`,
    `/login`,
    `/registration`

  ]
  
  const dispatch = useDispatch();
    function toggleDrawer() {
        dispatch({
            type: 'TOGGLE_SIDE_NAV'
        })
        
    }

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: listOfRoutes.includes(location.pathname) ? `calc(100%-${drawerWidth}px)` : `calc(100%)`,
      marginLeft: `${0}px`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  // width: listOfRoutes.includes(location.pathname) ? `calc(108% - ${drawerWidth}px)` : `calc(100%)`,

  return (
    <AppBar position="fixed" open={open} >
      < Container  maxWidth='xl' >
        <Toolbar disableGutters sx={{display: 'flex', alignItems: 'right', justifyContent:'left'}}>
                {/* {listOfRoutes.includes(location.pathname) && <> 
              <Box sx={{backgroundColor: 'blue'}}> 
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={()=>toggleDrawer()}
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
              <SideNav drawerWidth={drawerWidth}/>
              </Box>
              </> } */}

              {/* {!open &&
              <Box>
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
              </Box>
              } */}
              {/* {!open &&
              <Box>
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
              </Box>
              } */}


            {/* {user.id && (
            <Box sx={{flexGrow: 0.5, backgroundColor: 'white' , display: {sm:'none', md: 'flex' }, alignItems:'center', justifyContent:'center'}}>
                  <Button
                  onClick={() => {
                    history.push('/home');
                  }}>
                  Home
                </Button>

                  
                  <Button
                  onClick={() => {
                    history.push('/budget');
                  }}

    
                >
                  New Budget
                </Button>
                
                  
                  <Button
                  onClick={() => {
                    history.push('/about');
                  }}
                >
                  About
                </Button>
                </Box>
            
            
                
                

              )} */}

              {!listOfRoutes.includes(location.pathname) &&<Box>
               <> 
                    <IconButton
                      color="inherit"
                      aria-label="open drawer"
                      onClick={()=>toggleDrawer()}
                      sx={{ ...(open && { display: 'none' }) }}
                    >
                      <MenuIcon />
                    </IconButton>
                    <SideNav drawerWidth={drawerWidth}/>
                </>
              </Box>}
              <Box>
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
            </Box>
            

              

              <Box>
              {user.id && (
                <Box sx={{display:'flex', backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
                
                    <Button 
                    onClick={() => {
                      history.push('/home');
                    }}>
                    Home
                  </Button>

                    
                    <Button
                    onClick={() => {
                      history.push('/budget');
                    }}

      
                  >
                    New Budget
                  </Button>
                  
                    
                    <Button
                    onClick={() => {
                      history.push('/info');
                    }}
                  >
                    info
                  </Button>
                    
                </Box>
              )}
              </Box>

          
          
          {/* <Container sx={{ backgroundColor: 'red', display: 'flex', alignItems: 'center', justifyContent:'center'}}> */}
          {/* {user.id && (

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => {
                  history.push('/home');
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  history.push('/budget');
                }}

                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Plans
              </Button>
              <Button
                onClick={() => {
                  history.push('/about');
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
              </Button>
            </Box>
            )} */}
          {/* </Container> */}
          
            <Box sx={{ flexGrow: 0 }}>
              {user.id ? <LogOutButton /> : ''}
              <Menu
                id="menu-appbar"
              >

                <MenuItem onClick={() => {
                  history.push('/login');
                }}>
                  <Typography textAlign="center">Log Out</Typography>
                </MenuItem>

              </Menu>
            </Box>
        </Toolbar>
      </Container >
    </AppBar >

  )
}

export default Nav;
