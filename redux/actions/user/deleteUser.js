import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteUser = {
  deleteUser: { data: null, loading: false, error: null },
};

export const deleteUser = createAsyncThunk('user/deleteUser', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/user`, data);
});

export const reducerDeleteUser = {
  [deleteUser.pending]: (state) => {
    state.deleteUser.loading = true;
  },
  [deleteUser.fulfilled]: (state, action) => {
    state.deleteUser.loading = false;
    state.deleteUser.data = action.payload.data;
  },
  [deleteUser.rejected]: (state) => {
    state.deleteUser.loading = false;
  },
};
