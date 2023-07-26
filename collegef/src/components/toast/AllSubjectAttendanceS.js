import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardDoubleArrowDownIcon from "@mui/icons-material/KeyboardDoubleArrowDown";
import Piechart from "../toast/Piechart";
import Barchart from "../toast/Barchart";

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

const AllSubjectAttendanceS = ({attendanceOfStudentList}) => {
    const [subjectDetail, setSubjectDetail] = useState([]);
    const [details, setDetails] = useState(false);
    const [particularSubjectDetail, setParticularSubjectDetail] = useState([]);
    const [subjectName, setSubjectName] = useState([]);
    const [expandedSubjects, setExpandedSubjects] = useState({});

    useEffect(() => {
        const attendanceBySubject = {};
    attendanceOfStudentList.forEach((attendance) => {
      const subject = attendance.teacher.subject;

      if (!attendanceBySubject[subject]) {
        attendanceBySubject[subject] = {
          present: 0,
          absent: 0,
          allData: [],
        };
      }
      if (attendance.status === "Present") {
        attendanceBySubject[subject].present++;
      } else if (attendance.status === "Absent") {
        attendanceBySubject[subject].absent++;
      }
      attendanceBySubject[subject].allData.push({
        date: attendance.date,
        status: attendance.status,
      });
    });
    setSubjectDetail(attendanceBySubject);
    },[])
  
    const overallAttendance = () => {
        let present = attendanceOfStudentList?.filter((attend) => attend?.status === "Present")?.length;
        const presentPer = attendanceOfStudentList?.length !== 0?(present/attendanceOfStudentList?.length)*100:0;
        return presentPer.toFixed(2);
      }
    
      const detailHandler = (subject, allData) => {
        setSubjectName(subject);
        setParticularSubjectDetail(allData);
        setDetails(true);
    
        setExpandedSubjects((prevSubject) => {
          if (prevSubject === subject) {
            setDetails(false);
            return null; 
          } else {
            return subject; 
          }
        });
      };
    
      const data = [
        {name: "Present" , value:Number(overallAttendance()), fill: '#00C49F'},
        {name: "Absent" , value:100-overallAttendance(), fill: '#FF0000'},
      ]
    
      let data1 = [];
    
      for (let subjectName in subjectDetail) {
        let subjectData = subjectDetail[subjectName];
        data1.push({
          subject: subjectName,
          present: ((subjectData?.present)/(subjectData?.present+subjectData?.absent)*100)?.toFixed(2),
          absent: ((subjectData?.absent)/(subjectData?.present+subjectData?.absent)*100)?.toFixed(2),
          allData: subjectData?.allData
        });
      }
      console.log(data1);

      return (
          
            <>
              <TableContainer component={Paper} style={{marginTop:"50px"}}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <StyledTableCell
                        align="right"
                        style={{ textAlign: "center" }}
                      >
                        Name.of.Subject&nbsp;(Name)
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ textAlign: "center" }}
                      >
                        Present&nbsp;(pres)
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ textAlign: "center" }}
                      >
                        Total lecture&nbsp;(total)
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ textAlign: "center" }}
                      >
                        Percentage&nbsp;(%)
                      </StyledTableCell>
                      <StyledTableCell
                        align="right"
                        style={{ textAlign: "center" }}
                      >
                        Action&nbsp;(Ac)
                      </StyledTableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Object.entries(subjectDetail).map(
                      ([subject, { present, absent, allData }], index) => {
                        const attendanceper = (present / (present + absent)) * 100;
                        return (
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              align="right"
                              style={{ textAlign: "center" }}
                            >
                              {subject}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              style={{ textAlign: "center" }}
                            >
                              {present}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              style={{ textAlign: "center" }}
                            >
                              {present + absent}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              style={{ textAlign: "center" }}
                            >
                              {attendanceper}%
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              style={{ textAlign: "center" }}
                            >
                              <Button
                                variant="contained"
                                style={{ marginRight: "5px" }}
                                className=""
                                onClick={(e) => detailHandler(subject, allData)}
                              >
                                {expandedSubjects === subject ? (
                                  <KeyboardDoubleArrowUpIcon />
                                ) : (
                                  <KeyboardDoubleArrowDownIcon />
                                )}
                                Details
                              </Button>
                            </StyledTableCell>
                          </StyledTableRow>
                        );
                      }
                    )}
                  </TableBody>
                </Table>
                <div className="courseDetail">
                  <h4 >overallAttendance:</h4>
                  <h5>{overallAttendance()}%</h5>
                </div>
                {details && (
                  <TableContainer component={Paper}>
                    <div className="courseDetail">
                      <h2>Attendance Details of {subjectName}:</h2>
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
                        {particularSubjectDetail?.map((data, index) => (
                          <StyledTableRow key={index}>
                            <StyledTableCell
                              align="right"
                              style={{ textAlign: "center" }}
                            >
                              {data?.date?.split("T")[0]}
                            </StyledTableCell>
                            <StyledTableCell
                              align="right"
                              style={{ textAlign: "center" }}
                            >
                              {data?.status}
                            </StyledTableCell>
                          </StyledTableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
                 <div className="courseDetail">
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>Attendance in Piechart and BarChart</p>
          </div>
                { data1?.length?<><Piechart data = {data}/>
                 <Barchart data = {data1}/></>:<h1 className="courseDetail">Not provided by the teacher yet.</h1>}
              </TableContainer>
            </>

      );
}

export default AllSubjectAttendanceS
