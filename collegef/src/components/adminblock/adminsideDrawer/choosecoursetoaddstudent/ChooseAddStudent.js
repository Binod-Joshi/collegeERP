import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cancelDelete, registerUser } from "../../../../store/userRelated/userHandle";
import { totalCourses } from "../../../../store/courseRelated/courseHandle";
import AddedSucessfull from "../../../toast/AdeddSucessfully";
import { useParams } from "react-router-dom";
const ChooseAddStudent = () => {
  const {currentUser, status, loading, response} = useSelector((state) => state.user);
  const {coursesList} = useSelector((state) => state.course);
  const [loader, setLoader] = useState(false);
  const [addedStudent, setAddedStudent] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [rollnoExist, setRollnoExist] = useState(false);
  const [username, setUsername] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const selectedId = useParams().id;
  console.log(selectedId);
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


  // to filter a list of courses.
  const filteredArray = coursesList.filter(course => course._id === selectedId);

  const course = filteredArray.length > 0 ? filteredArray[0]?.course : '';
  const branch = filteredArray.length > 0 ? filteredArray[0]?.branch : '';
  const year = filteredArray.length > 0 ? filteredArray[0]?.year : '';
  const semester = filteredArray.length > 0 ? filteredArray[0]?.semester : '';
  const section = filteredArray.length > 0 ? filteredArray[0]?.section : '';

  useEffect(() => {
    if (status === "added") {
      setAddedStudent(true);
      setLoader(false);
      const timeout = setTimeout(() => {
        setAddedStudent(false);
      }, 2000);

      return () => clearTimeout(timeout);
    } else {
      setLoader(false);
    }
    if (response === "Student with this email id exist.") {
      setEmailExist(true);
      const timeout = setTimeout(() => {
        setEmailExist(false);
        dispatch(cancelDelete()) // to set response equal to null
      }, 1000);
      return () => clearTimeout(timeout);
    }else if(response === "Roll Number already exists."){
        setRollnoExist(true);
        const timeout = setTimeout(() => {
          setRollnoExist(false);
          dispatch(cancelDelete()) // to set response equal to null
        }, 1000);
        return () => clearTimeout(timeout);
    }

    if (loading) {
      setLoader(true);
      console.log(loading);
    }
  }, [status]);

  console.log(response)

  return (
    <div className="addStudent" style={{marginTop:'70px'}}>
        {addedStudent && <AddedSucessfull />}
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
            {rollnoExist && <p style={{ color: "red" }}>{response}</p>}
          </div>

         <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Course</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student course.."
              value={course}
              required
              disabled
            />
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Branch</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student branch"
              value={branch}
              required
              disabled
            />
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Year</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student year.."
              value={year}
              required
              disabled
            />
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Semester</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student name.."
              value={semester}
              required
              disabled
            />
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Section</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a student section.."
              value={section}
              required
              disabled
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
            {loader ? <div className="load"></div> : "Add Student"}
          </button>
          {/* {message && <p className='errorlogin'>{message}</p>} */}
        </form>
      </div>
    </div>
  );
};

export default ChooseAddStudent;
