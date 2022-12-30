import { bindActionCreators, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { cartItemType, CartState, productType } from "../utils/custom";

// Define the initial state using that type
const initialState: CartState = {
  products: [],
  qty: 0,
  total: 0
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<cartItemType>) => {
      // check if cart empty
      let added = false
      if (state.total != 0) {
        state.products.map((item, key)=>{
            if(item._id == action.payload._id){
                state.products[key].subqty += action.payload.subqty;
                state.products[key].subtotal += (action.payload.subtotal * action.payload.subqty);
                state.qty += action.payload.subqty;
                state.total += action.payload.prices * action.payload.subqty; 
                added = true
            } 
        })       
      } 
      
      if (!added) {
        let cart = {
          ...action.payload,
          subtotal: (action.payload.prices * action.payload.subqty),
          subqty: action.payload.subqty
        }
        state.products.push(cart);
        state.qty += action.payload.subqty;
        state.total += (action.payload.prices * action.payload.subqty); 
      }
    },
    removeProduct: (state, action: PayloadAction<cartItemType>) => {
      const index = state.products.findIndex(product => product._id == action.payload._id)

      state.qty -= state.products[index].subqty
      state.total -= state.products[index].subtotal

      let newCart = [...state.products]
      if (index >= 0) {
        newCart.splice(index, 1)
      } 

      state.products = newCart
    },
    incQty: (state, action: PayloadAction<cartItemType>) => {
      const index = state.products.findIndex(product => product._id == action.payload._id)

      state.products[index].subqty++
      state.products[index].subtotal += action.payload.prices
      state.qty++
      state.total += action.payload.prices
    },
    decQty: (state, action: PayloadAction<cartItemType>) => {
      const index = state.products.findIndex(product => product._id == action.payload._id)

      if (state.products[index].subqty > 1){
        state.products[index].subqty--
        state.products[index].subtotal -= action.payload.prices
        state.qty--
        state.total -= action.payload.prices        
      }
    },
    reset: (state) => {
      state.products = [];
      state.qty = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, removeProduct, incQty, decQty, reset } = cartSlice.actions;
export default cartSlice.reducer;