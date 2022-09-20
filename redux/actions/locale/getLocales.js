import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetLocales = {
  getLocales: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getLocales = createAsyncThunk('locale/getLocales', async (data = {}, { getState }) => {
  return axios.get(`${window.location.origin + '/api'}/locales/`);
});

export const reducerGetLocales = {
  [getLocales.pending]: (state) => {
    state.getLocales.loading = true;
  },
  [getLocales.fulfilled]: (state, action) => {
    state.getLocales.loading = false;
    state.getLocales.data = action.payload.data;
  },
  [getLocales.rejected]: (state, action) => {
    state.getLocales.error = action.payload;
    state.getLocales.loading = false;
  },
};
