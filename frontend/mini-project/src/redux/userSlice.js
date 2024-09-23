import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addUser=createAsyncThunk('user/addUser',async(userData)=>{
    const response=await axios.post('http://localhost:8082/users/register', userData)
    return response.data
})

export const validateUser=createAsyncThunk('user/validate', async(credentials)=>{
    const response=await axios.post('http://localhost:8082/users/login', credentials)
    return response.data
})

const userSlice=createSlice({
    name:'user',
    initialState:{
        user:null,
        status:'idle',
        message:'',
        registrationSuccess:false,
        validation:false,
        validationMessage:''
    },
    reducers:{
        logout(state){
            state.user=null
            state.registrationSuccess=false;
            state.message=''
            state.validation=false
            state.validationMessage=''
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(addUser.pending, (state)=>{
            state.status='loading'
        })
        builder.addCase(addUser.fulfilled, (state, action)=>{
            state.status='succeded'
            state.message=action.payload
            if(action.payload==='User registered successfully')
                state.registrationSuccess=true;
            else
            state.registrationSuccess=false;
        })
        builder.addCase(addUser.rejected, (state,action)=>{
            state.status='failed'
            state.error=action.error.message;
        })
        builder.addCase(validateUser.pending, (state)=>{
            state.status='loading'
        })
        builder.addCase(validateUser.fulfilled, (state, action)=>{
            console.log(action.payload)
            console.log(state.validation)
            state.user=action.payload
            state.status='succeded'
            if(action.payload.user?.userId)
            {
                state.user=action.payload;
                state.validation=true;
                state.validationMessage="Login Successful"
            }
            else
            {
                state.validation=false;
                state.validationMessage="Invalid username or password"
            }
        })
        builder.addCase(validateUser.rejected, (state,action)=>{
            state.status='failed'
            state.error=action.error.message;
        })
    }
})

export const {logout}=userSlice.actions;
export default userSlice.reducer;