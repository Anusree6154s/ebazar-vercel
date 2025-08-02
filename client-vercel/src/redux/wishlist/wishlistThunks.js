import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToWishList,
  fetchWishListByUserId,
  deleteItemFromWishList,
} from "../../api";
import {
  addToWishlistIDB,
  getWishlistItemsIDB,
  removeFromWishlistIDB,
} from "../../indexedDB/wishlistDB";

export const addToWishListAsync = createAsyncThunk(
  "wishlist/addToWishList",
  async (item) => {
    const response = await addToWishList(item);
    return response.data;
  },
);

export const addToWishListIDBAsync = createAsyncThunk(
  "wishlist/addToWishListIDB",
  async (item) => {
    const response = await addToWishlistIDB(item);
    return response;
  },
);

export const fetchWishListByUserIdAsync = createAsyncThunk(
  "wishlist/fetchWishListByUserId",
  async () => {
    const response = await fetchWishListByUserId();
    return response.data;
  },
);

export const fetchWishListIDBAsync = createAsyncThunk(
  "wishlist/fetchWishListIDB",
  async () => {
    const response = await getWishlistItemsIDB();
    return response;
  },
);

export const deleteItemFromWishListAsync = createAsyncThunk(
  "wishlist/deleteItemFromWishList",
  async (itemId) => {
    const response = await deleteItemFromWishList(itemId);
    return response.data;
  },
);

export const deleteItemFromWishListIDBAsync = createAsyncThunk(
  "wishlist/deleteItemFromWishListIDB",
  async (itemId) => {
    const response = await removeFromWishlistIDB(itemId);
    return response;
  },
);
