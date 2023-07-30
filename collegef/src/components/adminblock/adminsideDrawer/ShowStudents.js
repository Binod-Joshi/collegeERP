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
import { ShowStudentsList, setDeletedComponents } from "../../../store/userRelated/userHandle";
import PlaygroundSpeedDial from "../../toast/Speeddial";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import DeleteConfirm from "../../toast/DeleteConfirm";

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

const ShowStudents = () => {
  const { currentUser, studentsList,deleteComponent,loading } = useSelector((state) => state.user);
  const [selectedId, setSelectedId] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const role = "students"

  // Group the data by the combination of course, branch, year, semester, and section ans noOfStudents property

  const groupedData = Array.from(
    new Set(
      studentsList?.map(
        (item) =>
          `${item.course}-${item.branch}-${item.year}-${item.semester}-${item.section}`
      )
    )
  ).map((key) => {
    const matchingItems = studentsList?.filter(
      (item) =>
        `${item.course}-${item.branch}-${item.year}-${item.semester}-${item.section}` ===
        key
    );
    const noOfStudents = matchingItems.length;

    return {
      ...matchingItems[0], // Take the first matching item as the base
      noOfStudents,
    };
  });

  useEffect(() => {
    dispatch(ShowStudentsList(currentUser));
    if(deleteComponent === false){
      setSelectedId("");
    }
  }, [deleteComponent]);

  const actions = [
    {
        icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
        action: () => navigate(`/ChooseCourse/${role}`)
    },
    {
        icon: <PersonRemoveIcon color="error" />, name: 'Delete All Students',
        action: () => deleteHandler()
    },
];

const deleteHandler =() => {
  dispatch(setDeletedComponents());
}

const viewHandler = (e,id) => {
  navigate(`/particularcoursestudents/${id}`);
  e.preventDefault();
}

  return (
    <>
    {!loading?<>
    {!deleteComponent && <TableContainer component={Paper} >
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Course</StyledTableCell>
            <StyledTableCell align="right">Branch</StyledTableCell>
            <StyledTableCell align="right">Year&nbsp;(yrs)</StyledTableCell>
            <StyledTableCell align="right">Semester&nbsp;(sem)</StyledTableCell>
            <StyledTableCell align="right">Section&nbsp;(sec)</StyledTableCell>
            <StyledTableCell align="right">
              No.of.Students&nbsp;(Num)
            </StyledTableCell>
            <StyledTableCell align="right">Action&nbsp;(Ac)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {groupedData?.map((student) => (
            <StyledTableRow key={student?._id}>
              <StyledTableCell component="th" scope="row">
                {student?.course}
              </StyledTableCell>
              <StyledTableCell align="right">{student.branch}</StyledTableCell>
              <StyledTableCell align="right">{student.year}</StyledTableCell>
              <StyledTableCell align="right">
                {student?.semester}
              </StyledTableCell>
              <StyledTableCell align="right">{student.section}</StyledTableCell>
              <StyledTableCell align="right">
                {student?.noOfStudents}
              </StyledTableCell>
              <StyledTableCell align="right"><Button variant="contained"  className="viewButton" onClick={(e) => viewHandler(e,student._id)}>
                View
              </Button></StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <PlaygroundSpeedDial actions={actions} />
    </TableContainer>}
    {studentsList?.length === 0 || !studentsList ? (
  <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    No students were added till now.
  </h1>
) : null}
    {deleteComponent && <DeleteConfirm role={role} selectedId={selectedId}/>}
    </>
    : <h1 className="courseDetail" style={{marginTop:"50px"}}> loading.... </h1> } </>
  );
};

export default ShowStudents;
