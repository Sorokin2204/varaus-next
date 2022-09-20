import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateSection = {
  createSection: { data: null, loading: false, error: null },
};

export const createSection = createAsyncThunk('section/createSection', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/section`, data);
});

export const reducerCreateSection = {
  [createSection.pending]: (state) => {
    state.createSection.loading = true;
  },
  [createSection.fulfilled]: (state, action) => {
    state.createSection.loading = false;
    state.createSection.data = action.payload.data;
  },
  [createSection.rejected]: (state) => {
    state.createSection.loading = false;
  },
};
