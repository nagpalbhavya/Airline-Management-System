import { configureStore } from "@reduxjs/toolkit";
import offerReducer from './offerSlice';
import userReducer from './userSlice'


const store=configureStore({
    reducer:{
        offers:offerReducer,
        user:userReducer
    }
})

export default store;
