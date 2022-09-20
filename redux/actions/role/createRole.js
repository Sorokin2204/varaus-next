import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateRole = {
  createRole: { data: null, loading: false, error: null },
};

export const createRole = createAsyncThunk('role/createRole', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/role`, data);
});

export const reducerCreateRole = {
  [createRole.pending]: (state) => {
    state.createRole.loading = true;
  },
  [createRole.fulfilled]: (state, action) => {
    state.createRole.loading = false;
    state.createRole.data = action.payload.data;
  },
  [createRole.rejected]: (state) => {
    state.createRole.loading = false;
  },
};
