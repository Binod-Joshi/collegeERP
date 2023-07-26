import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch, useSelector } from "react-redux";
import AddedSuccessfully from "../toast/AdeddSucessfully";
import { cancelDelete, sendNotice } from "../../store/userRelated/userHandle";

const defaultTheme = createTheme();

const Notice = ({ role }) => {
  const dispatch = useDispatch();
  const { currentUser, status, response } = useSelector((state) => state.user);
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let notice = data.get("Notice");
    let collegeid;
    if (role === "Admin") {
      collegeid = currentUser?._id;
    } else if (role === "Teacher") {
      collegeid = currentUser?.collegeid;
    }else{
      console.log("Not for Student");
    }

    let fields = { notice, role, collegeid };
    dispatch(sendNotice(fields, currentUser));
  };

  React.useEffect(() => {
    if (status === "added") {
      const timeout = setTimeout(() => {
        dispatch(cancelDelete());
      }, 1500);
      return () => clearTimeout(timeout);
    }
  }, [status, response]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="md" style={{ marginTop: "50px" }}>
        <CssBaseline />
        <Box
          md={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Add Notice
          </Typography>
          <Box component="form" onSubmit={handleSubmit} md={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="Notice"
              label="Notice"
              name="Notice"
              autoComplete="Notice"
              autoFocus
              multiline
              rows={15}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Send Notice
            </Button>
          </Box>
          {status === "added" ? <AddedSuccessfully /> : ""}
          {response === "Course already exist" ? (
            <p style={{ color: "red" }}>{response}</p>
          ) : (
            ""
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Notice;
