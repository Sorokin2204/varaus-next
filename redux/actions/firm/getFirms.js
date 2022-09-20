import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetFirms = {
  getFirms: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getFirms = createAsyncThunk('user/getFirms', async (data = {}, { getState }) => {
  const {
    user: {
      getUsers: { offset, page },
    },
  } = getState();
  return axios.get(`${window.location.origin + '/api'}/firms/`, { params: { offset, page, ...data } });
});

export const reducerGetFirms = {
  [getFirms.pending]: (state) => {
    state.getFirms.loading = true;
  },
  [getFirms.fulfilled]: (state, action) => {
    state.getFirms.loading = false;

    state.getFirms.data = action.payload.data.list;
    state.getFirms.pages = action.payload.data.pages;
    state.getFirms.page = parseInt(action.payload.data.page);
  },
  [getFirms.rejected]: (state) => {
    state.getFirms.loading = false;
  },
};
