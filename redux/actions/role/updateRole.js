import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateRole = {
  updateRole: { data: null, loading: false, error: null },
};

export const updateRole = createAsyncThunk('role/updateRole', async (data) => {
  return axios.patch(`${window.location.origin + '/api'}/role`, data);
});

export const reducerUpdateRole = {
  [updateRole.pending]: (state) => {
    state.updateRole.loading = true;
  },
  [updateRole.fulfilled]: (state, action) => {
    state.updateRole.loading = false;
    state.updateRole.data = action.payload.data;
  },
  [updateRole.rejected]: (state) => {
    state.updateRole.loading = false;
  },
};
