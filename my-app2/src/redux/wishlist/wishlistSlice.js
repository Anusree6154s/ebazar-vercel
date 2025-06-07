import { createSlice } from "@reduxjs/toolkit";
import {
  addToWishListAsync,
  fetchWishListByUserIdAsync,
  deleteItemFromWishListAsync,
  addToWishListIDBAsync,
  deleteItemFromWishListIDBAsync,
  fetchWishListIDBAsync,
} from "./wishlistThunks";

const initialState = {
  items: [],
  status: null,
};

export const wishListSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    clearWishlistIDB(state) {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToWishListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(addToWishListIDBAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addToWishListIDBAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items.push(action.payload);
      })
      .addCase(fetchWishListByUserIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishListByUserIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload ? action.payload : [];
      })
      .addCase(fetchWishListIDBAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWishListIDBAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload ? action.payload : [];
      })
      .addCase(deleteItemFromWishListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromWishListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload,
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteItemFromWishListIDBAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteItemFromWishListIDBAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id,
        );
        state.items.splice(index, 1);
      });
  },
});

export const {
  setWishlistItemsIDB,
  removeWishlistItemIDB,
  clearWishlistIDB,
  addWishlistItemIDB,
} = wishListSlice.actions;
export default wishListSlice.reducer;
