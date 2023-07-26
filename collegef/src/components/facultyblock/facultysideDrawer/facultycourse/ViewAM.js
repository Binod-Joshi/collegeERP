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
  getAttendance,
  getMark,
} from "../../../../store/userRelated/userHandle";
import { Button } from "@mui/material";
import { useParams } from "react-router-dom";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Piechart from "../../../toast/Piechart";

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

const ViewAM = () => {
  const { currentUser, attendanceListForSubject, markForSubject,loading } = useSelector(
    (state) => state.user
  );
  const [detail, setDetail] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const student = params?.id;
  const teacher = currentUser?._id;
  const fields = { student, teacher };
  const fields1 = { student };
  const detailHandler = () => {
    setDetail(!detail);
  };

  useEffect(() => {
    dispatch(getAttendance(fields, currentUser));
    dispatch(getMark(fields1, currentUser));
  }, []);
  const presentlist = attendanceListForSubject.filter(
    (attendance) => attendance.status === "Present"
  );
  const atttendancePercentage =
    ((presentlist?.length / attendanceListForSubject?.length) * 100).toFixed(2);
  const percentageOfMark =
    ((markForSubject[0]?.marksObtained / markForSubject[0]?.totalMarks) * 100).toFixed(2);

  let attendancePer = Number(atttendancePercentage);
  let totalAttendance = (100 - atttendancePercentage);
  const data = [
    { name: 'Present', value: attendancePer, fill: '#00C49F' },
    { name: 'Absent', value: totalAttendance, fill: '#FF0000'},
  ];
  
  return (
    <>
    { !loading? <>
      <TableContainer component={Paper} style={{marginTop:"50px"}}>
        <div className="courseDetail">
          <h2>Attendance:</h2>
        </div>
        {attendanceListForSubject?.length > 0 ? (
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Name.of.Student&nbsp;(Name)
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Subject&nbsp;(sub)
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Present&nbsp;(pres)
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Total Classes&nbsp;(classes)
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Attendance Percentange&nbsp;(%)
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Action&nbsp;(Ac)
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {params.name}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {currentUser?.subject}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {presentlist?.length}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {attendanceListForSubject?.length}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {atttendancePercentage}%
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  <Button
                    variant="contained"
                    style={{ marginRight: "5px" }}
                    className=""
                    onClick={(e) => detailHandler()}
                  >
                    {detail ? (
                      <KeyboardDoubleArrowUpIcon />
                    ) : (
                      <KeyboardDoubleArrowDownIcon />
                    )}
                    Details
                  </Button>
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        ) : (
          <h3 className="courseDetail" style={{marginBottom:"10px"}}>No attendance added till now.</h3>
        )}

        <Piechart data = {data} />

        {detail && (
          <TableContainer component={Paper}>
            <div className="courseDetail">
              <h2>Attendance Details:</h2>
            </div>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="right"
                    style={{ textAlign: "center" }}
                  >
                    Date
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ textAlign: "center" }}
                  >
                    Status
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendanceListForSubject?.map((attend) => (
                  <StyledTableRow key={attend._id}>
                    <StyledTableCell
                      align="right"
                      style={{ textAlign: "center" }}
                    >
                      {attend?.date.split("T")[0]}
                    </StyledTableCell>
                    <StyledTableCell
                      align="right"
                      style={{ textAlign: "center" }}
                    >
                      {attend?.status}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </TableContainer>

      {/* marks section */}
      {markForSubject?.length > 0 ? (
        <TableContainer component={Paper} style={{ paddingTop: "50px" }}>
          <div className="courseDetail">
            <h2>Subject Marks:</h2>
          </div>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Subject
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Marks
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Total Marks
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  Percentage
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <StyledTableRow key={markForSubject[0]?._id}>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {currentUser?.subject}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {markForSubject[0]?.marksObtained}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {markForSubject[0]?.totalMarks}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ textAlign: "center" }}>
                  {percentageOfMark}%
                </StyledTableCell>
              </StyledTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <div className="courseDetail">
          <h2>Subject Marks:</h2>
          <h3>No marks are provided</h3>
        </div>
      )}
    </> : <div className="courseDetail" style={{marginTop:"50px"}}> <h1>Loading...</h1></div>}
    </>
  );
};

export default ViewAM;
