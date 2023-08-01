import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Token, User } from "../utils/types";

interface AuthState {
  tokens: Token | undefined;
  user: User | undefined;
}

const initialState: AuthState = {
  tokens: undefined,
  user: undefined,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    changeTokens(state, action: PayloadAction<Token>) {
      state.tokens = action.payload;
    },
    changeUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    changeEmail(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.email = action.payload;
      }
    },
    changeEmailConfirmation(state, action: PayloadAction<boolean>) {
      if (state.user) {
        state.user.isEmailConfirmed = action.payload;
      }
    },
    changeProfilePictureUrl(state, action: PayloadAction<string>) {
      if (state.user) {
        state.user.profilePictureUrl = action.payload;
      }
    },
    clearUser(state) {
      state.user = undefined;
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice;
