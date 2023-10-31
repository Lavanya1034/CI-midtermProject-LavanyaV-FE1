import {createSlice} from '@reduxjs/toolkit';


const initialState={
    cart :[],
    cartCount :0
};

export const cartSlice = createSlice({

    name:"cartStore",
    initialState,
    reducers:{
        addCart:(state,action)=>{
            state.cart.push(action.payload);
            state.cartCount++;
           
            
        },
        deleteCart:(state,action)=>{
            console.log(action.payload)
            state.cart.splice(action.payload,1);
            state.cartCount--;
        },
        deleteAllCart:(state)=>{
            state.cart =[];
            state.cartCount = 0;
        },
        addQuantity:(state,action)=>{
            state.cart[action.payload].quantity++;
        },
        subtractQuantity:(state,action)=>{
            state.cart[action.payload].quantity--;
        }
    
    }

})

export const {addCart,deleteCart,deleteAllCart,addQuantity,subtractQuantity} = cartSlice.actions;

export default cartSlice.reducer;