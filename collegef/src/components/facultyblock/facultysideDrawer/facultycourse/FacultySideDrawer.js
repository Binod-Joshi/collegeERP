import React from 'react'
import {
    Divider,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListSubheader,
  } from "@mui/material";
  import { Link, useLocation } from "react-router-dom";
  
  import HomeIcon from "@mui/icons-material/Home";
  import ExitToAppIcon from "@mui/icons-material/ExitToApp";
  import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
  import AssignmentIcon from "@mui/icons-material/Assignment";
  import NoteAltIcon from '@mui/icons-material/NoteAlt';

const FacultySideDrawer = () => {
    const location = useLocation();
  return (
    <>
      <React.Fragment>
                <ListItemButton component={Link} to="/">
                  <ListItemIcon>
                    <HomeIcon
                      color={
                        (location.pathname === ("/teacherhome") || location.pathname === ("/") )
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Home" />
                </ListItemButton>
                <ListItemButton component={Link} to="/teachercourse">
                  <ListItemIcon>
                    <AssignmentIcon
                      color={
                        location.pathname.startsWith("/teachercourse")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Courses" />
                </ListItemButton>
                <ListItemButton component={Link} to="/teachernotice">
                  <ListItemIcon>
                    <NoteAltIcon
                      color={
                        location.pathname.startsWith("/teachernotice")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Notice" />
                </ListItemButton>
              </React.Fragment>
              <Divider sx={{ my: 1 }} />
              <React.Fragment>
                <ListSubheader component="div" inset>
                  User
                </ListSubheader>
                <ListItemButton component={Link} to="/teacherprofile">
                  <ListItemIcon>
                    <AccountCircleOutlinedIcon
                      color={
                        location.pathname.startsWith("/teacherprofile")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Profile" />
                </ListItemButton>
                <ListItemButton component={Link} to="/teacherlogout">
                  <ListItemIcon>
                    <ExitToAppIcon
                      color={
                        location.pathname.startsWith("/teacherlogout")
                          ? "primary"
                          : "inherit"
                      }
                    />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItemButton>
              </React.Fragment>
    </>
  )
}

export default FacultySideDrawer
