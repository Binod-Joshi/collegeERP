import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { totalAttendanceOfStudent, totalMarkOfStudent } from '../../../store/userRelated/userHandle';
import { useDispatch, useSelector } from 'react-redux';
import AllSubjectAttendanceS from '../../toast/AllSubjectAttendanceS';
import AllSubjectMarkS from "../../toast/AllSubjectMarkS";

const StudentDetail = () => {
    const params = useParams();
    let studentId = params.id;
    
    const { currentUser, attendanceOfStudentList,markOfStudentList,loading } = useSelector(
        (state) => state.user
      );
    
      const dispatch = useDispatch();
    
      useEffect(() => {
        dispatch(totalAttendanceOfStudent(currentUser,studentId));
        dispatch(totalMarkOfStudent(currentUser,studentId))
      }, []);

  return (
    <> { !loading ?(
    <div>
    <h1 className='courseDetail' >Student Attendance.</h1>
    {attendanceOfStudentList?.length > 0 ? <AllSubjectAttendanceS attendanceOfStudentList= {attendanceOfStudentList} />: <div style={{marginTop:"50px"}} className='courseDetail'>
    The attendance for this student has not been added by the teacher yet.
    </div>}
    <h1 className='courseDetail' style={{ marginTop:"50px"}}> Student Mark.</h1>
    {markOfStudentList?.length > 0 ? < AllSubjectMarkS markOfStudentList= {markOfStudentList} />: <div style={{marginTop:"50px"}} className='courseDetail'>
    The grade/mark for this student has not been added by the teacher yet.
    </div>}
    </div>)
    :<h1 style={{marginTop:"50px"}} className='courseDetail'> loading...</h1>}
    </>
  )
}

export default StudentDetail
