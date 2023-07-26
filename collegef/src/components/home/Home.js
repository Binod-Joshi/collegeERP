import React from 'react'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='Home'>
      <Link to="/loginadmin" className='link'>
      <div className="adminSelect">
       <h1>ADMIN</h1>
      </div>
      </Link>
      <Link to="/loginteacher" className='link'>
      <div className="teacherSelect">
        <h1>TEACHER</h1>
      </div>
      </Link>
      <Link to="/loginstudent" className='link'>
      <div className="studentSelect">
        <h1>STUDENT</h1>
      </div>
      </Link>
    </div>
  )
}

export default Home
