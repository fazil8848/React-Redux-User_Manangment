import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    id:'',
    userName:'',
    mobile:'',
    email:'',
    image:'',
    is_admin:''
}

const userslice =  createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserDetails:(state,action)=>{
              state.id = action.payload.id;
              state.name = action.payload.name;
              state.mobile=action.payload.mobile;
              state.image= action.payload.image;
              state.email=action.payload.email;
        },

        logoutDetails:(state,action)=>{
            state.id='';
            state.name='';
            state.mobile='';
            state.image='';
            state.email='';

        }
    }
})


export const {setUserDetails,logoutDetails}= userslice.actions
export default userslice.reducer;