import { configureStore } from "@reduxjs/toolkit";
import offerReducer from './offerSlice';
import userReducer from './userSlice'
import airportReducer from './AirportSlice'
import flightReducer from './FlightSlice'
import formDataReducer from './FormDataSlice'
import bookingReducer from './BookingSlice'
import ownerReducer from './ownerSlice'


const store=configureStore({
    reducer:{
        offers:offerReducer,
        user:userReducer,
        airport:airportReducer,
        flights:flightReducer,
        form:formDataReducer,
        booking:bookingReducer,
        owner:ownerReducer
    }
})

export default store;
