import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateDeleteCategory = {
  deleteCategory: { data: null, loading: false, error: null },
};

export const deleteCategory = createAsyncThunk('category/deleteCategory', async (data) => {
  return axios.post(`${window.location.origin + '/api'}/category`, data);
});

export const reducerDeleteCategory = {
  [deleteCategory.pending]: (state) => {
    state.deleteCategory.loading = true;
  },
  [deleteCategory.fulfilled]: (state, action) => {
    state.deleteCategory.loading = false;
    state.deleteCategory.data = action.payload.data;
  },
  [deleteCategory.rejected]: (state) => {
    state.deleteCategory.loading = false;
  },
};
