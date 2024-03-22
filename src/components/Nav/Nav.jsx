import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import AppBar from '@mui/material/AppBar';
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

function Nav() {
  const user = useSelector((store) => store.user);
  const location = useLocation();
  const history = useHistory();
  console.log(location);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <AppBar position="static">
      < Container maxWidth="xl" >
        <Toolbar disableGutters>
          {location.pathname == "/startplan" && <SideNav/>}
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

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            {user.id && (
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={() => {
                    history.push('/dashboard');
                    handleCloseNavMenu();
                  }} textAlign="center">Home</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={() => {
                    handleOpen();
                    handleCloseNavMenu();
                  }} textAlign="center">New Budget</Typography>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                  <Typography onClick={() => {
                    history.push('/multiplayer');
                    handleCloseNavMenu();
                  }} textAlign="center">About</Typography>
                </MenuItem>
              </Menu>
            )}
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 900,
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            The DAMN Plan
          </Typography>
          {user.id && (

            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                onClick={() => {
                  history.push('/home');
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                Home
              </Button>
              <Button
                onClick={() => {
                  history.push('/budget');

                  handleCloseNavMenu();
                }}

                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                New Budget
              </Button>
              <Button
                onClick={() => {
                  history.push('/about');
                  handleCloseNavMenu();
                }}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                About
              </Button>
            </Box>
          )}

          <Box sx={{ flexGrow: 0 }}>
            {user.id ? <LogOutButton /> : ''}
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >

              <MenuItem onClick={() => {
                history.push('/login');
                handleCloseUserMenu();
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
