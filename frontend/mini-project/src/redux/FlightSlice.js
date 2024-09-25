import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const searchFlights=createAsyncThunk('/flights/searchFlights',
    async({source, destination, date, numPeople, travelClass})=>{
        let endpoint='';

        switch(travelClass)
        {
            case 'ECONOMY':
                endpoint=`http://localhost:8081/flights/searcheconomyflight/${source}/${destination}/${date}`
                break;
            case 'BUSINESS':
                endpoint=`http://localhost:8081/flights/searchbusinessflight/${source}/${destination}/${date}`
                break;
            case 'PREMIUM ECONOMY':
                endpoint=`http://localhost:8081/flights/searchpremiumeconomyflight/${source}/${destination}/${date}`
                break;
        }

        const response=await axios.get(endpoint, source, destination, date)

        return response.data
    }
)

const flightsSlice=createSlice({
    name:'flights',
    initialState:{
        flights:[],
        status:'idle',
        error:null
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(searchFlights.pending, (state)=>{
            state.status='loading'
        })
        builder.addCase(searchFlights.fulfilled, (state,action)=>{
            state.status='succeeded'
            console.log(action.payload)
            state.flights=action.payload
        })
        builder.addCase(searchFlights.rejected, (state, action)=>{
            state.status='failed'
            state.error=action.error.message
        })
    }
})

export default flightsSlice.reducer;