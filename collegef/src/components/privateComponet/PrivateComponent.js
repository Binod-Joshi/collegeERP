import { Navigate,Outlet } from "react-router-dom";

const PrivateComponent = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    let role = user?.role;
    role = role?.charAt(0).toLowerCase() + role?.slice(1);
    return user?.token ? <Outlet/> : <Navigate to={`/login${role}`} replace />

}

export default PrivateComponent;