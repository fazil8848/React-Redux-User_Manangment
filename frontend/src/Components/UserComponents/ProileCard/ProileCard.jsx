import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import { userImageUpload } from "../../../Api/UserApi";
import { setUserDetails } from "../../../Redux/UserSlice/UserSlice";

  export default function ProfileCard() {

    const  dispatch = useDispatch()
    const [images,setImages] = useState(null)
    const {id,name,mobile,image,email} = useSelector(state=>state.user)
    

    const handleImage = async (e) =>{
            e.preventDefault()
            const profileImageResponse = await userImageUpload(id,images)
            if(profileImageResponse.data.updated){
              dispatch(setUserDetails({
                id:profileImageResponse.data.data._id,
                name:profileImageResponse.data.data.userName,
                mobile:profileImageResponse.data.data.mobile,
                image:profileImageResponse.data.data.image,
                email:profileImageResponse.data.data.email,
                is_Admin:profileImageResponse.data.data.is_Admin,
              }))
            }


    }

    return (
      <div className="flex justify-center items-center text-start pt-5">
      <Card className="mt-5 w-auto">
      <CardHeader color="blue-gray" className="relative h-65">
        <img
          src={image ? `/images/${image}` : "https://th.bing.com/th/id/OIP.puMo9ITfruXP8iQx9cYcqwHaGJ?pid=ImgDet&rs=1"}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
          Name : {name}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
         Number : {mobile}
        </Typography>
        <Typography variant="h5" color="blue-gray" className="mb-2">
         Email : {email}
        </Typography>
      </CardBody>
   
        <CardFooter className="pt-0 flex flex-col gap-5" > 
        <input type="file" accept='image/*' onChange={(e) => setImages(e.target.files[0])} />
          <div>
            <Button onClick={handleImage}>Submit</Button>
          </div>
        </CardFooter>
    
    </Card>
    </div>
    );
  }