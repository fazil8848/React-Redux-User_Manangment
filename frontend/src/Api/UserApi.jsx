import axios from 'axios'

const UserApi = axios.create({
    baseURL:`http://localhost:3001`
})
export async function userSignUp(signUpData){
    try {    
        const data = await UserApi.post('/signup',signUpData)
        return data
    } catch (error) {
        console.log(error);
    }
}


export async function userLogin(loginData){
    try {
        const data2 = await UserApi.post('/login',loginData)
        return data2
    } catch (error) {
        console.log(error)
    }
}


export async function  userImageUpload(id,images){
      try {
        
             const data = new FormData()
             data.append('image',images)
             data.append('userId',id)
       
             const config={
                 header:{
                     'content-type':'multipart/form-data',
                     userId : id
                    },WithCreadentials:true
                }
                
            const imageData = await UserApi.post("/image",data,config);
            return imageData
      } catch (error) {
           console.log(error);
      }
}