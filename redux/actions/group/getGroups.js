import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetGroups = {
  getGroups: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getGroups = createAsyncThunk('group/getGroups', async (data = {}, { getState }) => {
  const {
    group: {
      getGroups: { offset, page },
    },
    app: { activeFirm },
  } = getState();
  console.log('FIRM', activeFirm);
  return axios.get(`${window.location.origin + '/api'}/groups/`, {
    params: { offset, page, ...data },
    headers: {
      firm: activeFirm?.value,
    },
  });
});

export const reducerGetGroups = {
  [getGroups.pending]: (state) => {
    state.getGroups.loading = true;
  },
  [getGroups.fulfilled]: (state, action) => {
    state.getGroups.loading = false;

    state.getGroups.data = action.payload.data.list;
    state.getGroups.pages = action.payload.data.pages;
    state.getGroups.page = parseInt(action.payload.data.page);
  },
  [getGroups.rejected]: (state) => {
    state.getGroups.loading = false;
  },
};
