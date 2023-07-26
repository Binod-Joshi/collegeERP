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
import PrivateComponent from "./components/privateComponet/PrivateComponent";
import AdminDrawer from "./components/adminblock/adminsideDrawer/AdminDrawer";
import FacultyDrawer from "./components/facultyblock/facultysideDrawer/FacultyDrawer"
import StudentSideDrawer from "./components/studentblock/studentsideDrawer/StudentSideDrawer";
import { useSelector } from "react-redux";
import FirstHome from "./components/home/FirstHome";

function App() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <Router>
      {currentUser?.role === "Admin" && <AdminDrawer />}
      {currentUser?.role === "Teacher" && <FacultyDrawer />}
      {currentUser?.role === "Student" && <StudentSideDrawer />}
      <Routes>

        { (currentUser === null || currentUser === "") && <>
        <Route path="/decidehome" element={<Home />} />
        <Route path="/" element={<FirstHome />} />

        <Route path="/loginadmin" element={<Login role={"Admin"} />} />
        <Route path="/loginteacher" element={<Login role={"Teacher"} />} />
        <Route path="/loginstudent" element={<Login role={"Student"} />} />
        <Route path="/registeradmin" element={<Register />} />
        <Route path="*" element={<Navigate to="/" />} /> 
        </>}
      </Routes>
    </Router>
  );
}

export default App;
