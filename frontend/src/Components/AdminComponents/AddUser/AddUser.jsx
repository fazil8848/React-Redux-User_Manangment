import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    Button,
  } from "@material-tailwind/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { AdminAddUser } from "../../../Api/AdminApi";
import { useDispatch } from "react-redux";   
import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";
import { useNavigate } from "react-router-dom";


  export default function AddUser() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [value,setValue] = useState({
        name:'',email:'',password:'',phone:'',
    })
    const handleAddUser =async (e) =>{
        e.preventDefault()
        try {
          if(value.name===''){
             toast("Please enter a name")
          }else if(value.phone===''){
            toast("Please enter a number")
            
          }else if(value.email===''){
            toast("Please enter a email")
          }
          else if(value.password===''){
             toast("Please enter your password")
               
          }else{

          const AddUserresponse = await AdminAddUser(value)
          if(AddUserresponse.data.status){
              localStorage.setItem('token',AddUserresponse.data.token)  
              dispatch(setUserDetails({
                id:AddUserresponse.data.userSavedData._id,
                name:AddUserresponse.data.userSavedData.userName,
                mobile:AddUserresponse.data.userSavedData.mobile,
                image:AddUserresponse.data.userSavedData.image,
                email:AddUserresponse.data.userSavedData.email,
                is_Admin:AddUserresponse.data.userSavedData.is_Admin,
              })) 
              
              navigate('/admin/dashboard');
              
          }else{
            toast(AddUserresponse.data.alert)
        }
      }
        } catch (error) {
            console.log(error);
        }

 

    }
     
    return (
      <div className="pt-10">
      <Card  className="w-96">
        <form onSubmit={handleAddUser}>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
          Add user
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input label="Name" size="lg"  type='text'   name="name" onChange={(e) => setValue({...value,[e.target.name]: e.target.value})}  />
          <Input label="Email" size="lg" type='email' name="email" onChange={(e) => setValue({...value,[e.target.name]: e.target.value})}  />
          <Input label="Phone" size="lg" type='number' name="phone" onChange={(e) => setValue({...value,[e.target.name]: e.target.value})}  />
          <Input label="Password" size="lg" type='password'   name="password" onChange={(e) => setValue({...value,[e.target.name]: e.target.value})}  />

        </CardBody>
        <CardFooter className="pt-0">
          <Button type='submit' variant="gradient" fullWidth>
         save
          </Button>

        </CardFooter>
        </form>
        <ToastContainer/>
      </Card>
      </div>
    );
  }