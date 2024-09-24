import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"


export const fetchAirports=createAsyncThunk('airports/list', async()=>{
    const response=await axios.get('http://localhost:8083/airports/list')
    return response.data
})

const airportSlice=createSlice({
    name:'airport',
    initialState:{
        airports:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchAirports.pending,(state)=>{
            state.status='loading'
        })
        builder.addCase(fetchAirports.fulfilled, (state,action)=>{
            console.log(state.status)
            state.status='succeded'
            state.airports=action.payload
        })
        builder.addCase(fetchAirports.rejected, (state, action)=>{
            console.log(state.status)
            state.status='failed'
            state.error=action.error.message
        })
    }
})

export default airportSlice.reducer;