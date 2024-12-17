import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchLoggedInUser, fetchLoggedInUserOrders } from "../../api";

export const fetchLoggedInUserAsync = createAsyncThunk(
  "user/fetchLoggedInUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchLoggedInUser();
      return response.data;
    } catch (error) {
      rejectWithValue(null);
    }
  }
);

export const fetchLoggedInUserOrdersAsync = createAsyncThunk(
  "user/fetchLoggedInUserOrders",
  async (userId) => {
    const response = await fetchLoggedInUserOrders(userId);
    return response.data;
  }
);
