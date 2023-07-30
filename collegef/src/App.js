import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/form/Login";
import Home from "./components/home/Home";
import Register from "./components/form/Register";
import AdminDrawer from "./components/adminblock/adminsideDrawer/AdminDrawer";
import FacultyDrawer from "./components/facultyblock/facultysideDrawer/FacultyDrawer"
import StudentSideDrawer from "./components/studentblock/studentsideDrawer/StudentSideDrawer";
import { useSelector } from "react-redux";
import FirstHome from "./components/home/FirstHome";
import ResetPassword from "./components/form/ResetPassword";
import ForgetPassword from "./components/form/ForgetPassword";
import Error from "./components/toast/Error";

function App() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <Router>
      {currentUser?.role === "Admin" && <AdminDrawer />}
      {currentUser?.role === "Teacher" && <FacultyDrawer />}
      {currentUser?.role === "Student" && <StudentSideDrawer />}
      
      { (currentUser === null || currentUser === "") && <>
      <Routes>
        <Route path="/decidehome" element={<Home />} />
        <Route path="/" element={<FirstHome />} />

        {/* for resetting the login password of admin */}
        <Route path="/resetpassword/:role" element={<ResetPassword />} />
        <Route path="/forgetpassword/:id/:token/:role" element={<ForgetPassword/>} />

        <Route path="/loginadmin" element={<Login role={"Admin"} />} />
        <Route path="/loginteacher" element={<Login role={"Teacher"} />} />
        <Route path="/loginstudent" element={<Login role={"Student"} />} />
        <Route path="/registeradmin" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} /> 
        <Route path="/error" element={<Error/>} />
      </Routes>
      </>}
    </Router>
  );
}

export default App;
