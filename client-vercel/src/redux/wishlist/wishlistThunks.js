import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  addToWishList,
  fetchWishListByUserId,
  deleteItemFromWishList,
  addToWishListMany,
} from "../../api";
import {
  addToWishlistIDB,
  clearWishlistIDB,
  getWishlistItemsCountIDB,
  getWishlistItemsIDB,
  removeFromWishlistIDB,
} from "../../indexedDB/wishlistDB";

export const addToWishListAsync = createAsyncThunk(
  "wishlist/addToWishList",
  async (item) => {
    const response = await addToWishList(item);
    return response.data;
  }
);

export const addToWishListIDBAsync = createAsyncThunk(
  "wishlist/addToWishListIDB",
  async (item) => {
    const response = await addToWishlistIDB(item);
    return response;
  }
);

export const fetchWishListByUserIdAsync = createAsyncThunk(
  "wishlist/fetchWishListByUserId",
  async () => {
    const response = await fetchWishListByUserId();
    return response.data;
  }
);

export const fetchWishListIDBAsync = createAsyncThunk(
  "wishlist/fetchWishListIDB",
  async () => {
    const response = await getWishlistItemsIDB();
    return response;
  }
);

export const deleteItemFromWishListAsync = createAsyncThunk(
  "wishlist/deleteItemFromWishList",
  async (itemId) => {
    const response = await deleteItemFromWishList(itemId);
    return response.data;
  }
);

export const deleteItemFromWishListIDBAsync = createAsyncThunk(
  "wishlist/deleteItemFromWishListIDB",
  async (itemId) => {
    const response = await removeFromWishlistIDB(itemId);
    return response;
  }
);

export const isWishListIDBEmptyAsync = createAsyncThunk(
  "wishlist/isWishListIDBEmpty",
  async () => {
    const wishlistIDBCount = await getWishlistItemsCountIDB();
    return !wishlistIDBCount;
  }
);

export const moveWishListFromIDBToRemoteAsync = createAsyncThunk(
  "wishlist/moveWishListFromIDBToRemote",
  async (userID) => {
    const wishlistItemsIDB = await getWishlistItemsIDB();

    if (wishlistItemsIDB.length > 0) {
      const wishlistItemsRemote = await fetchWishListByUserId();
      const wishlistItemsRemoteIds = new Set(
        wishlistItemsRemote.data.map((item) => item.product.id)
      );

      const addToWishListManyPayload = wishlistItemsIDB
        .filter((product) => !wishlistItemsRemoteIds.has(product.id))
        .map((product) => ({
          product: product.id,
          user: userID,
        }));

      let wishlistRes;
      if (addToWishListManyPayload.length > 0) {
        wishlistRes = await addToWishListMany(addToWishListManyPayload);
      }

      await clearWishlistIDB();

      return wishlistRes.data;
    }
  }
);
