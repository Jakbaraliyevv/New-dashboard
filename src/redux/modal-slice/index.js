import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
  refreshData: false,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    toggleModal(state) {
      state.isOpen = !state.isOpen;
    },
    triggerRefresh(state) {
      state.refreshData = !state.refreshData;
    },
  },
});

export const { toggleModal, triggerRefresh } = modalSlice.actions;
export default modalSlice.reducer;
