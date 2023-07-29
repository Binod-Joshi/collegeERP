import { Box, Button, Paper, TextField, Typography, createTheme, useMediaQuery } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

const defaultTheme = createTheme();

const ForgetPassword = () => {
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loginClick, setLoginClick] = useState(false);
    const [message, setMessage] = useState(false);
    const {id, token,role} = useParams();
    const history = useNavigate();
    const [messageS, setMessageS] = useState(false);
    const [loader, setLoader] = useState(false);

    const validUser = async() => {
      try {
        let result = await fetch(`http://localhost:5000/api/auth/forgetpassword/${id}/${token}/${role}`,{
        method:"get",
        headers:{
          "Content-Type":"application/json"
        },
      })
      result = await result.json();
      if(result.status === 201){
        console.log("user valid");
      }else{
        console.log("user inValid");
        history("/error")
      }
      } catch (error) {
        console.log(error);
        history("/error")
      }
    }

    useEffect(() => {
      validUser();
    },[])
    
    const handleResetSubmit = async(e) => {
        e.preventDefault();
        console.log(newPassword,confirmPassword);
        setLoginClick(true);
        if(newPassword === confirmPassword){
          setLoader(true);
          let password = confirmPassword;
          try {
            let result = await fetch(`http://localhost:5000/api/auth/sendingnew/${id}/${token}/${role}`,{
            method:"post",
            body:JSON.stringify({password}),
            headers:{
              "Content-Type":"application/json"
            },
          })
          result = await result.json();
          setLoader(false);
          if(result.status === 201){
            console.log("password updated succesfully");
            console.log(result);
            setMessageS(true);
            const timeout = setTimeout(() => {
             setMessageS(false);
             history("/loginadmin");
            },2000)
            return () => clearTimeout(timeout);
            
          }else{
            console.log("Token expired generate new link");
          }
          } catch (error) {
            console.log(error);
            history("/error")
          }
        }else{
          setMessage(true)
          const timeOut = setTimeout(() => {
            setMessage(false);
          },2500);
          return () => clearTimeout(timeOut);
        }
    }
    const isMobile = useMediaQuery(defaultTheme.breakpoints.down('sm'));
    const boxWidth = isMobile ? '90vw' : '60vw';
  
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
            height: "70vh",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: "center"
          }}
        >
          <Typography variant="h7" style={{marginBottom:"30px"}}>
            <h1>Enter your New Password</h1>
          </Typography>
          <Box component="form" noValidate onSubmit={handleResetSubmit} sx={{ mt: 2, width: '55vw' }}>
            <label > New password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Enter your new password"
              name="password"
              type="password"
              autoComplete="password"
              autoFocus
              error={loginClick && newPassword === ""}  // Set error prop to show error condition
              helperText={loginClick && newPassword === "" && 'NewPassword is required'}
              onChange={(e) => setNewPassword(e.target.value)}
              sx={{ height: '40px',mb:5 }}
            />
            <label > Confirm password</label>
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Enter your new password"
              name="password"
              type="password"
              autoComplete="password"
              error={loginClick && confirmPassword === ""}  // Set error prop to show error condition
              helperText={loginClick && confirmPassword === "" && 'confirmPassword is required and must be matched with newPassword'}
              onChange={(e) => setConfirmPassword(e.target.value)}
              sx={{ height: '40px',mb:5 }}
            />
            {message?<p className='courseDetail' style={{color:"red"}}> newPassword and confirmPassword must be matched with each other. </p>:""}
            {messageS?<p className='courseDetail' style={{color:"green"}}> password updated successfully </p>:""}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{height: '40px', mt: 3 }}
            >
              {loader?"loading...":"SEND"}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  </ThemeProvider>
  )
}

export default ForgetPassword
