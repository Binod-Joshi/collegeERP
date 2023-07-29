import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import CountUp from "react-countup";
import "./AdminHome.css";
import { useDispatch, useSelector } from "react-redux";
import Students from "../../../assets/students.png";
import Classes from "../../../assets/courses.png";
import Teachers from "../../../assets/teachers.png";
import Fees from "../../../assets/Fees.png";
import { useEffect } from "react";
import {
  ShowStudentsList,
  ShowTeachersList,
} from "../../../store/userRelated/userHandle";
import { totalCourses } from "../../../store/courseRelated/courseHandle";
import ShowNotice from "../../toast/ShowNotice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdminHome = () => {
  const { currentUser, studentsList, teachersList } = useSelector(
    (state) => state.user
  );
  const { coursesList } = useSelector((state) => state.course);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ShowStudentsList(currentUser));
    dispatch(totalCourses(currentUser));
    dispatch(ShowTeachersList(currentUser));
  }, []);

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Classes} alt="Courses" />
              <Title>Total Classes/Sections</Title>
              <Data start={0} end={coursesList?.length} duration={2} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Teachers} alt="Teachers" />
              <Title>Total Teachers</Title>
              <Data start={0} end={teachersList?.length} duration={2} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Students} alt="Students" />
              <Title>Total Students</Title>
              <Data start={0} end={studentsList?.length} duration={2} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Fees} alt="Fees" />
              <Title>Fees Collection</Title>
              <Data start={0} end={21000} duration={2} prefix="$" />{" "}
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <ShowNotice />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

const StyledPaper = styled(Paper)`
  padding: 16px;
  display: flex;
  flex-direction: column;
  height: 200px;
  justify-content: space-between;
  align-items: center;
  text-align: center;
`;

const Image = styled.img`
  width: 80px; /* Adjust the width as needed */
  height: 80px; /* Adjust the height as needed */
`;

const Title = styled.p`
  font-size: 1.25rem;
`;

const Data = styled(CountUp)`
  font-size: calc(1.3rem + 0.6vw);
  color: green;
`;

export default AdminHome;
