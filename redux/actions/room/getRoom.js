import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetRoom = {
  getRoom: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getRoom = createAsyncThunk('user/getRoom', async (data = {}, { getState }) => {
  return axios.get(`${window.location.origin + '/api'}/room/`, { params: { id: data?.id } });
});

export const reducerGetRoom = {
  [getRoom.pending]: (state) => {
    state.getRoom.loading = true;
  },
  [getRoom.fulfilled]: (state, action) => {
    state.getRoom.loading = false;
    state.getRoom.data = action.payload.data;
  },
  [getRoom.rejected]: (state) => {
    state.getRoom.loading = false;
  },
};
