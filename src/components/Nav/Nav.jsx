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
import LoginButton from '../LogInButton/LoginButton';

function Nav({ drawerWidth }) {
  const user = useSelector((store) => store.user);
  const open = useSelector((store)=> store.sideNav);
  const history = useHistory();
  const location = useLocation();

  // list of routes where side bar is not accessable (available)
  const listOfRoutes = [
    `/user`,
    `/info`,
    `/about`,
    `/home`,
    `/login`,
    `/registration`,
    `/plans`
  ]
  
  const dispatch = useDispatch();
    function toggleDrawer() {
        dispatch({
            type: 'TOGGLE_SIDE_NAV'
        })
    }

  // AppBar wrapper to move the app bar to the right when drawer opens
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
  })(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: listOfRoutes.includes(location.pathname) ? `calc(10%-${drawerWidth}px)` : `calc(100%)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));

  return (
    <AppBar position="fixed" open={open} >
      < Container maxWidth='xl' >
        <Toolbar disableGutters sx={{display: 'flex', alignItems: 'right', justifyContent:'space-between'}}>
              {/* Menu Icon */}
              {!listOfRoutes.includes(location.pathname) &&
              <Box>
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

              {/*Logo  */}
              {!open&&<Box>
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
            </Box>}

            {open ?
            <>
            <Container>
              <Box sx={{display:'flex', backgroundColor:'#fff', alignItems:'center'}}>
                  <Button 
                  onClick={() => {
                    history.push('/home');
                  }}>
                  Home
                </Button>

                {user.id &&
                <Button
                onClick={() => {
                  history.push('/budget');
                }}>Plans</Button>}

                <Button
                onClick={() => {
                  history.push('/about');
                }}>About</Button>

                {user.id &&<Button
                onClick={() => {
                  history.push('/info');
                }}>info</Button>}
                  
              </Box>

              
            </Container>
            <Box sx={{ flexGrow: 1 }}>
                {user.id ? <LogOutButton/> :
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={()=>history.push('/login')}>
                    Log In
                  </Button>
                }
            </Box>
            
            </>:
            <>
              <Box>
                <Box sx={{display:'flex', backgroundColor:'#fff', alignItems:'center', justifyContent:'center'}}>
                    <Button 
                    onClick={() => {
                      history.push('/home');
                    }}>
                    Home
                  </Button>

                  {user.id &&
                  <Button
                  onClick={() => {
                    history.push('/budget');
                  }}>Plans</Button>}

                  <Button
                  onClick={() => {
                    history.push('/about');
                  }}>About</Button>

                  {user.id &&<Button
                  onClick={() => {
                    history.push('/info');
                  }}>info</Button>}
                    
                </Box>
              </Box>
          
              <Box sx={{ flexGrow: 0 }}>
                {user.id ? <LogOutButton/> :
                  <Button
                    color='secondary'
                    variant='contained'
                    onClick={()=>history.push('/login')}>
                    Log In
                  </Button>
                }
              </Box>
            </>}
            
        </Toolbar>
      </Container>
    </AppBar >

  )
}

export default Nav;
