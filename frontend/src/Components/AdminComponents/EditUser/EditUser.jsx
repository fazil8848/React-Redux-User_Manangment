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
import { useEffect, useState } from "react";
import {  useNavigate, useParams } from "react-router-dom";
import { AdminEditUser, EditUserData } from "../../../Api/AdminApi";
import { ToastContainer, toast } from "react-toastify";
   
  export default  function EditUser() {
    const navigate = useNavigate()
    const {id} = useParams()
    const [value,setValue] = useState({
      name:'',number:'',email:'',
    })

//====================USER DATA EDITING SECTION ====================//

useEffect(()=>{

  const UserData = async ()=>{
    try {
      const response = await EditUserData(id)
      setValue({name:response.data.userData.userName,number:response.data.userData.mobile,email:response.data.userData.email})
    } catch (error) {
      console.log(error);
    }
  }
  UserData()
},[id])

//=================== EDITING DATA MANAGEMENT ============================//

const handleEditUser =async (e) =>{
     e.preventDefault()
     if(value.name===''){
      toast("Please enter a name")
     }else if(value.email===''){
      toast("Please enter a email")
     }else if(value.number===''){
      toast("Please enter a number")
     }else{

     
      try {
     
       const response = await AdminEditUser(id,value)
        if(response.data.status){
          navigate('/admin/dashboard')
        }else{
          toast(response.data.alert)
        }
      } catch (error) {
        console.log(error)
      }
    }
   }




    return (
      <div className="pt-10">
      <Card className="w-96 ">
        <form  onSubmit={handleEditUser} >
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-4 grid h-28 place-items-center"
        >
          <Typography variant="h3" color="white">
           Edit User
          </Typography>
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Input value={value.name}  type='text'  name="name" onChange={(e)=>{setValue({...value ,[e.target.name]:e.target.value})}} label="Name" size="lg" />
          <Input value={value.email} type='email' name="email" onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}} label="Email" size="lg" />
          <Input value={value.number} type='number' name="number" onChange={(e)=>{setValue({...value,[e.target.name]:e.target.value})}} label="Number" size="lg" />
       
          
        </CardBody>
        <CardFooter className="pt-0">
          <Button variant="gradient" type='submit' fullWidth>
           Save
          </Button>
         
        </CardFooter>
        </form>
        <ToastContainer/>
      </Card>
      </div>
    );
  }