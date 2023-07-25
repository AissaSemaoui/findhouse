import { createSlice } from "@reduxjs/toolkit";

const listingsSlice = createSlice({
  name: "listings",
  initialState: { value: [] },
  reducers: {
    addListings: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addListings } = listingsSlice.actions;

export default listingsSlice.reducer;
