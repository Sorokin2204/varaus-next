import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateGroup = {
  updateGroup: { data: null, loading: false, error: null },
};

export const updateGroup = createAsyncThunk('group/updateGroup', async (data) => {
  return axios.patch(`${window.location.origin + '/api'}/group`, data);
});

export const reducerUpdateGroup = {
  [updateGroup.pending]: (state) => {
    state.updateGroup.loading = true;
  },
  [updateGroup.fulfilled]: (state, action) => {
    state.updateGroup.loading = false;
    state.updateGroup.data = action.payload.data;
  },
  [updateGroup.rejected]: (state) => {
    state.updateGroup.loading = false;
  },
};
