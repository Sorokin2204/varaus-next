import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteRoles = {
  deleteRoles: { data: null, loading: false, error: null },
};

export const deleteRoles = createAsyncThunk('user/deleteRoles', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/roles`, data);
});

export const reducerDeleteRoles = {
  [deleteRoles.pending]: (state) => {
    state.deleteRoles.loading = true;
  },
  [deleteRoles.fulfilled]: (state, action) => {
    state.deleteRoles.loading = false;
    state.deleteRoles.data = action.payload.data;
  },
  [deleteRoles.rejected]: (state) => {
    state.deleteRoles.loading = false;
  },
};
