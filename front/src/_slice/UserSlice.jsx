import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';


const signin = createAsyncThunk('signin', async (payload, { rejectWithValue }) => {
  try {
    const res = await axios.post(api.signin(), payload, {});
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

// const fetchUser = createAsyncThunk('fetchUser', async (walletAddress, { rejectWithValue }) => {
//   try {
//     const res = await axios.get(api.fetchUser(walletAddress));
//     console.log(res.data);
//     return res.data;
//   } catch (err) {
//     return rejectWithValue(err.response.data);
//   }
// });


const initialState = {
  currentUser: {
    wallet_address: '',
    nickname: '',
    message: '',
    joinDate: '',
    ticket_count: 0,
    profileImage: '',
  },
};

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getCurrentUser: state => {
      const localUserData = window.localStorage.getItem('currentUser');
      if (!localUserData) {
        throw new Error('no local user data');
      }
      state.currentUser = JSON.parse(localUserData);
    },
    checkLogin: state => {
      if (window.localStorage.getItem('currentUser')) {
        state.isLogin = true;
      } else {
        state.isLogin = false;
      }
    },
    logout: state => {
      state.currentUser = {
        wallet_address: '',
        nickname: '',
        message: '',
        joinDate: '',
        ticket_count: 0,
        profileImage: '',
      };
      window.localStorage.removeItem('currentUser');
      state.isLogin = false;
    },
  },
  extraReducers: {
    [signin.fulfilled]: (state, action) => {
      state.isLogin = true;
      state.currentUser = action.payload;
      window.localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
    },
    [signin.rejected]: state => {
      state.isLogin = false;
    },
    // [fetchUser.fulfilled]: (state, action) => {
    //   state.searchedUser = action.payload;
    // },
  },
});

export {
  signin,
  // fetchUser,
};

export const { getCurrentUser, checkLogin, logout } = UserSlice.actions;

export default UserSlice.reducer;
