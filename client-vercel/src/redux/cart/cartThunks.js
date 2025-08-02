import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  fetchItemsByUserId,
  updateCart,
  deleteItemFromCart,
  resetCart,
} from "../../api";
import {
  addToCartIDB,
  getCartItemsIDB,
  removeFromCartIDB,
  updateCartIDB,
} from "../../indexedDB/cartDB";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  },
);

export const addToCartIDBAsync = createAsyncThunk(
  "cart/addToCartIDB",
  async (item) => {
    const response = await addToCartIDB(item);
    return response;
  },
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async () => {
    const response = await fetchItemsByUserId();
    return response.data;
  },
);

export const fetchCartIDBAsync = createAsyncThunk(
  "cart/fetchCartItemsIDB",
  async () => {
    const response = await getCartItemsIDB();
    return response;
  },
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  },
);

export const updateCartIDBAsync = createAsyncThunk(
  "cart/updateCartIDB",
  async (update) => {
    const response = await updateCartIDB(update);
    return response;
  },
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  },
);

export const deleteItemFromCartIDBAsync = createAsyncThunk(
  "cart/deleteItemFromCartIDB",
  async (itemId) => {
    const response = await removeFromCartIDB(itemId);
    return response;
  },
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response;
  },
);
