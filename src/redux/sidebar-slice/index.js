import { createSlice } from "@reduxjs/toolkit";

export const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: {
    coolepseSidebar: false,
  },

  reducers: {
    setCoolepseSidebar(state) {
      state.coolepseSidebar = !state.coolepseSidebar;
    },
  },
});

export const { setCoolepseSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
