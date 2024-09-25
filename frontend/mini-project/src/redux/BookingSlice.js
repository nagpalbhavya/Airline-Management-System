import { createSlice } from "@reduxjs/toolkit"


const bookingSlice=createSlice({
    name:'booking',
    initialState:{
        passengerData:[],
        fightId:null,
        bookingId:null,
        paymentId:null
    },
    reducers:{
        addPassenger:(state,action)=>{
            state.passengerData.push(action.payload)
        },
        setFlightId:(state,action)=>{
            state.flightId=action.payload
        },
        setBookingId:(state,action)=>{
            state.bookingId=action.payload
        },
        setPaymentId:(state,action)=>{
            state.paymentId=action.payload
        }
    }
})

export const {addPassenger, setFlightId, setBookingId, setPaymentId}=bookingSlice.actions;
export default bookingSlice.reducer;