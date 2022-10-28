import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import UserReducer from '../_slice/UserSlice';
import NavigateReducer from '../_slice/NavigateSlice'


const store = configureStore({
  reducer: {
    user: UserReducer,
    navigate: NavigateReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
