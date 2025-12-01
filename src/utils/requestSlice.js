import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
    name:"requestSlice",
    initialState:[],
    reducers:{
        addRequests:(state,action)=>action.payload,
        removeRequests:(state,action)=>{
            console.log(action.payload,"state")
            const newArray=state.filter((item)=>(
                      item._id !==action.payload))
                      return newArray
        }
    }
})


export const{addRequests, removeRequests} = requestSlice.actions;

export default requestSlice.reducer