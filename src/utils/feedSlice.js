import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name:"feedSlice",
    initialState:null,
    reducers:{
        addFeed:(state,action)=>action.payload,
        removeFeed:(state,action)=>{
            const newArray=state.filter((item)=>item._id!==action.payload);
            return newArray;
        }
    }
})



export const {addFeed,removeFeed} = feedSlice.actions;

export default feedSlice.reducer