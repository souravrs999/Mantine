import { ApplicationState } from "@/types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ApplicationState = {
  sidebarOpen: false,
};

export const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {
    sidebarToggle: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
  },
});

export const { sidebarToggle } = applicationSlice.actions;

export default applicationSlice.reducer;
