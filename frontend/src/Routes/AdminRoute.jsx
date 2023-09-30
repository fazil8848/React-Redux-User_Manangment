import React from 'react'
import AdminLogin from '../Pages/AdminPages/AdminLogin/AdminLogin'
import {Route,Routes} from 'react-router-dom'
import AdminPublic from './AdminPublic'
import Adminprotect from './Adminprotect'
import AdminHome from '../Pages/AdminPages/AdminHome/AdminHome'
// import AddUser from '../Components/AdminComponents/AddUser/AddUser'
// import EditUser from '../Components/AdminComponents/EditUser/EditUser'
import AdminUserList from '../Pages/AdminPages/AdminUserList/AdminUserList'
import AdminAddUers from '../Pages/AdminPages/AdminAddUser/AdminAddUers'

function AdminRoute() {
  console.log("adminn router");

  return (
    <Routes>
      <Route path='/' element={<AdminPublic><AdminLogin/></AdminPublic>}/>
      <Route path='/dashboard' element={<Adminprotect><AdminHome/></Adminprotect>}/>
      <Route path='/addUser' element={<Adminprotect><AdminAddUers/></Adminprotect>}/>
      <Route path='/edituser/:id' element={<Adminprotect><AdminUserList/></Adminprotect>}/>

    </Routes>
    
  )
}

export default AdminRoute