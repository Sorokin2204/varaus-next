import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateUser = {
  updateUser: { data: null, loading: false, error: null },
};

export const updateUser = createAsyncThunk('user/updateUser', async (data) => {
  return axios.patch(`${window.location.origin + '/api'}/user`, data);
});

export const reducerUpdateUser = {
  [updateUser.pending]: (state) => {
    state.updateUser.loading = true;
  },
  [updateUser.fulfilled]: (state, action) => {
    state.updateUser.loading = false;
    state.updateUser.data = action.payload.data;
  },
  [updateUser.rejected]: (state) => {
    state.updateUser.loading = false;
  },
};
