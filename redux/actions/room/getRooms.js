import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetRooms = {
  getRooms: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getRooms = createAsyncThunk('user/getRooms', async (data = {}, { getState }) => {
  const {
    user: {
      getUsers: { offset, page },
    },
  } = getState();
  return axios.get(`${window.location.origin + '/api'}/rooms/`, { params: { offset, page, ...data } });
});

export const reducerGetRooms = {
  [getRooms.pending]: (state) => {
    state.getRooms.loading = true;
  },
  [getRooms.fulfilled]: (state, action) => {
    state.getRooms.loading = false;

    state.getRooms.data = action.payload.data.list;
    state.getRooms.pages = action.payload.data.pages;
    state.getRooms.page = parseInt(action.payload.data.page);
  },
  [getRooms.rejected]: (state) => {
    state.getRooms.loading = false;
  },
};
