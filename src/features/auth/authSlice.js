import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: null,
    user: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = !!action.payload;
      state.user = action.payload;
    },
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated, setUser } = authSlice.actions;

export default authSlice.reducer;
