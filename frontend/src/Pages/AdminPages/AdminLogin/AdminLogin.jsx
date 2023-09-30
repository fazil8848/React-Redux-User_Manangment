import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
  } from "@material-tailwind/react";
  
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import { AdminSignIn } from "../../../Api/AdminApi";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom";
  
  function AdminLogin() {

    const dispatch = useDispatch()
    const [value,setValue] = useState({
      email:'',password:'',
    });
    const navigate = useNavigate()

 const handleLogin =async (e) =>{
   e.preventDefault()
  try {
    const {email,password} = value
     if(email === ''){
       toast("Please add email")
     }else if(password === ''){
         toast("Please add password")
     }else{
         const adminLoginResponse = await AdminSignIn(value)
         console.log(adminLoginResponse);
         if(adminLoginResponse.data.status){
           localStorage.setItem('admintoken',adminLoginResponse.data.admintoken)
                    dispatch(setUserDetails({
                      id:adminLoginResponse.data.adminLoginData._id,
                      name:adminLoginResponse.data.adminLoginData.userName,
                      mobile:adminLoginResponse.data.adminLoginData.mobile,
                      image:adminLoginResponse.data.adminLoginData.image,
                      email:adminLoginResponse.data.adminLoginData.email,
                      is_Admin:adminLoginResponse.data.adminLoginData.is_Admin,
                    }))

                 }else{
                  toast(adminLoginResponse.data.alert)
                 }
                 navigate('/admin/dashboard')
         
     }

  } catch (error) {
    console.log(error);
  }


}

    return (
      <div className="w-full flex justify-center">
      <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Admin
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to Login.
      </Typography>
      <form onSubmit={handleLogin} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-4 flex flex-col gap-6">
          <Input size="lg" label="Email" name="email" onChange={(e) => setValue({...value,[e.target.name]: e.target.value})}/>
          <Input type="password" size="lg" name="password" onChange={(e) => setValue({...value,[e.target.name]: e.target.value})}  label="Password"/>
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
        <Button type="submit" className="mt-6" fullWidth>
          LogIn
        </Button>
      
      </form>
    </Card>
    <ToastContainer/>
    </div>
  
     
    )
  }
  
  export default AdminLogin