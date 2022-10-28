import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import UserReducer from '../_slice/UserSlice';


const store = configureStore({
  reducer: {
    user: UserReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;
