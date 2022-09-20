import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetSection = {
  getSection: { data: null, loading: false, error: null },
};

export const getSection = createAsyncThunk('user/getSection', async (sectionId) => {
  return axios.get(`${window.location.origin + '/api'}/section`, { params: { sectionId: sectionId } });
});

export const reducerGetSection = {
  [getSection.pending]: (state) => {
    state.getSection.loading = true;
  },
  [getSection.fulfilled]: (state, action) => {
    state.getSection.loading = false;
    state.getSection.data = action.payload.data;
  },
  [getSection.rejected]: (state) => {
    state.getSection.loading = false;
  },
};
