import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';


const nicknameDuplicateCheck = createAsyncThunk(
  "nicknameDuplicateCheck",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await axios.post(api.nicknameDuplicateCheck(), payload, {});
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


const initialState = {
  nickname: '',
  isNotDuplicate: true,
  gender: 0,
  birthyear: 2022,
  latitude: -1,
  longitude: -1,
  areaName: '기본값',
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    nickname(state, action) {
      state.nickname = action.payload;
    },
    isNotDuplicate(state, action) {
      state.isNotDuplicate = action.payload;
    },
    gender(state, action) {
      state.gender = action.payload;
    },
    birthyear(state, action) {
      state.birthyear = action.payload;
    },
    latitude(state, action) {
      state.latitude = action.payload;
    },
    longitude(state, action) {
      state.longitude = action.payload;
    },
    areaName(state, action) {
      state.areaName = action.payload;
    },
  },
  extraReducers: {
    [nicknameDuplicateCheck.fulfilled]: (state) => {
      state.isNotDuplicate = true;
    },
    [nicknameDuplicateCheck.rejected]: (state) => {
      state.isNotDuplicate = false;
    },
  },
});

export {
  nicknameDuplicateCheck,
  // fetchUser,
};

export const userAction = UserSlice.actions;

export default UserSlice.reducer;
