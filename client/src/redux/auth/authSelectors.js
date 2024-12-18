export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectAuthStatus = (state) => state.auth.status;
export const selectUserChecked = (state) => state.auth.userAuthenticated;
export const selectUserId = (state) => state.auth.user_id;
export const selectOTPSentStatus= (state) => state.auth.otp_sent_status;
export const selectPasswordResetStatus= (state) => state.auth.password_reset_status;
export const selectAuthError= (state) => state.auth.authError;
                
