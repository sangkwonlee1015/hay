import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  BottomNavigate: 0,
  isLoggedIn: true,
};

const NavigateSlice = createSlice({
  name: "navigate",
  initialState,
  reducers: {
    bottomNavigate(state, action) {
      state.bottomNavigate = action.payload;
    },
    isLoggedIn(state, action) {
      state.isLoggedIn = action.payload;
    },
  },
});

export const navigateAction = NavigateSlice.actions;

export default NavigateSlice.reducer;