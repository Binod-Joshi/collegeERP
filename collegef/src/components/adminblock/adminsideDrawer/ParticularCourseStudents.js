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
import {
  ShowStudentsList,
  SingleCourseStudentDetail,
  setDeletedComponents,
} from "../../../store/userRelated/userHandle";
import PlaygroundSpeedDial from "../../toast/Speeddial";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useNavigate, useParams } from "react-router-dom";
import DeleteConfirm from "../../toast/DeleteConfirm";
import { Button } from "@mui/material";

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

const ParticularCourseStudents = () => {
  const { studentsList, currentUser, courseStudentsList,deleteComponent,loading} = useSelector(
    (state) => state.user
  );
  const [selectedId, setSelectedId] = useState("");
  const params = useParams();
  const particularCourseid = params.id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const role = "students";

  const studentfilter = studentsList?.filter(
    (student) => student?._id === particularCourseid
  );
  const course = studentfilter?.length > 0 ? studentfilter[0]?.course : "";
  const branch = studentfilter?.length > 0 ? studentfilter[0]?.branch : "";
  const year = studentfilter?.length > 0 ? studentfilter[0]?.year : "";
  const semester = studentfilter?.length > 0 ? studentfilter[0]?.semester : "";
  const section = studentfilter?.length > 0 ? studentfilter[0]?.section : "";
  const fields = { course, branch, year, semester, section };
  useEffect(() => {
    dispatch(ShowStudentsList(currentUser));
  }, [deleteComponent]);

  useEffect(() => {
    dispatch(SingleCourseStudentDetail(fields, currentUser));
    if(deleteComponent === false){
      setSelectedId("");
    }
  }, [deleteComponent,course,studentsList?.length]);

  const actions = [
    {
        icon: <PersonAddAlt1Icon color="primary" />, name: 'Add New Student',
        action: () => navigate(`/ChooseCourse/${role}`)
    },
];
  const singleDeleteHandler = (id) => {
    setSelectedId(id);
    dispatch(setDeletedComponents());
  }

  const viewHandler = (id) => {
     navigate(`/studentdetails/${id}`);
  }

  return (
    <>
    {!deleteComponent && <div style={{marginTop:'50px'}}>
      <div className="courseDetail">
        <h1>Course Detail</h1>
        <h2>
          Course:{course}, Branch:{branch}, Year:{year}, Semester:{semester},
          Section:{section}
        </h2>
      </div>
      {(!loading && courseStudentsList )&& courseStudentsList?.length > 0 ? (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead> 
              <TableRow> 
                <StyledTableCell>Student Name</StyledTableCell>
                <StyledTableCell align="right">
                  Action&nbsp;(Ac)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {courseStudentsList?.length !== 0 && courseStudentsList?.map((student) => (
                <StyledTableRow key={student._id}>
                  <StyledTableCell component="th" scope="row">
                    {student.username}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {" "}
                    <PersonRemoveIcon
                      color="error"
                      onClick={(e) => singleDeleteHandler(student._id)}
                      style={{ cursor: "pointer", padding: "1px", marginRight:"10px" }}
                      className="singleDeleteIcon"
                    />
                    <Button variant="contained"  className="viewButton" onClick={(e) => viewHandler(student._id)}>
                View
              </Button>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          <PlaygroundSpeedDial actions={actions} />
        </TableContainer>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop:"50px"
          }}
          
        >
          Loading....
        </div>
      )}
      
      </div>}
      {deleteComponent && <DeleteConfirm role={role} selectedId={selectedId}/>}
    </>
  );
};

export default ParticularCourseStudents;
