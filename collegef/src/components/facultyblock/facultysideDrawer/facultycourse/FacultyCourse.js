import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { SingleCourseStudentDetail } from "../../../../store/userRelated/userHandle";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FacultyCourse = () => {
  const {currentUser,courseStudentsList,loading} = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const course = currentUser?.course;
  const branch = currentUser?.branch;
  const year = currentUser?.year;
  const semester = currentUser?.semester;
  const section = currentUser?.section;
  const subject = currentUser?.subject;
  let collegename = currentUser?.collegeid; 
  console.log(collegename);
  const fields = {course, branch, year, semester, section,collegename};
  console.log(typeof semester);
  

  useEffect(() => {
    dispatch(SingleCourseStudentDetail(fields,currentUser));
  },[])

  console.log(courseStudentsList);

  const attendanceHandler = (id,name) => {
    console.log(id,name);
    navigate(`/attendence/${id}/${name}`);
  }
  const viewHandler = (id,name) => {
    console.log(id,name);
    navigate(`/viewattendancemark/${id}/${name}`);
  }
  const markHandler = (id,name) => {
    console.log(id,name);
    navigate(`/mark/${id}/${name}`);
  }

  console.log(loading);
  return (
    <>
    { !loading? <>
      <div className="courseDetail" >
        <h1>Course Detail</h1>
        <h2>
          Course:{course}, Branch:{branch}, Year:{year}, Semester:{semester},
          Section:{section},Subject:{subject}
        </h2>
      </div>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell align="right" style={{textAlign:"center"}}>
          Name.of.Students&nbsp;(Name)
        </StyledTableCell>
        <StyledTableCell align="right" style={{textAlign:"center"}}>
          Roll.No&nbsp;(roll)
        </StyledTableCell>
        <StyledTableCell align="right" style={{textAlign:"center"}}>Action&nbsp;(Ac)</StyledTableCell>

      </TableRow>
    </TableHead>
    <TableBody>
      {courseStudentsList?.map((student) => (
        <StyledTableRow key={student._id}>
          <StyledTableCell align="right" style={{textAlign:"center"}}>
            {student.username}
          </StyledTableCell>
          <StyledTableCell align="right" style={{textAlign:"center"}}>
            {student.rollNo}
          </StyledTableCell>
          <StyledTableCell align="right" style={{textAlign:"center"}}>
          <Button variant="contained" style={{marginRight:"5px"}} className="" onClick={(e) => viewHandler(student._id,student.username)}>
            View
          </Button>
            <Button variant="contained"  style={{marginRight:"5px"}} onClick={(e) => attendanceHandler(student._id,student.username)}>
            Take Attendance
          </Button>
          <Button variant="contained"  style={{marginRight:"5px"}} onClick={(e) => markHandler(student._id,student.username)}>
            Provide Marks
          </Button>
          </StyledTableCell>
        </StyledTableRow>
      ))}
    </TableBody>
  </Table>
  {/* <PlaygroundSpeedDial actions={actions} /> */}
</TableContainer>
</>: <div className="courseDetail" style={{marginTop:"50px"}}> <h1>Loading...</h1></div>}
    </>
  )
}

export default FacultyCourse
