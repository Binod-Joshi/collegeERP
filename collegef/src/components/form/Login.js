import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Box, Typography, Paper, Checkbox, FormControlLabel, TextField, CssBaseline, IconButton, InputAdornment, CircularProgress, Backdrop } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import students from "../../assets/students.png"
import teachers from "../../assets/teacher.png"
import admins from "../../assets/management.png"
import styled from 'styled-components';
import { cancelDelete, loginUser } from '../../store/userRelated/userHandle';

const defaultTheme = createTheme();

const Login = ({role}) => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [loader, setLoader] = useState(false);
    const [loaderGuest, setLoaderGuest] = useState(false);
    const [message,setMessage] = useState(false);
    const [toggle, setToggle] = useState(false);
    const [loginClicked, setLoginClicked] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    let updatedRole = role.charAt(0).toLowerCase() + role.slice(1);

    const {status,response,currentUser,currentRole,error,} = useSelector(state => state.user);

    useEffect(() => {
      if(status === "success"){
        setLoader(false);
        setLoaderGuest(false);
        navigate(`/${updatedRole}home`)
      }else if(status === "failed"){
        setLoader(false);
        setLoaderGuest(false);
        setMessage(response);
        setTimeout(() => {
        setMessage("")
        dispatch(cancelDelete())
    }, 5000);
      }else if(status === "error"){
        setLoader(false);
        setLoaderGuest(false);
        setMessage("server busy.try after some time");
        setTimeout(() => {setMessage("")
        dispatch(cancelDelete())}, 5000);
      }
    },[status,currentUser,currentRole, navigate, error, response])

    const fields ={email,password};

    const handleSubmit = async(e) => {
      e.preventDefault();
      setLoader(true);
      dispatch(loginUser(fields,role));
      setLoginClicked(true);
    }

    const GuestHandler = () => {
      const password = "1234"
      if(role === "Admin"){
        const email = "b@gmail.com";
        const fields ={email,password};
        setLoaderGuest(true);
        dispatch(loginUser(fields,role));
      }else if(role === "Teacher"){
        const email = "j@gmail.com";
        const fields ={email,password};
        setLoaderGuest(true);
        dispatch(loginUser(fields,role));
      }else if(role === "Student"){
        const email = "a@gmail.com";
        const fields ={email,password};
        setLoaderGuest(true);
        dispatch(loginUser(fields,role));
      }
    }

  return (
  <ThemeProvider theme={defaultTheme}>
  <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
              sx={{
                  my: 8,
                  mx: 4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
              }}
          >
              <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
                  {role} Login
              </Typography>
              <Typography variant="h7">
                  Welcome back! Please enter your details
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                          margin="normal"
                          required
                          fullWidth
                          id="email"
                          label="Enter your email"
                          name="email"
                          autoComplete="email"
                          autoFocus
                          error={loginClicked && email === ""}  // Set error prop to show error condition
                          helperText={loginClicked && email === "" && 'Email is required'}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={toggle ? 'text' : 'password'}
                      id="password"
                      autoComplete="current-password"
                      error={loginClicked && password === ""}  // Set error prop to show error condition
                      helperText={loginClicked && password === "" && 'Password is required'}
                      onChange={(e) => setPassword(e.target.value)}
                      InputProps={{
                          endAdornment: (
                              <InputAdornment position="end">
                                  <IconButton onClick={() => setToggle(!toggle)}>
                                      {toggle ? (
                                          <Visibility />
                                      ) : (
                                          <VisibilityOff />
                                      )}
                                  </IconButton>
                              </InputAdornment>
                          ),
                      }}
                  />
                  {message && <p className='errorlogin courseDetail' style={{color:"red",marginTop:"5px"}}>{message}</p>}
                  <Grid container sx={{ display: "flex", justifyContent: "space-between" }}>
                      <FormControlLabel
                          control={<Checkbox value="remember" color="primary" />}
                          label="Remember me"
                      />
                      <StyledLink to={`/resetpassword/${role}`}>
                          Forgot password?
                      </StyledLink>
                  </Grid>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3 }}
                  >
                      {loader ?
                          <CircularProgress size={24} color="inherit" />
                          : "Login"}
                  </Button>
                  <Button
                      fullWidth
                      onClick={GuestHandler}
                      variant="outlined"
                      sx={{ mt: 2, mb: 3, color: "#7f56da", borderColor: "#7f56da" }}
                  >
                      Login as Guest
                  </Button>
                  {role === "Admin" &&
                      <Grid container>
                          <Grid>
                              Don't have an account?
                          </Grid>
                          <Grid item sx={{ ml: 2 }}>
                              <StyledLink to="/registeradmin">
                                  Sign up
                              </StyledLink>
                          </Grid>
                      </Grid>
                  }
              </Box>
          </Box>
      </Grid>
      <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${
              role === "Admin"
                  ? admins
                  : role === "Teacher"
                  ? teachers
                  : students
          })`,
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                  t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
          }}
      />
  </Grid>
  <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={loaderGuest}
  >
      <CircularProgress color="primary" />
      Please Wait
  </Backdrop>
</ThemeProvider>

  )
}

export default Login

const StyledLink = styled(Link)`
  margin-top: 9px;
  text-decoration: none;
  color: #7f56da;
`;
