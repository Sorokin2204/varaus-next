import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteRoom = {
  deleteRoom: { data: null, loading: false, error: null },
};

export const deleteRoom = createAsyncThunk('room/deleteRoom', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/room`, data);
});

export const reducerDeleteRoom = {
  [deleteRoom.pending]: (state) => {
    state.deleteRoom.loading = true;
  },
  [deleteRoom.fulfilled]: (state, action) => {
    state.deleteRoom.loading = false;
    state.deleteRoom.data = action.payload.data;
  },
  [deleteRoom.rejected]: (state) => {
    state.deleteRoom.loading = false;
  },
};
