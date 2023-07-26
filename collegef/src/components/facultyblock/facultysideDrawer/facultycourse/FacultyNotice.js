import React from 'react'
import Notice from '../../../toast/Notice'

const FacultyNotice = () => {
    let role = "Teacher";
    
  return (
    <div>
      <Notice role={role} />
    </div>
  )
}

export default FacultyNotice
