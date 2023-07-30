import { Box, Button, Paper, TextField, Typography, createTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { ThemeProvider, styled } from 'styled-components';
import { cancelDelete, handleResetPassword } from '../../store/userRelated/userHandle';

const defaultTheme = createTheme();

const ResetPassword = () => {
  const {response,loading} = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [loginClicked, setLoginClicked] = useState(false);
  const [message0, setMessage0] = useState(false);
  const [message1, setMessage1] = useState(false);
  const dispatch = useDispatch();

  const {role} = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginClicked(true);
    if(email === "" || email === null){
      
    }else{
      dispatch(handleResetPassword(email,role));
    }
  };
  const isMobile = useMediaQuery(defaultTheme.breakpoints.down('sm'));
  const boxWidth = isMobile ? '80vw' : '60vw';

  useEffect(() => {
    if(response === "Email sent sucessfully."){
      setMessage1(false);
      setMessage0(true);
      dispatch(cancelDelete());
      const timeout = setTimeout(() => {
        setMessage0(false);
        dispatch(cancelDelete());
      },60000)
      return () => clearTimeout(timeout);
    }else if(response === "user with this email doesn't exist."){
      setMessage0(false);
      setMessage1(true);
      const timeout = setTimeout(() => {
        setMessage1(false);
        dispatch(cancelDelete());
      },2500)
      return () => clearTimeout(timeout);
    }
      
  },[response]);


  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Paper elevation={6}>
          <Box
            sx={{
              width: boxWidth,
              height: "60vh",
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: "center"
            }}
          >
            {/* <Typography variant="h4" sx={{ mb: 2, color: "#2c2143" }}>
              {role} 
            </Typography> */}
            <Typography variant="h7" style={{marginBottom:"30px"}}>
              <h1>Enter your email</h1>
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 2, width: '55vw' }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Enter your email"
                name="email"
                type="email"
                autoComplete="email"
                autoFocus
                error={loginClicked && email === ""}  // Set error prop to show error condition
                helperText={loginClicked && email === "" && 'Email is required'}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ height: '40px',mb:3 }}
              />
              {message0?<p className='courseDetail' style={{color:"green"}}>To reset the password link successfully sent to your gmail.</p>:""}
              {message1?<p className='courseDetail' style={{color:"red"}}>This email doesn't exist</p>:""}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{height: '40px', mt: 4 }}
              >
                {loading?"loading...":"Send"}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </ThemeProvider>
  );
};

export default ResetPassword;

