import React, { useState } from "react";
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  List,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {
  styled,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
} from "@mui/material";

import {
  Divider,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

import Logout from "../../form/Logout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import FacultyProfile from "./FacultyProfile";
import FacultyHome from "../facultyhome/FacultyHome";
import FacultyCourse from "./facultycourse/FacultyCourse";
import Attendance from "./facultycourse/Attendance";
import ViewAM from "./facultycourse/ViewAM";
import Mark from "./facultycourse/Mark";
import FacultySideDrawer from "./facultycourse/FacultySideDrawer";
import FacultyNotice from "./facultycourse/FacultyNotice";

const AdminDrawer = () => {
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
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

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar open={open} position="absolute">
          <Toolbar sx={{ pr: "24px" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
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
              Faculty Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer
          variant="permanent"
          open={open}
          sx={open ? styles.drawerStyled : styles.hideDrawer}
        >
          <Toolbar sx={styles.toolBarStyled}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
              <FacultySideDrawer/>
          </List>
        </Drawer>

        <Box component="main" sx={styles.boxStyled}>
          <Toolbar />
          <Routes>
            <Route path="/" element={<FacultyHome />} />
            <Route path="/teacherhome" element={<FacultyHome />} />
            <Route path="/teachercourse" element={<FacultyCourse />} />
            <Route path="/attendence/:id/:name" element={<Attendance />} />
            <Route path="/viewattendancemark/:id/:name" element={<ViewAM />} />
            <Route path="/mark/:id/:name" element={<Mark />} />
            <Route path="/teachernotice" element={<FacultyNotice />} />
            <Route path="/teacherprofile" element={<FacultyProfile />} />
            <Route path="/teacherlogout" element={<Logout />} />
            <Route path="*" element={<Navigate to="/teacherhome" />} />
          </Routes>
        </Box>
      </Box>
    </>
  );
};

export default AdminDrawer;

const styles = {
  boxStyled: {
    backgroundColor: (theme) =>
      theme.palette.mode === "light"
        ? theme.palette.grey[100]
        : theme.palette.grey[900],
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  toolBarStyled: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    px: [1],
  },
  drawerStyled: {
    display: "flex",
  },
  hideDrawer: {
    display: "flex",
    "@media (max-width: 600px)": {
      display: "none",
    },
  },
};
