import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BottomNavigate: 0,
};

const NavigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    bottomNavigate(state, action) {
      state.bottomNavigate = action.payload;
    },
  },
});

export const navigateAction = NavigateSlice.actions;

export default NavigateSlice.reducer;