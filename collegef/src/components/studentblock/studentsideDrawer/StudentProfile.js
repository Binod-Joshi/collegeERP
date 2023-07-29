import React from 'react'

import { useSelector } from 'react-redux';

const StudentProfile = () => {
  const {currentUser} = useSelector(state => state.user);
  return (
    <>
    <div className="studenthome courseDetail" >
      <h1>Student</h1>
      <div>
        <div className="studentImg">
          <img src={currentUser?.profileDP} alt="img" />
        </div>
        <div className="studentName">Name: {currentUser?.username}</div>
        <div className="studentRollno">RollNo: {currentUser?.rollNo}</div>
        <div className="studentCourse">Course: {currentUser?.course}</div>
        <div className="studentbranch">Branch: {currentUser?.branch}</div>
        <div className="studentyear">Year: {currentUser?.year}</div>
        <div className="studentsemester">Semester: {currentUser?.semester}</div>
        <div className="studentsemester">Semester: {currentUser?.section}</div>
        <div className="studentsemester">Collegename: {currentUser?.collegename}</div>
      </div>
    </div>
  </>
  )
}

export default StudentProfile
