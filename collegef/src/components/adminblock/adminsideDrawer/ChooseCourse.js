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
import { useNavigate, useParams } from "react-router-dom";
import "./AddStudent.css";
import { totalCourses } from "../../../store/courseRelated/courseHandle";

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

const ChooseCourse = () => {
    const { currentUser} = useSelector((state) => state.user);
    const { coursesList,loading} = useSelector((state) => state.course);
    const [courseId, setCourseId] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const role = useParams()?.role;
    
    useEffect(() => {
        dispatch(totalCourses(currentUser));
      }, []);
  
    const chooseHandler = (course) => {
            setCourseId(course._id);

            try {
              if(role === "teachers"){
                navigate(`/chooseaddteacher/${course?._id}`);
              }else if(role === "students"){
                navigate(`/chooseaddstudent/${course?._id}`);
              }
            } catch (error) {
              console.log(error);
            }       
    }


  return (
    <>
    {!loading? <TableContainer component={Paper}>
    <Table sx={{ minWidth: 700 }} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Course</StyledTableCell>
          <StyledTableCell align="right">Branch</StyledTableCell>
          <StyledTableCell align="right">Year&nbsp;(yrs)</StyledTableCell>
          <StyledTableCell align="right">Semester&nbsp;(sem)</StyledTableCell>
          <StyledTableCell align="right">Section&nbsp;(sec)</StyledTableCell>
          <StyledTableCell align="right">Action&nbsp;(Ac)</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {coursesList?.map((course) => (
          <StyledTableRow key={course._id}>
            <StyledTableCell component="th" scope="row">
              {course?.course}
            </StyledTableCell>
            <StyledTableCell align="right">{course?.branch}</StyledTableCell>
            <StyledTableCell align="right">{course.year}</StyledTableCell>
            <StyledTableCell align="right">
              {course.semester}
            </StyledTableCell>
            <StyledTableCell align="right">{course.section}</StyledTableCell>
            <StyledTableCell align="right">
              <button className="chooseButton"
               onClick={(e) => chooseHandler(course)}
              >CHOOSE</button>
            </StyledTableCell>
          </StyledTableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer> : <h1 className="courseDetail" style={{marginTop:"50px"}}> loading... </h1> }
  </>
  )
}

export default ChooseCourse
