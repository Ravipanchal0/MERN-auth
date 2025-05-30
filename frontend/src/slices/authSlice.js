import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.authStatus = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.authStatus = false;
      state.user = null;
    },
    updateProfile: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, updateProfile } = authSlice.actions;
export default authSlice.reducer;
