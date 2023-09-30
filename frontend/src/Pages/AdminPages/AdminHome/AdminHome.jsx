import React from 'react'
import AdminHeader from '../../../Components/AdminComponents/AdminHeader/AdminHeader'
import AdminDash from '../../../Components/AdminComponents/AdminDash/AdminDash'


function AdminHome() {
  console.log("adminn home");
  return (
    <div>
       <AdminHeader/>
       <AdminDash/>
    </div>
  )
}

export default AdminHome