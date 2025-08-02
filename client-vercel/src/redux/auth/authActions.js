

import { createAction } from '@reduxjs/toolkit';

export const resetOTPSentStatus = createAction('auth/resetOTPSentStatus');
export const resetPasswordResetStatus = createAction('auth/resetPasswordResetStatus');
export const resetAuthError = createAction('auth/resetAuthError');
