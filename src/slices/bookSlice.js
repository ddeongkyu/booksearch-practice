import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shoppingCart: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
  },
});

export const { setShoppingCart } = bookSlice.actions;

export default bookSlice.reducer;
