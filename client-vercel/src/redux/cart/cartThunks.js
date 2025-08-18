import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToCart,
  updateCart,
  deleteItemFromCart,
  resetCart,
  fetchCartByUserId,
  addToCartMany,
} from "../../api";
import {
  addToCartIDB,
  clearCartIDB,
  getCartItemsCountIDB,
  getCartItemsIDB,
  removeFromCartIDB,
  updateCartIDB,
} from "../../indexedDB/cartDB";

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async (item) => {
    const response = await addToCart(item);
    return response.data;
  }
);

export const addToCartIDBAsync = createAsyncThunk(
  "cart/addToCartIDB",
  async (item) => {
    const response = await addToCartIDB(item);
    return response;
  }
);

export const fetchCartByUserIdAsync = createAsyncThunk(
  "cart/fetchCartByUserId",
  async () => {
    const response = await fetchCartByUserId();
    return response.data;
  }
);

export const fetchCartIDBAsync = createAsyncThunk(
  "cart/fetchCartItemsIDB",
  async () => {
    const response = await getCartItemsIDB();
    return response;
  }
);

export const updateCartAsync = createAsyncThunk(
  "cart/updateCart",
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);

export const updateCartIDBAsync = createAsyncThunk(
  "cart/updateCartIDB",
  async (update) => {
    const response = await updateCartIDB(update);
    return response;
  }
);

export const deleteItemFromCartAsync = createAsyncThunk(
  "cart/deleteItemFromCart",
  async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
  }
);

export const deleteItemFromCartIDBAsync = createAsyncThunk(
  "cart/deleteItemFromCartIDB",
  async (itemId) => {
    const response = await removeFromCartIDB(itemId);
    return response;
  }
);

export const resetCartAsync = createAsyncThunk(
  "cart/resetCart",
  async (userId) => {
    const response = await resetCart(userId);
    return response;
  }
);

export const isCartIDBEmptyAsync = createAsyncThunk(
  "cart/isCartIDBEmpty",
  async () => {
    const cartIDBCount = await getCartItemsCountIDB();
    return !cartIDBCount;
  }
);


export const moveCartFromIDBToRemoteAsync = createAsyncThunk(
  "cart/moveCartFromIDBToRemote",
  async (userID) => {
    const cartItemsIDB = await getCartItemsIDB();

    if (cartItemsIDB.length > 0) {
      const cartItemsRemote = await fetchCartByUserId();
      const cartItemsRemoteIds = new Set(
        cartItemsRemote.data.map((item) => item.product.id)
      );

      const addToCartManyPayload = cartItemsIDB
        .filter((product) => !cartItemsRemoteIds.has(product.id))
        .map((product) => ({
          product: product.id,
          user: userID,
          quantity: product.quantity || 1
        }));

      let cartRes;
      if (addToCartManyPayload.length > 0) {
        cartRes = await addToCartMany(addToCartManyPayload);
      }

      await clearCartIDB();

      const value= cartRes.data;
      return value
    }
  }
);
