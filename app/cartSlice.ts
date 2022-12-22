import { createSlice } from "@reduxjs/toolkit";
import { CartState, productType } from "../utils/custom";

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
    addProduct: (state, action) => {
      state.products.push(action.payload);
      state.qty += 1;
      state.total += action.payload.price;
      // state.total += action.payload.price * action.payload.quantity;
    },
    reset: (state) => {
      state.products = [];
      state.qty = 0;
      state.total = 0;
    },
  },
});

export const { addProduct, reset } = cartSlice.actions;
export default cartSlice.reducer;