import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetGroupCategory = {
  getGroupCategory: { offset: 4, page: 1, pages: 0, data: null, loading: false, error: null },
};

export const getGroupCategory = createAsyncThunk('category/getGroupCategory', async (data, { getState }) => {
  return axios.get(`${window.location.origin + '/api'}/category-group/`, {
    params: {
      catId: data,
    },
  });
});

export const reducerGetGroupCategory = {
  [getGroupCategory.pending]: (state) => {
    state.getGroupCategory.loading = true;
  },
  [getGroupCategory.fulfilled]: (state, action) => {
    state.getGroupCategory.loading = false;

    state.getGroupCategory.data = action.payload.data;
  },
  [getGroupCategory.rejected]: (state, action) => {
    console.log(action.payload);
    state.getGroupCategory.error = action.payload;
    state.getGroupCategory.loading = false;
  },
};
