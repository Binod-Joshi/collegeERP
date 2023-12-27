import React, { useEffect, useState } from 'react'
import "./Register.css"
import { BiUserCircle } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../store/userRelated/userHandle';


const Register = () => {
    const [username, setUsername] = useState("");
    const [collegename,setCollegename] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profileDP,setProfileDP] = useState('');
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const {status,currentUser,response,error,currentRole,loading} = useSelector(state => state.user);
    console.log(status,currentRole,currentUser)
    console.log(loading);

    useEffect(()=> {
      if(status === "success"){
        navigate("/adminhome");
      } else if(status === "failed"){
        console.log("failed");
        setMessage(response);
        setTimeout(() => setMessage(""), 5000);
      }else if(status === "error"){
        setMessage("server busy.try after some time");
        setTimeout(() => setMessage(""), 5000);
      }
    },[status,currentUser,currentRole, navigate, error, response]);

    const imageUpload = async(e) => {
        const file = e.target.files[0];
        const base64 = await convertToBase64(file);
        setProfileDP(base64)

    }
    const convertToBase64 = async(file) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        return new Promise((resolve,reject) => {
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const role = "Admin";
    const fields = {username,collegename,email,role,password,profileDP};

    const handleRegister = async(e) => {
      e.preventDefault();
      dispatch(registerUser(fields));
    }

  return (
    <div className="register">
    <span className="registerTitle">Register</span>
    <form className="registerForm" onSubmit={handleRegister}>
      <label>Username</label>
      <input
        className="registerInput"
        type="text"
        placeholder="Enter your username..."
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <label>College Name</label>
      <input type="text"
        className="registerInput"
        placeholder='Enter a college name..'
        value={collegename}
        onChange={(e) => setCollegename(e.target.value)}
        required
       />
      <label>Email</label>
      <input
        className="registerInput"
        type="email"
        placeholder="Enter your email..."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <label>Password</label>
      <input
        className="registerInput"
        type="password"
        placeholder="Enter your password..."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <label>Profile Pics</label>
       <div className="registerpicManagement">
       
      <label htmlFor="fileInput">
      <BiUserCircle className="settingsPPIcon" />
      </label>
      <input
            id="fileInput"
            type="file"
            style={{ display: "none" }}
            className="settingsPPInput" accept="image/*"
            onChange={imageUpload}
          />
      {profileDP?<img src={profileDP} alt="" /> :''}   
       </div>
      {message && <div style={{ color: "red" }}>{message}</div>}
      <button className="registerButton" type="onsubmit">
      {loading?<div className="load"></div>:"Register"}
      </button>
    </form>
    <button className="registerLoginButton"style={{backgroundColor:"#008041c7"}} >
      <Link to="/loginadmin" className="link" style={{color:"#0d28fd"}}>
        LOGIN
      </Link>
    </button>
  </div>
  )
}

export default Register
