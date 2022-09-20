import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateGroup = {
  createGroup: { data: null, loading: false, error: null },
};

export const createGroup = createAsyncThunk('group/createGroup', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/group`, data);
});

export const reducerCreateGroup = {
  [createGroup.pending]: (state) => {
    state.createGroup.loading = true;
  },
  [createGroup.fulfilled]: (state, action) => {
    state.createGroup.loading = false;
    state.createGroup.data = action.payload.data;
  },
  [createGroup.rejected]: (state) => {
    state.createGroup.loading = false;
  },
};
