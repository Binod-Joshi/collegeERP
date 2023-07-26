// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import {TfiMenu} from "react-icons/tfi";
// import Logout from "../../form/Logout";

// const StudentSideDrawer = () => {
//     const [showPopUp,setShowPopUp] = useState(false);
//     const fields ={showPopUp,setShowPopUp};

//   return (
//     <>
//     <div className="adminDrawer" >
//       <Link
//         className=" aDrawer btn btn-primary"
//         data-bs-toggle="offcanvas"
//         to="#offcanvasExample"
//         role="button"
//         aria-controls="offcanvasExample"
//       >
//         <TfiMenu/>
//       </Link>

//       <div
//         className="offcanvas offcanvas-start"
//         tabIndex="-1"
//         id="offcanvasExample"
//         aria-labelledby="offcanvasExampleLabel"
//       >
//         <div className="offcanvas-header">
//           <h5 className="offcanvas-title" id="offcanvasExampleLabel">
//             Student Section
//           </h5>
//           <button
//             type="button"
//             className="btn-close text-reset"
//             data-bs-dismiss="offcanvas"
//             aria-label="Close"
//           ></button>
//         </div>
//         <div className="offcanvas-body">
//           <div>
//             <ul>
//             <li className = "link">
//               <Link to='/teacherhome' className = "link drawerLink">
//               <div className="drawerlinkcom" data-bs-dismiss="offcanvas"
//             aria-label="Close">Home</div>
//               </Link>
//               </li>
//               <li className = "link">
//               <Link to="/student/attendance" className = "link drawerLink">
//               <div className="drawerlinkcom"  data-bs-dismiss="offcanvas"
//             aria-label="Close">Attendance</div>
//               </Link>
//               </li>
//               <li className = "link">
//               <Link to="/student/mark" className = "link drawerLink">
//               <div className="drawerlinkcom"  data-bs-dismiss="offcanvas"
//             aria-label="Close">Mark</div>
//               </Link>
//               </li>
//               <li className = "link">
//               <Link to="/teacherhome" className = "link drawerLink">
//               <div className="drawerlinkcom"  data-bs-dismiss="offcanvas"
//             aria-label="Close">Profile</div>
//               </Link>
//               </li>
//               <li className = "link">
//               <Link className = "link drawerLink">
//               <div className="drawerlinkcom"  data-bs-dismiss="offcanvas"
//             aria-label="Close" onClick={()=>setShowPopUp(true)}>LOGOUT</div>
//               </Link>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//     <Logout fields ={fields} />
//     </>
//   )
// }

// export default StudentSideDrawer



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
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import {AiOutlineUserAdd} from "react-icons/ai"
import {MdAssignmentAdd} from "react-icons/md"
import Logout from "../../form/Logout";
import ClassIcon from '@mui/icons-material/Class';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StudentHome from '../studenthome/StudentHome';
import AttendanceOfOneSt from './AttendanceOfOneSt';
import MarkOfOneSt from './MarkOfOneSt';
import StudentProfile from './StudentProfile';

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
              Student Dashboard
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
                        <HomeIcon color={(location.pathname === ("/studenthome") || location.pathname === ("/") ) ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/student/attendance">
                    <ListItemIcon>
                        <ClassIcon  color={location.pathname.startsWith('/student/attendance') ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="attendance" />
                </ListItemButton>
                <ListItemButton component={Link} to="/student/mark" >
                    <ListItemIcon>
                        <FormatListNumberedIcon  color={location.pathname.startsWith("/student/mark") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                     <ListItemText primary="mark" />
                </ListItemButton>
            </React.Fragment>
            <Divider sx={{ my: 1 }} />
            <React.Fragment>
                <ListSubheader component="div" inset>
                    User
                </ListSubheader>
                <ListItemButton component={Link} to="/studentprofile">
                    <ListItemIcon>
                        <AccountCircleOutlinedIcon color={location.pathname.startsWith("/studentprofile") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/studentlogout">
                    <ListItemIcon>
                        <ExitToAppIcon color={location.pathname.startsWith("/studentlogout") ? 'primary' : 'inherit'} />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>

            </React.Fragment>
        </Drawer>
                    </List>
                </Drawer>

        
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Routes>
            {/* <Route path="/" element={<AdminDrawer />} /> */}
        <Route path="/studenthome" element={<StudentHome/>} />
        <Route path="/student/attendance" element={<AttendanceOfOneSt/>} />
        <Route path="/student/mark" element={<MarkOfOneSt/>} />
        <Route path='/studentprofile' element={<StudentProfile/>} />
        <Route path='/studentlogout' element={<Logout/>} />
        <Route path="*" element={<Navigate to="/studenthome" />} />
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