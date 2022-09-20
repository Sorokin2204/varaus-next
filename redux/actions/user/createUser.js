import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateUser = {
  createUser: { data: null, loading: false, error: null },
};

export const createUser = createAsyncThunk('user/createUser', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/user`, data);
});

export const reducerCreateUser = {
  [createUser.pending]: (state) => {
    state.createUser.loading = true;
  },
  [createUser.fulfilled]: (state, action) => {
    state.createUser.loading = false;
    state.createUser.data = action.payload.data;
  },
  [createUser.rejected]: (state) => {
    state.createUser.loading = false;
  },
};
