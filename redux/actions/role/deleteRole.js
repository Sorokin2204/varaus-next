import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteRole = {
  deleteRole: { data: null, loading: false, error: null },
};

export const deleteRole = createAsyncThunk('role/deleteRole', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/role`, data);
});

export const reducerDeleteRole = {
  [deleteRole.pending]: (state) => {
    state.deleteRole.loading = true;
  },
  [deleteRole.fulfilled]: (state, action) => {
    state.deleteRole.loading = false;
    state.deleteRole.data = action.payload.data;
  },
  [deleteRole.rejected]: (state) => {
    state.deleteRole.loading = false;
  },
};
