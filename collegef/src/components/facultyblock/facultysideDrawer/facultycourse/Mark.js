import { useState,useEffect } from "react";
import {
  FormControl,
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
import { cancelDelete, takeMark } from "../../../../store/userRelated/userHandle";
import AddedSucessfull from "../../../toast/AdeddSucessfully"

const defaultTheme = createTheme();
const Mark = () => {
  const { currentUser, response,loading } = useSelector((state) => state.user);
  const [addedMarks, setAddedMarks] = useState(false);
  const [marksObtained, setMarksObtained] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const params = useParams();
  const dispatch = useDispatch();
  const studentname = params.name;
  const student = params.id;

  console.log(marksObtained,totalMarks)

  const handleSubmit = (e) => {
    e.preventDefault();
    const fields ={marksObtained,totalMarks,student}
    dispatch(takeMark(fields,currentUser));

  };
  console.log(response);

  useEffect(() => {
    console.log(response);
    if(response === "mark added sucessfully"){
      setAddedMarks(true)
    const timeout = setTimeout(() => {
      setAddedMarks(false);
      dispatch(cancelDelete());
    }, 1500);
    return() => clearTimeout(timeout);
    }
  },[response]);

  console.log(loading);
  return (
    <>
    { !loading?<div style={{marginTop:"50px"}}>
    <ThemeProvider theme={defaultTheme} >
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
            <TextField 
                style={{marginTop:"30px",}}
                label="TotalMarks"
                type="text"
                value={totalMarks}
                onChange={(event) => setTotalMarks(event.target.value)}
                required

              />
            </FormControl>

            <FormControl fullWidth>
              <TextField 
                style={{marginTop:"30px",}}
                label="Marks Obtained"
                type="text"
                value={marksObtained}
                onChange={(event) => setMarksObtained(event.target.value)}
                required
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Submit Mark
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
  {addedMarks && <AddedSucessfull /> }
  </div>
  </div>: <div className="courseDetail" style={{marginTop:"50px"}}> <h1>Loading...</h1></div>}
    </>
  )
}

export default Mark
