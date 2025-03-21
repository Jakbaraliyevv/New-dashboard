import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebar-slice";
export const store = configureStore({
  reducer: {
    sidebarSlice,
  },
});
  