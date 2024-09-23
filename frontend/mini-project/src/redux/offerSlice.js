import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchOffers=createAsyncThunk('offers/list', async()=>{
    const response=await axios.get('http://localhost:8081/offers/list')
    return response.data;
})

const offerSlice=createSlice({
    name:'offers',
    initialState:{
        offers:[],
        status:'idle',
        error:null,
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchOffers.pending, (state)=>{
            state.status='loading'
        })
        builder.addCase(fetchOffers.fulfilled, (state,action)=>{
            state.status='success'
            state.offers=action.payload;
        })
        builder.addCase(fetchOffers.rejected, (state,action)=>{
            state.status='falied'
            state.error=action.error.message
        })
    }
})

export default offerSlice.reducer;