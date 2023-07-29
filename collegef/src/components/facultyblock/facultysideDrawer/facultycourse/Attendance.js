import { useState,useEffect } from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cancelDelete, takeAttendance } from "../../../../store/userRelated/userHandle";
import AddedSucessfull from "../../../toast/AdeddSucessfully"

const defaultTheme = createTheme();
const Attendance = () => {
  const { currentUser, response,loading } = useSelector((state) => state.user);
  const [addedAttendance, setAddedAttandance] = useState(false);
  const params = useParams();
  const dispatch = useDispatch();
  const studentname = params.name;
  const student = params.id;
  const teacher = currentUser?._id;
  const [status, setStatus] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields ={date,status,teacher,student}
    dispatch(takeAttendance(fields,currentUser));
  };

  useEffect(() => {
    console.log(response);
    if(response === "attendance added sucessfully"){
      setAddedAttandance(true)
    const timeout = setTimeout(() => {
      setAddedAttandance(false);
      dispatch(cancelDelete());
    }, 1500);
    return() => clearTimeout(timeout);
    }
  },[response]);

  console.log(loading);
  return (
    <>
    { !loading? <div >
      <ThemeProvider theme={defaultTheme}  >
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Student Name: {studentname}, Subject:{currentUser?.subject}
            </Typography>
            <Box component="form"  onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Attendance Status
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={status}
                  label="Choose an option"
                  onChange={(event) => setStatus(event.target.value)}
                  required
                >
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <TextField 
                  style={{marginTop:"30px"}}
                  label="Select Date"
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </FormControl>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Take Attendance
              </Button>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
      <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
    {addedAttendance && <AddedSucessfull /> }
    </div>
    </div> : <div className="courseDetail" style={{marginTop:"50px"}}> <h1>Loading...</h1></div>}
    </>
  );
};

export default Attendance;
