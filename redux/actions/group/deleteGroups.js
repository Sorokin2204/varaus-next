import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteGroups = {
  deleteGroups: { data: null, loading: false, error: null },
};

export const deleteGroups = createAsyncThunk('user/deleteGroups', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/groups`, data);
});

export const reducerDeleteGroups = {
  [deleteGroups.pending]: (state) => {
    state.deleteGroups.loading = true;
  },
  [deleteGroups.fulfilled]: (state, action) => {
    state.deleteGroups.loading = false;
    state.deleteGroups.data = action.payload.data;
  },
  [deleteGroups.rejected]: (state) => {
    state.deleteGroups.loading = false;
  },
};
