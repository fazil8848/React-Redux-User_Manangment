import React from 'react'
import { Route,Routes}   from 'react-router-dom'
import Login from '../Pages/UserPages/Login/Login'
import Signup from '../Pages/UserPages/Singup/Signup'
import Home from '../Pages/UserPages/Home/Home'
import Profile from '../Pages/UserPages/Profile/Profile'
import UserPublic from './UserPublic'
import UserProtect from './UserProtect'
function UserRoute() {
  return (

        <Routes>
            <Route path='/login'  element={<UserPublic><Login/></UserPublic>}/>
            <Route path='/signup'  element={<Signup/>}/>
            <Route path='/'  element={<Home/>}/>
            <Route path='/profile'  element={<UserProtect><Profile/></UserProtect>}/>
        </Routes>

  )
}

export default UserRoute