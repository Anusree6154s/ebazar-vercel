import { createSlice } from "@reduxjs/toolkit";

export const IDBSlice = createSlice({
  name: "IDBItemsLength",
  initialState: {
    wishlist: 0,
    cart: 0,
  },
  reducers: {
    incrementWishlistLength: (state) => {
      state.wishlist += 1;
    },
    decrementWishlistLength: (state) => {
      state.wishlist -= 1;
    },
    setWishlistlength: (state, action) => {
      state.wishlist = action.payload;
    },
    incrementCartLength: (state) => {
      state.cart += 1;
    },
    decrementCartLength: (state) => {
      state.cart -= 1;
    },
  },
});

export const {
  incrementWishlistLength,
  decrementWishlistLength,
  incrementCartLength,
  decrementCartLength,
  setWishlistlength,
} = IDBSlice.actions;

export default IDBSlice.reducer;
