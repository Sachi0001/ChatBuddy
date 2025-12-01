import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
name:"connectionSlice",
initialState:[],
reducers:{

addConnections:(state,action)=>action.payload,
removeConnections:(state,action)=>{
    state = state.filter((item)=>item._id!==action.payload)
}

}



})


 export const {addConnections,removeConnections} = connectionSlice.actions;
 export default connectionSlice.reducer