import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteSection = {
  deleteSection: { data: null, loading: false, error: null },
};

export const deleteSection = createAsyncThunk('section/deleteSection', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/section`, data);
});

export const reducerDeleteSection = {
  [deleteSection.pending]: (state) => {
    state.deleteSection.loading = true;
  },
  [deleteSection.fulfilled]: (state, action) => {
    state.deleteSection.loading = false;
    state.deleteSection.data = action.payload.data;
  },
  [deleteSection.rejected]: (state) => {
    state.deleteSection.loading = false;
  },
};
