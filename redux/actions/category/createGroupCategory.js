import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateCreateGroupCategory = {
  createGroupCategory: { data: null, loading: false, error: null },
};

export const createGroupCategory = createAsyncThunk('category/createGroupCategory', async (data, { getState }) => {
  const {
    app: { activeFirm },
  } = getState();
  return axios.post(`${window.location.origin + '/api'}/category-group`, data, {
    headers: {
      firm: activeFirm?.value,
    },
  });
});

export const reducerCreateGroupCategory = {
  [createGroupCategory.pending]: (state) => {
    state.createGroupCategory.loading = true;
  },
  [createGroupCategory.fulfilled]: (state, action) => {
    state.createGroupCategory.loading = false;
    state.createGroupCategory.data = action.payload.data;
  },
  [createGroupCategory.rejected]: (state) => {
    state.createGroupCategory.loading = false;
  },
};
