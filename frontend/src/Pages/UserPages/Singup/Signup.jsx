import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React, { useState } from 'react'
import {userSignUp} from '../../../Api/UserApi'
import {useNavigate} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
function Signup() {
 
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setNumber] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  const dispatch = useDispatch()
//================FORM SUBMITTING =========//

const handleSubmit =async (e) =>{
   e.preventDefault()
  
   try {
    if(name.trim() === ''||name === undefined){

      toast('please enter your email')
    }else if(phone.trim() === ''){
      toast('pleas enter your number ')
    }else if(email.trim() === ''){
      toast('pleace enter your email')
    }else if(password.trim() === ''){
      toast('pleace enter your password')
    }else{
          const signUpResponse = await userSignUp({name,phone,email,password})
          if(signUpResponse.data.status){
             localStorage.setItem('token',signUpResponse.data.token);
             dispatch(setUserDetails({
                 id:signUpResponse.data.userSavedData._id,
                 name:signUpResponse.data.userSavedData.userName,
                 mobile:signUpResponse.data.userSavedData.mobile,
                 image:signUpResponse.data.userSavedData.image,
                 email:signUpResponse.data.userSavedData.email,
                 is_Admin:signUpResponse.data.userSavedData.is_Admin,
             }))
             
             navigate('/')

          }else{
            toast(signUpResponse.data.alert)
          }
    }

   } catch (error) {
    console.log(error)
   }

}

  return (
    <div className="w-full flex justify-center" >
    <Card color="transparent" shadow={false}>
    <Typography variant="h4" color="blue-gray">
      Sign Up
    </Typography>
    <Typography color="gray" className="mt-1 font-normal">
      Enter your details to register.
    </Typography>
    <form onSubmit={handleSubmit} className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
      <div className="mb-4 flex flex-col gap-6">
        <Input size="lg" label="Name" value={name} onChange={(e)=>setName(e.target.value) } />
        <Input size="lg"  type='email'  label="Email" value={email} onChange={(e)=>setEmail(e.target.value) } />
        <Input size="lg" type='number' label="phone" value={phone} onChange={(e)=>setNumber(e.target.value) } />
        <Input type='password'  size="lg" label="Password" value={password} onChange={(e)=>setPassword(e.target.value) } />
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
      <Button className="mt-6"type="submit" fullWidth >
        Register
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        Already have an account?{" "}
        <a href="#" className="font-medium text-gray-900">
          Sign In
        </a>
      </Typography>
    </form>
    <ToastContainer />
  </Card>
  </div>

  )
}

export default Signup