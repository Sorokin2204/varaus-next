import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetUsers = {
  getUsers: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getUsers = createAsyncThunk('user/getUsers', async (data = {}, { getState }) => {
  const {
    user: {
      getUsers: { offset, page },
    },
  } = getState();
  return axios.get(`${window.location.origin + '/api'}/users/`, { params: { offset, page, ...data } });
});

export const reducerGetUsers = {
  [getUsers.pending]: (state) => {
    state.getUsers.loading = true;
  },
  [getUsers.fulfilled]: (state, action) => {
    state.getUsers.loading = false;
    state.getUsers.data = action.payload.data.list;
    state.getUsers.pages = action.payload.data.pages;
    state.getUsers.page = parseInt(action.payload.data.page);
  },
  [getUsers.rejected]: (state, payload) => {
    state.getUsers.loading = false;
    state.getUsers.error = payload;
  },
};
