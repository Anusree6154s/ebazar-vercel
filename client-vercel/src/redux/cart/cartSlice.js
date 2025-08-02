import { createSlice } from "@reduxjs/toolkit";
import {
  addToCartAsync,
  addToCartIDBAsync,
  deleteItemFromCartAsync,
  deleteItemFromCartIDBAsync,
  fetchCartByUserIdAsync,
  fetchCartIDBAsync,
  resetCartAsync,
  updateCartAsync,
  updateCartIDBAsync,
} from "./cartThunks";

const initialState = {
  items: [],
  status: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItemsIDB(state, action) {
      state.items = action.payload;
    },
    addCartItemIDB(state, action) {
      state.items = [...state.items, action.payload];
    },
    updateCartItemIDB(state, action) {
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id,
      );
      const cartItems = [...state.items];
      cartItems.splice(index, 1, action.payload);
      state.items = cartItems;
    },
    removeCartItemIDB(state, action) {
      const index = state.items.findIndex((item) => item.id === action.payload);
      state.items.splice(index, 1);
    },
    clearCartIDB(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToCartIDBAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToCartIDBAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchCartByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload ? action.payload : [];
      })
      .addCase(fetchCartIDBAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCartIDBAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload ? action.payload : [];
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items[index] = action.payload;
      })
      .addCase(updateCartIDBAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateCartIDBAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items[index] = action.payload;
      })
      .addCase(deleteItemFromCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteItemFromCartIDBAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromCartIDBAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload,
        );
        state.items.splice(index, 1);
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(resetCartAsync.fulfilled, (state) => {
        state.status = "idle";
        state.items = [];
      });
  },
});

export const {
  setCartItemsIDB,
  removeCartItemIDB,
  clearCartIDB,
  addCartItemIDB,
} = cartSlice.actions;
export default cartSlice.reducer;
