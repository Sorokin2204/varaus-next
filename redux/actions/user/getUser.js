import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetUser = {
  getUser: { data: null, loading: false, error: null },
};

export const getUser = createAsyncThunk('user/getUser', async (id, { getState }) => {
  return axios.get(`${window.location.origin + '/api'}/user/`, { params: { id } });
});

export const reducerGetUser = {
  [getUser.pending]: (state) => {
    state.getUser.loading = true;
  },
  [getUser.fulfilled]: (state, action) => {
    state.getUser.loading = false;
    state.getUser.data = action.payload.data;
  },
  [getUser.rejected]: (state, payload) => {
    state.getUser.loading = false;
    state.getUser.error = payload;
  },
};
