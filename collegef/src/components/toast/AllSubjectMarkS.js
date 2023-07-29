import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";

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


const AllSubjectMarkS = ({markOfStudentList}) => {
    const overallMarkPercentage = () => {
        let { totalObtainedMarks, totalMarks } = markOfStudentList.reduce(
          (totals, mark) => {
            totals.totalObtainedMarks += mark?.marksObtained || 0;
            totals.totalMarks += mark?.totalMarks || 0;
            return totals;
          },
          { totalObtainedMarks: 0, totalMarks: 0 }
        );
        const totalPercentage = totalMarks !== 0 ? (totalObtainedMarks / totalMarks) * 100 : 0;
         return totalPercentage?.toFixed(2);
    
      };
      

  return (

        <>
          <TableContainer component={Paper} >
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    align="right"
                    style={{ textAlign: "center" }}
                  >
                    Subject&nbsp;(Name)
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ textAlign: "center" }}
                  >
                    Obtained Mark&nbsp;(Mark)
                  </StyledTableCell>
                  <StyledTableCell
                    align="right"
                    style={{ textAlign: "center" }}
                  >
                    Out Of
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {markOfStudentList?.map(
                  (mark) => {
                
                    return (
                      <StyledTableRow key={mark?._id}>
                        <StyledTableCell
                          align="right"
                          style={{ textAlign: "center" }}
                        >
                          {mark?.teacher?.subject}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{ textAlign: "center" }}
                        >
                          {mark?.marksObtained}
                        </StyledTableCell>
                        <StyledTableCell
                          align="right"
                          style={{ textAlign: "center" }}
                        >
                          {mark?.totalMarks}
                        </StyledTableCell>
                      </StyledTableRow>
                    );
                  }
                )}
              </TableBody>
            </Table>
            <div className="courseDetail">
              <h4 >overallMark Percentage:</h4>
              <h5>{overallMarkPercentage()}%</h5>
            </div>
          </TableContainer>
    </>
  )
}

export default AllSubjectMarkS
