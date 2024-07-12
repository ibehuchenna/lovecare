import React from 'react';
import {
  Box,
  Typography,
  Button,
  Toolbar,
  IconButton,
} from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LogoutIcon from '@mui/icons-material/Logout';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import ProfileForm from './ProfileForm';
import ProfileCard from './ExperienceSkillsCard'
// import ExperienceSkillsCard from './ExperienceSkillsCard';
import ChatIcon from '@mui/icons-material/Chat';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    toast.success("You have been logged out successfully.");
    localStorage.removeItem('token');
    sessionStorage.clear();
    navigate("/");
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: '36px', ...(open && { display: 'none' }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', px: [1] }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItem
              component={Link}
              to="/CareTaker-dashboard"
              sx={{
                padding: open ? '10px' : '10px 0',
                margin: '5px auto',
                borderRadius: '10px',
                transition: 'all 0.3s ease-in-out',
                backgroundColor: open ? 'primary.main' : 'transparent',
                color: open ? '#fff' : 'inherit',
                width: '90%',
                maxWidth: '200px',
                '&:hover': {
                  backgroundColor: open ? 'primary.dark' : 'transparent',
                  transform: open ? 'scale(1.05)' : 'none',
                },
                '&:focus, &:active': {
                  backgroundColor: open ? 'primary.dark' : 'transparent',
                  transform: open ? 'scale(0.95)' : 'none',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ListItemIcon sx={{ color: open ? 'inherit' : 'primary.main', minWidth: 'auto', marginRight: open ? '8px' : '0' }}>
                <HomeIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Home"
                  sx={{ color: 'inherit', '& .MuiTypography-root': { fontWeight: 500 } }}
                />
              )}
            </ListItem>

            <ListItem
              component={Link}
              to="/CareTaker-dashboard/profile"
              sx={{
                padding: open ? '10px' : '10px 0',
                margin: '5px auto',
                borderRadius: '10px',
                transition: 'all 0.3s ease-in-out',
                backgroundColor: open ? 'primary.main' : 'transparent',
                color: open ? '#fff' : 'inherit',
                width: '90%',
                maxWidth: '200px',
                '&:hover': {
                  backgroundColor: open ? 'primary.dark' : 'transparent',
                  transform: open ? 'scale(1.05)' : 'none',
                },
                '&:focus, &:active': {
                  backgroundColor: open ? 'primary.dark' : 'transparent',
                  transform: open ? 'scale(0.95)' : 'none',
                },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ListItemIcon sx={{ color: open ? 'inherit' : 'primary.main', minWidth: 'auto', marginRight: open ? '8px' : '0' }}>
                <PersonIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Profile"
                  sx={{ color: 'inherit', '& .MuiTypography-root': { fontWeight: 500 } }}
                />
              )}
            </ListItem>

            {/* New ListItem for Countdown Room */}
            <ListItem
  component={Link}
  to="/CareTaker-dashboard/CareTaker_Chat" // Adjust the link path as per your application
  sx={{
    padding: open ? '10px' : '10px 0',
    margin: '5px auto',
    borderRadius: '10px',
    transition: 'all 0.3s ease-in-out',
    backgroundColor: open ? 'primary.main' : 'transparent',
    color: open ? '#fff' : 'inherit',
    width: '90%',
    maxWidth: '200px',
    '&:hover': {
      backgroundColor: open ? 'primary.dark' : 'transparent',
      transform: open ? 'scale(1.05)' : 'none',
    },
    '&:focus, &:active': {
      backgroundColor: open ? 'primary.dark' : 'transparent',
      transform: open ? 'scale(0.95)' : 'none',
    },
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }}
>
  <ListItemIcon sx={{ color: open ? 'inherit' : 'primary.main', minWidth: 'auto', marginRight: open ? '8px' : '0' }}>
    <ChatIcon />
  </ListItemIcon>
  {open && (
    <ListItemText
      primary="Chat"
      sx={{ color: 'inherit', '& .MuiTypography-root': { fontWeight: 500 } }}
    />
  )}
</ListItem>
           
            <Divider sx={{ my: 1 }} />
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{
              fontSize: 16,
              fontWeight: 500,
              borderRadius: 10,
              padding: '10px 20px',
              margin: open ? '20px auto' : '10px auto',
              display: 'block',
              backgroundColor: open ? 'primary' : 'transparent',
              color: open ? '#fff' : '#2196f3',
              border: 'none',
              boxShadow: 'none',
              transition: 'all 0.3s ease-in-out',
              maxWidth: 200,
              
              width: open ? '100%' : 'fit-content',
              '&:hover, &:active': {
                color: open ? '#fff' : '#fff',
              },
              '&:hover': {
                transform: 'scale(1.05)',
                backgroundColor: open ? 'red' : 'transparent',
              },
              '&:active': {
                transform: 'scale(0.95)',
              },
            }}
          >
                        {open ? 'Logout' : (
              <LogoutIcon sx={{
                fontSize: 24,
                color: '#2196f3',
                '&:hover': {
                  color: '#d32f2f',
                },
              }} />
            )}
          </Button>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Box
      sx={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '10px',
        flexWrap: 'wrap',
        padding: '20px',
      }}
    >
      <ProfileForm />
      <ProfileCard />
    </Box>

        </Box>
        
      </Box>
    </ThemeProvider>
  );
}

