import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteRooms = {
  deleteRooms: { data: null, loading: false, error: null },
};

export const deleteRooms = createAsyncThunk('user/deleteRooms', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/rooms`, data);
});

export const reducerDeleteRooms = {
  [deleteRooms.pending]: (state) => {
    state.deleteRooms.loading = true;
  },
  [deleteRooms.fulfilled]: (state, action) => {
    state.deleteRooms.loading = false;
    state.deleteRooms.data = action.payload.data;
  },
  [deleteRooms.rejected]: (state) => {
    state.deleteRooms.loading = false;
  },
};
