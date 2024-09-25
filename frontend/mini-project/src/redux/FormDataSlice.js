import { createSlice } from "@reduxjs/toolkit"

const formDataSlice=createSlice({
    name:'form',
    initialState:{
        formData:{
            source:'',
            destination:'',
            date:'',
            numPassengers:0,
            travelClass:'',
        }
    },
    reducers:{
        setForm:(state,action)=>{
            state.formData=action.payload
        },
        clearForm:(state)=>{
            state.formData={
                source:'',
                destination:'',
                date:'',
                numPassengers:0,
                travelClass:''
            }
        }
    }
})

export const {setForm, clearForm}=formDataSlice.actions;

export default formDataSlice.reducer;