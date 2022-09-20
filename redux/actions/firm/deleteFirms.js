import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteFirms = {
  deleteFirms: { data: null, loading: false, error: null },
};

export const deleteFirms = createAsyncThunk('user/deleteFirms', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/firms`, data);
});

export const reducerDeleteFirms = {
  [deleteFirms.pending]: (state) => {
    state.deleteFirms.loading = true;
  },
  [deleteFirms.fulfilled]: (state, action) => {
    state.deleteFirms.loading = false;
    state.deleteFirms.data = action.payload.data;
  },
  [deleteFirms.rejected]: (state) => {
    state.deleteFirms.loading = false;
  },
};
