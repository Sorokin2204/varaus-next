import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateFirm = {
  createFirm: { data: null, loading: false, error: null },
};

export const createFirm = createAsyncThunk('firm/createFirm', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/firm`, data);
});

export const reducerCreateFirm = {
  [createFirm.pending]: (state) => {
    state.createFirm.loading = true;
  },
  [createFirm.fulfilled]: (state, action) => {
    state.createFirm.loading = false;
    state.createFirm.data = action.payload.data;
  },
  [createFirm.rejected]: (state) => {
    state.createFirm.loading = false;
  },
};
