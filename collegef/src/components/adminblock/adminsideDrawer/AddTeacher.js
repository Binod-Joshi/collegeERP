import React, { useEffect, useState } from "react";
import "./AddStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { cancelDelete, registerUser } from "../../../store/userRelated/userHandle";
import AddedSucessfull from "../../toast/AdeddSucessfully";
import { totalCourses } from "../../../store/courseRelated/courseHandle";
const AddStudent = () => {
  const { currentUser, status, loading, response } = useSelector(
    (state) => state.user
  );
  const { coursesList} = useSelector((state) => state.course);
 
  //  const currentUserr = currentUser.currentUser; // used if const currentUser = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [addedTeacher, setAddedTeacher] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [username, setUsername] = useState("");
  const [course, setCourse] = useState("");
  const [courseOption, setCourseOption] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const role = "Teacher";

  const addTeacherHandler = async (e) => {
    const fields = {
      username,
      role,
      course,
      subject,
      email,
      password,
    };
    e.preventDefault();
    dispatch(registerUser(fields, currentUser));
  };

  useEffect(() => {
    if (status === "added") {
      setAddedTeacher(true);
      setLoader(false);
      const timeout = setTimeout(() => {
        setAddedTeacher(false);
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      setLoader(false);
    }
    if (response === "teacher with same email already exist") {
      setEmailExist(true);
      const timeout = setTimeout(() => {
        setEmailExist(false);
        dispatch(cancelDelete()) // to set response equal to null
      }, 1000);
      return () => clearTimeout(timeout);
    }

    if (loading) {
      setLoader(true);
    }
  }, [status]);

  useEffect(() => {
    dispatch(totalCourses(currentUser))
  }, []);

  return (
    <div className="addStudent" style={{marginTop:'70px'}}>
      {addedTeacher && <AddedSucessfull />}
      <div className="insideAddStudent">
        <span className="loginTitle">Register Teacher</span>
        <form className="loginForm addStudentForm" onSubmit={addTeacherHandler}>
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
            <label style={{ fontSize: "20px" }}>
              Course Details*(course,branch,year,sem,section)
            </label>
            <select
              className="loginInput"
              value={courseOption}
              onChange={(e) => {
                setCourseOption(e.target.value);
                const selectedIndex = e.target.selectedIndex - 1;
                const selectedId = coursesList[selectedIndex]?._id;
                setCourse(selectedId);
              }}
              required
            >
              <option value="Select Class">Select Course Details</option>
              {coursesList.map((co, _id) => (
                <option
                  key={_id}
                  value={`${co.course}, ${co?.branch}, ${co.year}, ${co.semester}, ${co.section}`}
                >
                  {co.course}, {co.branch}, {co.year}, {co.semester},{" "}
                  {co.section}
                </option>
              ))}
            </select>
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Subject</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student name.."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
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
            {emailExist && <p style={{ color: "red" }}>{response}</p>}
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
            {loader ? <div className="load"></div> : "Add Teacher"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;

//className='errorlogin'
