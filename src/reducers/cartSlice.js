import {createSlice} from '@reduxjs/toolkit';

const loginCheck = localStorage.getItem("token")


const cart = (localStorage.getItem("cart") !== null && loginCheck)?
            JSON.parse(localStorage.getItem("cart")):[];
const cartCount = (localStorage.getItem("cartCount") && loginCheck) !== null?
            JSON.parse(localStorage.getItem("cartCount")):0;

const setCartFunc = (cart,cartCount)=>{
    localStorage.setItem("cart",JSON.stringify(cart));
    localStorage.setItem("cartCount",JSON.stringify(cartCount))

}

            
const initialState={
    cart :cart,
    cartCount :cartCount
};

export const cartSlice = createSlice({

    name:"cartStore",
    initialState,
    reducers:{
        addCart:(state,action)=>{
            state.cart.push(action.payload);
            state.cartCount++;
           
            setCartFunc(state.cart.map((item)=>item),state.cartCount)
        },
        deleteCart:(state,action)=>{
            console.log(action.payload)
            state.cart.splice(action.payload,1);
            state.cartCount--;
            setCartFunc(state.cart.map((item)=>item),state.cartCount)
        },
        deleteAllCart:(state)=>{
            state.cart =[];
            state.cartCount = 0;
            setCartFunc(state.cart.map((item)=>item),state.cartCount)
        },
        addQuantity:(state,action)=>{
            state.cart[action.payload].quantity++;
            setCartFunc(state.cart.map((item)=>item),state.cartCount)
        },
        subtractQuantity:(state,action)=>{
            state.cart[action.payload].quantity--;
            setCartFunc(state.cart.map((item)=>item),state.cartCount)
        }
    
    }

})

export const {addCart,deleteCart,deleteAllCart,addQuantity,subtractQuantity} = cartSlice.actions;

export default cartSlice.reducer;