import axios from "axios";

const AdminApi = axios.create({
    baseURL:`http://localhost:3001/admin`  
})

//============================== ADDMIN SIGNIN =================================//
export async function AdminSignIn(adminLoginData){
try {
    const admindata = await AdminApi.post('/login',adminLoginData)
    return admindata
} catch (error) {
   console.log(error) 
}
}

//=============================ADD USER ADMIN SIDE ==========================//
export async function  AdminAddUser(Addeduserdata){
    try {
    
     const addedUserRespone = await AdminApi.post('/AddUser',Addeduserdata)
     return addedUserRespone
    } catch (error) {
        console.log(error)
    }
}

//============================= GETTING USER LIST ============================//

export async  function LoadUserList(){

    try {
        const listResponse = await AdminApi.get('/loadUsers')
        return listResponse
    } catch (error) {
        console.log(error);
    }
}

//=========================== ADMIN DELETE USER =================================//
 export async function DeleteUser(userId){
    try {
       
        const deleteresponse = await AdminApi.post('/deleteUser',{userId}) 
        return  deleteresponse

    } catch (error) {
        console.log(error)
    }
 }

 //========================= ADMIN EDITE USER DATA =========================//

 export async function EditUserData(id){

        try {
            const response = await AdminApi.post('/editUser',{id})
            return response 
        } catch (error) {
            
        }
 } 

 //======================== USER EDIT POST MANAGEMENT =======================//

 export async function AdminEditUser(id,userData){
           
    try {
          const {name,number,email} = userData
          const EditDataResponse = await AdminApi.post('/editUserByAdmin',{id,name,number,email})
          return EditDataResponse
    } catch (error) {
        console.log(error)
    }
 }