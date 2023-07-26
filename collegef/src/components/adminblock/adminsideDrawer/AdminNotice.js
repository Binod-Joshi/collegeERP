import React from 'react'
import Notice from '../../toast/Notice'

const AdminNotice = () => {
    let role = "Admin"
  return (
    <div>
      <Notice role = {role} />
    </div>
  )
}

export default AdminNotice
