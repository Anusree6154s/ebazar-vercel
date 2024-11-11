import { createSlice } from "@reduxjs/toolkit";
import {
  checkAuthAsync,
  createUserAsync,
  LoginUserAsync,
  sendOTPAsync,
  signOutsAsync,
  updateUserAsync,
  resetPasswordAsync,
} from "./authThunks";
import { resetOTPSentStatus, resetPasswordResetStatus } from "./authActions";

const initialState = {
  loggedInUser: null,
  status: null,
  error: null,
  userAuthenticated: false,
  user_id: null,
  otp_success: null,
  otp_error: null,
  otp_sent_status: { success: null, fail: null },
  password_reset_status: { success: null, fail: null },
};

export const authSlice = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(LoginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(LoginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(LoginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.error;
      })
      .addCase(checkAuthAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.userAuthenticated = true;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.userAuthenticated = false;
      })
      .addCase(updateUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
      })
      .addCase(signOutsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signOutsAsync.fulfilled, (state) => {
        state.status = "idle";
        state.loggedInUser = null;
      })
      .addCase(sendOTPAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(sendOTPAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.otp_sent_status.success = action.payload.message;
        state.user_id = action.payload.id;
      })
      .addCase(sendOTPAsync.rejected, (state, action) => {
        state.status = "idle";
        state.otp_sent_status.fail = action.error.message;
      })
      .addCase(resetOTPSentStatus, (state) => {
        state.otp_sent_status = { success: null, fail: null };
      })
      .addCase(resetPasswordAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(resetPasswordAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.password_reset_status.success = true;
        console.log("fulfilled", action);
      })
      .addCase(resetPasswordAsync.rejected, (state, action) => {
        state.status = "idle";
        state.password_reset_status.fail = true;
        console.log("rejected", action);
      })
      .addCase(resetPasswordResetStatus, (state) => {
        state.password_reset_status = { success: null, fail: null };
      });
  },
});

export default authSlice.reducer;
