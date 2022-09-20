import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteSections = {
  deleteSections: { data: null, loading: false, error: null },
};

export const deleteSections = createAsyncThunk('user/deleteSections', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/sections`, data);
});

export const reducerDeleteSections = {
  [deleteSections.pending]: (state) => {
    state.deleteSections.loading = true;
  },
  [deleteSections.fulfilled]: (state, action) => {
    state.deleteSections.loading = false;
    state.deleteSections.data = action.payload.data;
  },
  [deleteSections.rejected]: (state) => {
    state.deleteSections.loading = false;
  },
};
