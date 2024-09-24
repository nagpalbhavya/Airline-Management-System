import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addUser=createAsyncThunk('user/addUser',async(userData)=>{
    const response=await axios.post('http://localhost:8085/users/register', userData)
    return response.data
})

export const validateUser=createAsyncThunk('user/validate', async(credentials)=>{
    try {
        const response=await axios.post('http://localhost:8085/users/login', credentials)
        if (response.status === 200) {
          return response.data; // Successful login
        }
        // If the server returns a different status, it will be handled below
      } catch (error) {
        
      }
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
            state.status='succeded'
            console.log(action.payload);
            if(action.payload==="SUCCESS")
            {
                state.validation=true;
                state.validationMessage="Login Successful"
            }
            else
            {
                state.validation=false;
                state.validationMessage="Incorrect email or password"
            }
        })
        builder.addCase(validateUser.rejected, (state,action)=>{
            state.status='failed'
            state.error=action.error.message;
            state.validation=false;
            state.validationMessage="Something went wrong.."
        })
    }
})

export const {logout}=userSlice.actions;
export default userSlice.reducer;