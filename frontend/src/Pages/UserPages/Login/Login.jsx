import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";

import React from 'react'
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {toast,ToastContainer}  from 'react-toastify'
import { userLogin } from "../../../Api/UserApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
 function Login() {
  const navigate = useNavigate()
  const dispatch =  useDispatch()
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')


    const handleLogin = async (e)=>{
      e.preventDefault()
      try {
        if(email === ''){
          toast("Please add email")
         }else if (password === ''){
         toast('Please add password')
       }else{
           const loginResponse = await userLogin({email,password})
           console.log(loginResponse);
           if(loginResponse.data.status){
              localStorage.setItem('token',loginResponse.data.token)
                dispatch(setUserDetails({
                id:loginResponse.data.userLogindata._id,
                name:loginResponse.data.userLogindata.userName,
                mobile:loginResponse.data.userLogindata.mobile,
                image:loginResponse.data.userLogindata.image,
                email:loginResponse.data.userLogindata.email,
                is_Admin:loginResponse.data.userLogindata.is_Admin,
              }))
              navigate('/')
            }else{
               toast(loginResponse.data.alert)
            }
            
        
          }

      } catch (error) {
        console.log(error);
      }
       
    }


  return (
    <div className="w-full flex justify-center">
    <Card color="transparent" shadow={false}>
    <Typography variant="h4" color="blue-gray">
      Sign Up
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Enter your details to register.
    </Typography>
    <form  onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-4 flex flex-col gap-6">
        <Input type='email' name='email' value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} size="lg" label="Email" />
        <Input type='password' name="password" value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }}  size="lg" label="Password" />
      </div>
      <Checkbox
        label={
          <Typography
            variant="small"
            color="gray"
            className="flex items-center font-normal"
          >
            I agree the
            <a
              href="#"
              className="font-medium transition-colors hover:text-gray-900"
            >
              &nbsp;Terms and Conditions
            </a>
          </Typography>
        }
        containerProps={{ className: "-ml-2.5" }}
      />
      <Button type="submit"  className="mt-6" fullWidth>
        Login
      </Button>
      <Typography  color="gray" className="mt-4 text-center font-normal">
        Dont have a account?{" "}
        <Link to={'/signup'}>
          Sign up
          </Link>
      </Typography>
    </form>       
    <ToastContainer/>
  </Card>
  </div>

   
  )
}

export default Login