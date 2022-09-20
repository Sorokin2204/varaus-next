import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateRoom = {
  createRoom: { data: null, loading: false, error: null },
};

export const createRoom = createAsyncThunk('room/createRoom', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/room`, data);
});

export const reducerCreateRoom = {
  [createRoom.pending]: (state) => {
    state.createRoom.loading = true;
  },
  [createRoom.fulfilled]: (state, action) => {
    state.createRoom.loading = false;
    state.createRoom.data = action.payload.data;
  },
  [createRoom.rejected]: (state) => {
    state.createRoom.loading = false;
  },
};
