import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";


import { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteUser, LoadUserList } from "../../../Api/AdminApi";
import { ToastContainer, toast } from "react-toastify";


 
const TABLE_HEAD = ["No","Name", "Email", "Number", "Actions", ];
 

 
export default function AdminDash() {
  const [user,setUser] = useState([])
  const [search,setSearch] = useState('')


 useEffect(()=>{
     LoadUserList().then((res)=>{
        const userList = res.data.userdata
        console.log();
        setUser(userList)
     }).catch((err)=>{
      console.log(err);
     })
 },[])

 //=================== SEARCH INPUT HANDLER===========================//

 const handleSearchInput = (e) =>{
    setSearch(e.target.value)
 }

//===================== SEACHED DATA FETCHING  ============//

const userDatas =  user.filter((user)=>{
  const searchLowerCase = search.toLowerCase();
const EmailMatch = user.email.toLowerCase().includes(searchLowerCase)
const nameMatch =  user.userName.toLowerCase().includes(searchLowerCase)
const phoneMatch = user.mobile.toString().includes(searchLowerCase)

   return EmailMatch||nameMatch||phoneMatch
})


//==========================DELETE USER ===============================//

    const  handleDelete =async (userId)=>{
  
     DeleteUser(userId).then((res)=>{
        setUser(user.filter((user=>user._id!==userId)))
        toast(res.data.alert)
     }).catch((err)=>{
      console.log(err);
     })
}

  const navigate = useNavigate()

  return (
    <div className="pt-5">
    <Card className="h-full w-full ">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
    
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            {/* <Button variant="outlined" size="sm">
              view all
            </Button> */}
            <Button onClick={()=>{
                navigate('/admin/addUser')
            }} className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add member
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              value={search}
              onChange={handleSearchInput}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {userDatas  .map(
              ( values , index) => {
                const isLast = index === userDatas.length - 1;
               
 
                return (
                  <tr key={values._id}>
                    <td >
                      <div className="flex items-center gap-3">
                            <br></br>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {index+1}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                          
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td >
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {values.userName}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                        
                        </Typography>
                      </div>
                    </td>
                    <td >
                    <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        
                        {values.email}
                      </Typography>
                    </td>
                    <td>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        
                        {values.mobile}
                      </Typography>
                    </td>
                    <td >
                      <Tooltip content="Edit User">
                        <IconButton variant="text">
                          <PencilIcon onClick={()=>{
                             navigate(`/admin/edituser/${values._id}`)
                          }} className="h-4 w-4" />
                        </IconButton>
                      </Tooltip>
                
                  
                      <Button onClick={()=>{handleDelete(values._id)}} variant="outlined">delete</Button>
                       
                    </td>
                    <br/>
                    <br/>
                    <br/>

                  </tr>
                );   
              },
            )}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
        <Typography variant="small" color="blue-gray" className="font-normal">
          Page 1 of 10
        </Typography>
        <div className="flex gap-2">
          <Button variant="outlined" size="sm">
            Previous
          </Button>
          <Button variant="outlined" size="sm">
            Next
          </Button>
        </div>
      </CardFooter>
      <ToastContainer/>
    </Card>
    </div>
  );
}

