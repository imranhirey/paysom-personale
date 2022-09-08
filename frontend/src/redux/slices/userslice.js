import { createSlice } from "@reduxjs/toolkit";

export const userslice= createSlice({
    name:'userslice',
    initialState:{
        user:{
            
        }
    },
    reducers:{
        adduser:(state,payload)=>{
            state.user=payload
            

        }
    }

})

export  const {adduser}= userslice.actions
export default userslice.reducer