import React, { useEffect, useState } from "react";
import "../AddStudent.css";
import { useDispatch, useSelector } from "react-redux";
import { cancelDelete, registerUser } from "../../../../store/userRelated/userHandle";
import AddedSucessfull from "../../../toast/AdeddSucessfully";
import { useParams } from "react-router-dom";

const ChooseAddTeacher = ({courseId}) => {
  const { currentUser, status, loading, response } = useSelector(
    (state) => state.user
  );
  // const { coursesList } = useSelector((state) => state.course);
  const [loader, setLoader] = useState(false);
  const [addedTeacher, setAddedTeacher] = useState(false);
  const [emailExist, setEmailExist] = useState(false);
  const [username, setUsername] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const {id} = useParams();
  const [course, setCourse] = useState(id);
  console.log(id);
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
    console.log(fields);
    dispatch(registerUser(fields, currentUser));
    console.log(status);
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
      console.log(loading);
    }
  }, [status]);

  return (
    <div className="addStudent" style={{marginTop:"20px"}}>
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
              placeholder="Enter a teacher name.."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="addStudentInput">
            <label style={{ fontSize: "20px" }}>Subject</label>
            <input
              className="loginInput"
              type="text"
              placeholder="Enter a teacher subject.."
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
              placeholder="Enter a teacher email..."
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
              placeholder="create password for teacher..."
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

export default ChooseAddTeacher;
