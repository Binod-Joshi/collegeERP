import React, { useState } from 'react';
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  List,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {
  styled,
  Drawer as MuiDrawer,
  AppBar as MuiAppBar,
} from '@mui/material';

import { Divider, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import HomeIcon from "@mui/icons-material/Home";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import AssignmentIcon from '@mui/icons-material/Assignment'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AddCourse from "./AddCourse"
import Logout from "../../form/Logout";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AdminHome from '../adminhome/AdminHome';
import AddStudent from './AddStudent';
import AddTeacher from "./AddTeacher"
import ShowCourses from './ShowCourses';
import ShowStudents from './ShowStudents';
import ChooseCourse from './ChooseCourse';
import ChooseAddTeacher from './choosecoursetoaddteacher/ChooseAddTeacher';
import ChooseAddStudent from './choosecoursetoaddstudent/ChooseAddStudent';
import ParticularCourseStudents from './ParticularCourseStudents';
import ShowFaculties from "./ShowFaculties";
import AdminProfile from './AdminProfile';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PostAddIcon from '@mui/icons-material/PostAdd';
import StudentDetail from './StudentDetail';
import Help from './Help';
import AdminNotice from './AdminNotice';
import NoteAltIcon from '@mui/icons-material/NoteAlt';


const AdminDrawer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
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

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar open={open} position="absolute"> 
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              Admin Dashboard
            </Typography>
          </Toolbar>
        </AppBar>

        <Drawer variant="permanent" open={open} sx={open ? styles.drawerStyled : styles.hideDrawer}>
                    <Toolbar sx={styles.toolBarStyled}>
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                    <Drawer variant="permanent" open={open} >
          <React.Fragment>
                <ListItemButton component={Link} to="/">
                    <ListItemIcon>
                        <HomeIcon color={(location.pathname === ("/adminhome") || location.pathname === ("/") ) ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/addcourse">
                    <ListItemIcon>
                        <PostAddIcon style={{fontWeight:"bolder",fontSize:"23px"}} color={location.pathname.startsWith('/addcourse') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="add course" />
                </ListItemButton>
                <ListItemButton component={Link} to="/addstudent" >
                    <ListItemIcon>
                        <PersonAddAltIcon  style={{fontWeight:"bolder",fontSize:"23px"}} color={location.pathname.startsWith("/addstudent") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="add student" />
                </ListItemButton>
                <ListItemButton component={Link} to="/addteacher">
                    <ListItemIcon>
                        <GroupAddIcon style={{fontWeight:"bolder",fontSize:"23px"}} color={location.pathname.startsWith("/addteacher") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="add teacher" />
                </ListItemButton>
                <ListItemButton component={Link} to="/showstudent">
                    <ListItemIcon>
                        <PersonOutlineIcon color={location.pathname.startsWith("/showstudent") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Students" />
                </ListItemButton>
                <ListItemButton component={Link} to="/showteachers">
                    <ListItemIcon>
                        <SupervisorAccountOutlinedIcon color={location.pathname.startsWith("/showteachers") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Teachers" />
                </ListItemButton>
                <ListItemButton component={Link} to="/showcourse">
                    <ListItemIcon>
                        <AssignmentIcon color={location.pathname.startsWith("/showcourse") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Courses" />
                </ListItemButton>
                <ListItemButton component={Link} to="/adminnotice">
                    <ListItemIcon>
                        <NoteAltIcon color={location.pathname.startsWith("/adminnotice") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Notice" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/adminprofile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/adminprofile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/adminhelp">
                    <ListItemIcon>
                        <HelpOutlineIcon color={location.pathname.startsWith("/adminhelp") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Help" />
                </ListItemButton>
                <ListItemButton component={Link} to="/adminlogout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/adminlogout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>

            </React.Fragment>
        </Drawer>
                    </List>
                </Drawer>

        
        <Box component="main" sx={ styles.boxStyled }>
            <Toolbar/>
        <Routes>
            {/* <Route path="/" element={<AdminHome />} /> */}
        <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path="/addteacher" element={<AddTeacher/>}/>
          <Route path="/addcourse" element={<AddCourse/>} />
          <Route path="/showcourse" element={<ShowCourses/>} />
          <Route path="/showstudent" element={<ShowStudents/>} />
          <Route path="/showteachers" element={<ShowFaculties/>} />
          <Route path="/chooseCourse/:role" element={<ChooseCourse/>} />
          <Route path="/chooseaddteacher/:id" element={<ChooseAddTeacher/>} />
          <Route path="/chooseaddstudent/:id" element={<ChooseAddStudent/>} />
          <Route path="/particularcoursestudents/:id" element={<ParticularCourseStudents/>}/> 
          <Route path="/studentdetails/:id" element={<StudentDetail/>} />
          <Route path='/adminnotice' element={<AdminNotice/>} />
          <Route path='/adminprofile' element={<AdminProfile/>} />
          <Route path='/adminhelp' element={<Help/>} />
          <Route path='/adminlogout' element={<Logout/>} />
          <Route path="*" element={<Navigate to="/adminhome" />} />
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
          theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
  },
  toolBarStyled: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      px: [1],
  },
  drawerStyled: {
      display: "flex"
  },
  hideDrawer: {
      display: 'flex',
      '@media (max-width: 600px)': {
          display: 'none',
      },
  },
}