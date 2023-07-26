import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logoutUser } from '../../store/userRelated/userHandle';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    // const {showPopUp,setShowPopUp} = fields;
    const {currentUser} = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout =() =>{
        dispatch(logoutUser());
        navigate("/");
      }
  return (
    <div style={{marginTop:"50px"}}>
        <div className="logouts">
          <div className="logout">
            <h1>{currentUser?.username}</h1>
            <h3>are you sure you want to logout?</h3>
            <div className="buttons">
              <button  className="ok" onClick={logout}>
                Ok
              </button>
              <button className="cancel" onClick={()=>navigate(-1)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Logout
