import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
import Students from "../../../assets/students.png";
import { useEffect } from "react";
import {
  totalAttendanceOfStudent,
  totalTeachersOfStudent,
} from "../../../store/userRelated/userHandle";
import AllSubjectAttendanceS from "../../toast/AllSubjectAttendanceS";
import Piechart from "../../toast/Piechart";
import ShowNotice from "../../toast/ShowNotice";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AdminHome = () => {
  const { currentUser,  studentTeachers , attendanceOfStudentList, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const course = currentUser?.course;
  const branch = currentUser?.branch;
  const year = currentUser?.year;
  const semester = currentUser?.semester;
  const section = currentUser?.section;
  const collegename = currentUser?.collegeid; 
  const fields = {course, branch, year, semester, section,collegename};
  console.log(fields);

  useEffect(() => {
    dispatch(totalTeachersOfStudent(fields, currentUser));
  }, []);

  useEffect(() => {
    dispatch(totalAttendanceOfStudent(currentUser));
  }, [attendanceOfStudentList?.length]);

  const overallAttendance = () => {
    let present = attendanceOfStudentList?.filter((attend) => attend?.status === "Present")?.length;
    const presentPer = attendanceOfStudentList?.length !== 0?(present/attendanceOfStudentList?.length)*100:0;
    return presentPer.toFixed(2);
  }

  const data = [
    {name: "Present" , value:Number(overallAttendance()), fill: '#00C49F'},
    {name: "Absent" , value:100-overallAttendance(), fill: '#FF0000'},
  ]

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 8, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Students} alt="Students" />
              <Title>Total Subjects</Title>
              <Data start={0} end={!loading?studentTeachers:0} duration={1.5} />
            </StyledPaper>
          </Grid>
          <Grid item xs={12} md={3} lg={3}>
            <StyledPaper>
              <Image src={Students} alt="Students" />
              <Title>Total Assignment</Title>
              <Data start={0} end={studentTeachers && studentTeachers>0?5:0} duration={1.5} />
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
