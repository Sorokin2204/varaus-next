import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteGroup = {
  deleteGroup: { data: null, loading: false, error: null },
};

export const deleteGroup = createAsyncThunk('group/deleteGroup', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/group`, data);
});

export const reducerDeleteGroup = {
  [deleteGroup.pending]: (state) => {
    state.deleteGroup.loading = true;
  },
  [deleteGroup.fulfilled]: (state, action) => {
    state.deleteGroup.loading = false;
    state.deleteGroup.data = action.payload.data;
  },
  [deleteGroup.rejected]: (state) => {
    state.deleteGroup.loading = false;
  },
};
