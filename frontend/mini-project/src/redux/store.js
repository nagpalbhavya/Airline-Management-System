import { configureStore } from "@reduxjs/toolkit";
import offerReducer from './offerSlice';
import userReducer from './userSlice'
import airportReducer from './AirportSlice'


const store=configureStore({
    reducer:{
        offers:offerReducer,
        user:userReducer,
        airport:airportReducer
    }
})

export default store;
