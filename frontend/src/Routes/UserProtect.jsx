import React from 'react'
import { Navigate } from 'react-router-dom'

function UserProtect(props) {
  if(localStorage.getItem('token')){
    return props.children
  }else{
    return <Navigate to='/'/>
  }
}

export default UserProtect