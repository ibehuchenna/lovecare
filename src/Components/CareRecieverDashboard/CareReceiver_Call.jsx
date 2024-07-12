import React, { useState } from "react";
import "../../main.css";
import uitoolkit from "@zoom/videosdk-ui-toolkit";
import "@zoom/videosdk-ui-toolkit/dist/videosdk-ui-toolkit.css";
import { Box, Typography, Button, Toolbar, IconButton } from "@mui/material";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import { Grid } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LogoutIcon from "@mui/icons-material/Logout";
import CareTakersCardList from "./CareTakersCardList";
import FilterComponent from "./FilterComponent";
import ChatIcon from "@mui/icons-material/Chat";
// import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import NotificationBell from "./NotificationBell";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme();

export default function Profile() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    toast.success("You have been logged out successfully.");
    localStorage.removeItem("token");
    sessionStorage.clear();
    navigate("/");
  };

  const baseUrl = window.location.origin;

  var sessionContainer;
  const authEndpoint = "https://lovecare-backend.onrender.com/generate-token";
  const userName = localStorage.getItem("name");

  const config = {
    videoSDKJWT: "",
    sessionName: "test" + Math.floor(Math.random() * (5 + 1)),
    userName: userName,
    sessionPasscode: "123",
    features: ["video", "audio", "settings", "users", "chat", "share"],
  };
  let role = 1;

  const joinURL = `${baseUrl}/CareRecipent-dashboard/call?session=${config.sessionName}&passcode=${config.sessionPasscode}`;

  function updateConfigFromURL() {
    const searchParams = new URLSearchParams(window.location.search);
  
    const sessionName = searchParams.get("session");
    const sessionPasscode = searchParams.get("passcode");
  
    if (sessionName && sessionPasscode) { // Check for both parameters
      config.sessionName = sessionName;
    } else {
      // Handle scenario where parameters are missing (optional)
      console.warn("Missing session or passcode parameter");
    }
  
    console.log("Updated config:", config);
    console.log("Updated role:", role);
  }
  

  async function getVideoSDKJWT() {
    updateConfigFromURL();

    sessionContainer = document.getElementById("sessionContainer");
    document.getElementById("join-flow").style.display = "none";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionName: config.sessionName,
        role: role,
      }),
    };

    console.log("Request options:", options);

    try {
      const response = await fetch(authEndpoint, options);
      const data = await response.json();
      if (response.ok) {
        console.log(data);
        if (data.signature) {
          console.log(data.signature);
          config.videoSDKJWT = data.signature;
          joinSession();
        } else {
          console.log(data); // Log the response data for troubleshooting
        }
      } else {
        console.error("Error fetching JWT:", response.statusText, response); // Log more details on network error
      }
    } catch (error) {
      console.error("Error fetching JWT:", error);
    }
  }

  function joinSession() {
    if (sessionContainer) {
      // Ensure sessionContainer has a value
      console.log(config);
      console.log(sessionContainer);
      uitoolkit.joinSession(sessionContainer, config);
      uitoolkit.onSessionClosed(sessionClosed);
    } else {
      console.warn("Session container not yet available");
    }
  }

  var sessionClosed = () => {
    console.log("session closed");
    uitoolkit.closeSession(sessionContainer);

    document.getElementById("join-flow").style.display = "block";
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{ marginRight: "36px", ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Care Receiver Dashboard
            </Typography>
            <NotificationBell />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            <ListItem
              component={Link}
              to="/CareRecipent-dashboard"
              sx={{
                padding: open ? "10px" : "10px 0",
                margin: "5px auto",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                backgroundColor: open ? "primary.main" : "transparent",
                color: open ? "#fff" : "inherit",
                width: "90%",
                maxWidth: "200px",
                "&:hover": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(1.05)" : "none",
                },
                "&:focus, &:active": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(0.95)" : "none",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: open ? "inherit" : "primary.main",
                  minWidth: "auto",
                  marginRight: open ? "8px" : "0",
                }}
              >
                <HomeIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Home"
                  sx={{
                    color: "inherit",
                    "& .MuiTypography-root": { fontWeight: 500 },
                  }}
                />
              )}
            </ListItem>

            <ListItem
              component={Link}
              to="/CareRecipent-dashboard/profile"
              sx={{
                padding: open ? "10px" : "10px 0",
                margin: "5px auto",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                backgroundColor: open ? "primary.main" : "transparent",
                color: open ? "#fff" : "inherit",
                width: "90%",
                maxWidth: "200px",
                "&:hover": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(1.05)" : "none",
                },
                "&:focus, &:active": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(0.95)" : "none",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: open ? "inherit" : "primary.main",
                  minWidth: "auto",
                  marginRight: open ? "8px" : "0",
                }}
              >
                <PersonIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Profile"
                  sx={{
                    color: "inherit",
                    "& .MuiTypography-root": { fontWeight: 500 },
                  }}
                />
              )}
            </ListItem>

            <ListItem
              component={Link}
              to="/CareRecipent-dashboard/caretakerCash" // Adjust the link path as per your application
              sx={{
                padding: open ? "10px" : "10px 0",
                margin: "5px auto",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                backgroundColor: open ? "primary.main" : "transparent",
                color: open ? "#fff" : "inherit",
                width: "90%",
                maxWidth: "200px",
                "&:hover": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(1.05)" : "none",
                },
                "&:focus, &:active": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(0.95)" : "none",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: open ? "inherit" : "primary.main",
                  minWidth: "auto",
                  marginRight: open ? "8px" : "0",
                }}
              >
                <MonetizationOnIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="CareTaker Cash"
                  sx={{
                    color: "inherit",
                    "& .MuiTypography-root": { fontWeight: 500 },
                  }}
                />
              )}
            </ListItem>
            <ListItem
              component={Link}
              to="/CareRecipent-dashboard/CareReciever_Chat" // Adjust the link path as per your application
              sx={{
                padding: open ? "10px" : "10px 0",
                margin: "5px auto",
                borderRadius: "10px",
                transition: "all 0.3s ease-in-out",
                backgroundColor: open ? "primary.main" : "transparent",
                color: open ? "#fff" : "inherit",
                width: "90%",
                maxWidth: "200px",
                "&:hover": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(1.05)" : "none",
                },
                "&:focus, &:active": {
                  backgroundColor: open ? "primary.dark" : "transparent",
                  transform: open ? "scale(0.95)" : "none",
                },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ListItemIcon
                sx={{
                  color: open ? "inherit" : "primary.main",
                  minWidth: "auto",
                  marginRight: open ? "8px" : "0",
                }}
              >
                <ChatIcon />
              </ListItemIcon>
              {open && (
                <ListItemText
                  primary="Community"
                  sx={{
                    color: "inherit",
                    "& .MuiTypography-root": { fontWeight: 500 },
                  }}
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
              padding: "10px 20px",
              margin: open ? "20px auto" : "10px auto",
              display: "block",
              backgroundColor: open ? "primary" : "transparent",
              color: open ? "#fff" : "#2196f3",
              border: "none",
              boxShadow: "none",
              transition: "all 0.3s ease-in-out",
              maxWidth: 200,
              width: open ? "100%" : "fit-content",
              "&:hover, &:active": {
                color: open ? "#fff" : "#fff",
              },
              "&:hover": {
                transform: "scale(1.05)",
                backgroundColor: open ? "red" : "transparent",
              },
              "&:active": {
                transform: "scale(0.95)",
              },
            }}
          >
            {open ? (
              "Logout"
            ) : (
              <LogoutIcon
                sx={{
                  fontSize: 24,
                  color: "#2196f3",
                  "&:hover": {
                    color: "#d32f2f",
                  },
                }}
              />
            )}
          </Button>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />

          <div className="App">
            <main>
              <div id="join-flow">
                <h1>Zoom Video SDK Sample React</h1>
                <p>User interface offered by the Video SDK UI Toolkit</p>
                <button onClick={getVideoSDKJWT}>Join Session</button>
                {joinURL && (
                  <div>
                    <p>Share this link to invite others:</p>
                    <a href={joinURL}>{joinURL}</a>
                  </div>
                )}
              </div>
              <div id="sessionContainer"></div>
            </main>
          </div>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
