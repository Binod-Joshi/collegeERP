import React, { useEffect, useState } from "react";
import "./AddStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { cancelDelete, registerUser } from "../../../store/userRelated/userHandle";
import { totalCourses } from "../../../store/courseRelated/courseHandle";
import AddedSuccessfully from "../../toast/AdeddSucessfully"

const AddStudent = () => {
  const {currentUser, status, response} = useSelector((state) => state.user);
  const {coursesList} = useSelector((state) => state.course);
  const [loader, setLoader] = useState(false);
  const [username, setUsername] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [course, setCourse] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [section, setSection] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const role = "Student";
  const addStudentHandler = async (e) => {
    const fields = {
      username,
      role,
      rollNo,
      course,
      branch,
      year,
      semester,
      section,
      email,
      password,
    };
    e.preventDefault();
    dispatch(registerUser(fields, currentUser));
  };

  useEffect(() => {
    dispatch(totalCourses(currentUser))
  }, []);

  React.useEffect(() => {
    if(status === "added" || response === "Roll Number already exists." || response === "Student with this email id exist."){
     const timeout =  setTimeout(() => {
       dispatch(cancelDelete())
     }, 1500);
      return () => clearTimeout(timeout);
    }
   },[status,response])

  const uniqueCourses = [
    ...new Set(coursesList?.map((co) => co.course.toUpperCase())),
  ];
  const uniqueBranches = [
    ...new Set(coursesList?.map((br) => br.branch.toUpperCase())),
  ];
  const uniqueYears = [...new Set(coursesList?.map((yr) => yr.year.toUpperCase()))];
  const uniqueSemseters = [...new Set(coursesList?.map((sem) => sem.semester))];
  const uniqueSections = [...new Set(coursesList?.map((sec) => sec.section))];

  return (
    <div className="addStudent" style={{marginTop:'70px'}}>
      <div className="insideAddStudent">
        <span className="loginTitle">Register Student</span>
        <form className="loginForm addStudentForm" onSubmit={addStudentHandler}>
          <div className="addStudentInput">
            {" "}
            <label style={{ fontSize: "20px" }}>Name</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student name.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Roll no</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student rollno.."
              value={rollNo}
              onChange={(e) => setRollNo(e.target.value)}
              required
            />
          </div>
          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Course</label>
            <select
              className="loginInput"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              required
            >
              <option value="Select Class">Select Course</option>
              {uniqueCourses.map((course, index) => (
                <option key={index} value={course}>
                  {course}
                </option>
              ))}
            </select>
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Branch</label>
            <select
            className="loginInput"
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            required>
              <option value="Select Class">Select Branch</option>
              {uniqueBranches.map((branch,index) => (
                <option key={index} value={branch} >
                  {branch}
                </option>
              ))}
            </select>
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Year</label>
            <select
            className="loginInput"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required>
              <option value="Select Year">Select Year</option>
              {uniqueYears.map((year,index) => (
                <option key={index} value={year} >
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Semester</label>
            <select
            className="loginInput"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required>
              <option value="Select Semester">Select Semester</option>
              {uniqueSemseters.map((semester,index) => (
                <option key={index} value={semester} >
                  {semester}
                </option>
              ))}
            </select>
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Section</label>
            <select
            className="loginInput"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required>
              <option value="Select Section">Select Section</option>
              {uniqueSections.map((section,index) => (
                <option key={index} value={section} >
                  {section}
                </option>
              ))}
            </select>
          </div>
          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Email</label>
            <input
              className="loginInput"
              type="email"
              placeholder="Enter a student email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Password</label>
            <input
              className="loginInput"
              type="password"
              placeholder="create password for student..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="addStudentB" type="submit">
            {loader ? <div className="load"></div> : "Add Student"}
          </button>
          {/* {message && <p className='errorlogin'>{message}</p>} */}
          <div className="courseDetail">
          {status === "added"? <AddedSuccessfully/>:""}
          {(response === "Roll Number already exists." || response === "Student with this email id exist.")?<p style={{color:"red"}}>{response}</p>:""}
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
