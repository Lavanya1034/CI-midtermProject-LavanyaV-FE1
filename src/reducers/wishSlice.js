import {createSlice} from '@reduxjs/toolkit';

const loginCheck = localStorage.getItem("token")


const wish = (localStorage.getItem("wish") !== null && loginCheck)?
            JSON.parse(localStorage.getItem("wish")):[];
const wishCount = (localStorage.getItem("wishCount") && loginCheck) !== null?
            JSON.parse(localStorage.getItem("wishCount")):0;

const setWishFunc = (wish,wishCount)=>{
    localStorage.setItem("wish",JSON.stringify(wish));
    localStorage.setItem("wishCount",JSON.stringify(wishCount))

}

const initialState={
    wish :wish,
    wishCount :wishCount
};

export const wishSlice = createSlice({

    name:"wishStore",
    initialState,
    reducers:{
        addWish:(state,action)=>{
            state.wish.push(action.payload);
            state.wishCount++;
            setWishFunc(state.wish.map((item)=>item),state.wishCount)
            
        },
        deleteWish:(state,action)=>{
            state.wish.splice(action.payload,1);
            state.wishCount--;
            setWishFunc(state.wish.map((item)=>item),state.wishCount)
        }
    }

})

export const {addWish,deleteWish} = wishSlice.actions;

export default wishSlice.reducer;