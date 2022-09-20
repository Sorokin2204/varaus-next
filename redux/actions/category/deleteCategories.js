import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteCategories = {
  deleteCategories: { data: null, loading: false, error: null },
};

export const deleteCategories = createAsyncThunk('category/deleteCategories', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/categories`, data);
});

export const reducerDeleteCategories = {
  [deleteCategories.pending]: (state) => {
    state.deleteCategories.loading = true;
  },
  [deleteCategories.fulfilled]: (state, action) => {
    state.deleteCategories.loading = false;
    state.deleteCategories.data = action.payload.data;
  },
  [deleteCategories.rejected]: (state) => {
    state.deleteCategories.loading = false;
  },
};
