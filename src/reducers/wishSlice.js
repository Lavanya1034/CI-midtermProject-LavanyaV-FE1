import {createSlice} from '@reduxjs/toolkit';


const initialState={
    wish :[],
    wishCount :0
};

export const wishSlice = createSlice({

    name:"wishStore",
    initialState,
    reducers:{
        addWish:(state,action)=>{
            state.wish.push(action.payload);
            state.wishCount++;
            
        },
        deleteWish:(state,action)=>{
            state.wish.splice(action.payload,1);
            state.wishCount--;
        }
    }

})

export const {addWish,deleteWish} = wishSlice.actions;

export default wishSlice.reducer;