import { createSlice } from "@reduxjs/toolkit";

const sidebarSlice = createSlice({
  name: "sidebarSlice",
  initialState: {
    coolepseSidebar: window.innerWidth < 600, // Mobile ekranda default yopiq
  },
  reducers: {
    setCoolepseSidebar: (state, action) => {
      // Agar payload berilmagan bo'lsa, default holatni o'zgartiramiz
      state.coolepseSidebar =
        action.payload !== undefined ? action.payload : !state.coolepseSidebar;
    },
    resetSidebarState: (state) => {
      state.coolepseSidebar = window.innerWidth < 600;
    },
  },
});

export const { setCoolepseSidebar, resetSidebarState } = sidebarSlice.actions;
export default sidebarSlice.reducer;
