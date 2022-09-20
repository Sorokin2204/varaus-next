import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetSections = {
  getSections: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getSections = createAsyncThunk('role/getSections', async (data = {}, { getState, rejectWithValue }) => {
  try {
    const {
      section: {
        getSections: { offset, page },
      },
    } = getState();
    return axios.get(`${window.location.origin + '/api'}/sections/`, { params: { offset, page, ...data } });
  } catch (error) {
    console.log(error);
    return rejectWithValue(error);
  }
});

export const reducerGetSections = {
  [getSections.pending]: (state) => {
    state.getSections.loading = true;
  },
  [getSections.fulfilled]: (state, action) => {
    state.getSections.loading = false;

    state.getSections.data = action.payload.data.sections;
    state.getSections.pages = action.payload.data.pages;
    state.getSections.page = parseInt(action.payload.data.page);
  },
  [getSections.rejected]: (state, action) => {
    state.getSections.error = action.payload;
    state.getSections.loading = false;
  },
};
