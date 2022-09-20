import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteFirm = {
  deleteFirm: { data: null, loading: false, error: null },
};

export const deleteFirm = createAsyncThunk('firm/deleteFirm', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/firm`, data);
});

export const reducerDeleteFirm = {
  [deleteFirm.pending]: (state) => {
    state.deleteFirm.loading = true;
  },
  [deleteFirm.fulfilled]: (state, action) => {
    state.deleteFirm.loading = false;
    state.deleteFirm.data = action.payload.data;
  },
  [deleteFirm.rejected]: (state) => {
    state.deleteFirm.loading = false;
  },
};
