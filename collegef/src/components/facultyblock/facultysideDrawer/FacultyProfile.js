import React from 'react'
import { useSelector } from 'react-redux'
const FacultyProfile = () => {
  const {currentUser} = useSelector((state) => state.user);
  
  return (
    <div className="adminhome" style={{marginTop:"5opx"}}>
      <h1>Teacher</h1>
      <div>
<div className="adminImg">
  {/* <img src={currentUser?.profileDP} alt="img" /> */}
</div>
<div className="adminName">Name: {currentUser?.username}</div>
<div className="adminName">CollgeName: {currentUser?.collegename}</div>
</div>
    </div>
  )
}

export default FacultyProfile

