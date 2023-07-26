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
import { ShowTeachersList, setDeletedComponents } from "../../../store/userRelated/userHandle";
import PlaygroundSpeedDial from "../../toast/Speeddial";
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { useNavigate } from "react-router-dom";
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
  const { currentUser, teachersList,deleteComponent,loading } = useSelector((state) => state.user);
  const [selectedId, setSelectedId] = useState("");
  const role ="teachers"
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ShowTeachersList(currentUser));
    if(deleteComponent === false){
      setSelectedId("");
    }
  }, [deleteComponent]);

  console.log(teachersList)

  const actions = [
    {
        icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Teacher',
        action: () => navigate(`/ChooseCourse/${role}`)
    },
    {
        icon: <PersonRemoveIcon color="error" />, name: 'Delete All Teachers',
        action: () => deleteHandler()
    },
];

  const deleteHandler =() => {
    dispatch(setDeletedComponents());
  }
  const singleDeleteHandler = (id) => {
    dispatch(setDeletedComponents());
    setSelectedId(id);
  }

  console.log(loading);

  return (
    <>
    {!loading? <>
    { !deleteComponent && <TableContainer component={Paper} >
      <Table sx={{ minWidth: 700 }} aria-label="customized table" style={{marginTop:"50px"}}>
        <TableHead>
          <TableRow>
            <StyledTableCell>Course</StyledTableCell>
            <StyledTableCell align="right">Branch</StyledTableCell>
            <StyledTableCell align="right">Year&nbsp;(yrs)</StyledTableCell>
            <StyledTableCell align="right">Semester&nbsp;(sem)</StyledTableCell>
            <StyledTableCell align="right">Section&nbsp;(sec)</StyledTableCell>
            <StyledTableCell align="right">Subject&nbsp;(sub)</StyledTableCell>
            <StyledTableCell align="right">
              Teacher Name &nbsp;(Nam)
            </StyledTableCell>
            <StyledTableCell align="right">Action&nbsp;(act)</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {teachersList?.map((teacher) => (
            <StyledTableRow key={teacher._id}>
              <StyledTableCell component="th" scope="row">
                {teacher.course?.course}
              </StyledTableCell>
              <StyledTableCell align="right">{teacher.course?.branch}</StyledTableCell>
              <StyledTableCell align="right">{teacher.course.year}</StyledTableCell>
              <StyledTableCell align="right">
                {teacher.course.semester}
              </StyledTableCell>
              <StyledTableCell align="right">{teacher.course.section}</StyledTableCell>
              <StyledTableCell align="right">
                {teacher.subject}
              </StyledTableCell>
              <StyledTableCell align="right">
                {teacher.username}
              </StyledTableCell>
              <StyledTableCell align="right">
                <PersonRemoveIcon color="error" onClick={ (e) => singleDeleteHandler(teacher._id)} style={{cursor:"pointer",padding:"1px"}} className="singleDeleteIcon"/>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
      <PlaygroundSpeedDial actions={actions} />
    </TableContainer>}

    {teachersList?.length === 0 || !teachersList ? (
  <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
    No teachers were added till now.
  </h1>
) : null}
    {deleteComponent && <DeleteConfirm role={role} selectedId={selectedId}/>}
    </> : <h1 className="courseDetail" style={{marginTop:"50px"}}>loading... </h1>
    }</>
  );
};

export default ShowStudents;

