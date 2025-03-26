import { configureStore } from "@reduxjs/toolkit";
import sidebarSlice from "./sidebar-slice";
  import modalSlice from "./modal-slice/index";

export const store = configureStore({
  reducer: {
    sidebarSlice,
    modalSlice,
  },
});
