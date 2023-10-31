import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishSlice from "./wishSlice";


const store = configureStore({
    reducer:{
        cartStore:cartSlice,
        wishStore:wishSlice,
    
    }
})

export default store;