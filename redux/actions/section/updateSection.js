import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateSection = {
  updateSection: { data: null, loading: false, error: null },
};

export const updateSection = createAsyncThunk('section/updateSection', async (data) => {
  return axios.patch(`${window.location.origin + '/api'}/section`, data);
});

export const reducerUpdateSection = {
  [updateSection.pending]: (state) => {
    state.updateSection.loading = true;
  },
  [updateSection.fulfilled]: (state, action) => {
    state.updateSection.loading = false;
    state.updateSection.data = action.payload.data;
  },
  [updateSection.rejected]: (state) => {
    state.updateSection.loading = false;
  },
};
