import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { totalAttendanceOfStudent } from "../../../store/userRelated/userHandle";
import AllSubjectAttendanceS from "../../toast/AllSubjectAttendanceS";

const AttendanceOfOneSt = () => {
  const { currentUser, attendanceOfStudentList,loading } = useSelector(
    (state) => state.user
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(totalAttendanceOfStudent(currentUser));
  }, [attendanceOfStudentList?.length]);

  return (
    <>
     {loading ? <h1 style={{marginTop:"50px"}} className="courseDetail">loading...</h1> :<AllSubjectAttendanceS attendanceOfStudentList = {attendanceOfStudentList}/>}
    </>
  );
};

export default AttendanceOfOneSt;
