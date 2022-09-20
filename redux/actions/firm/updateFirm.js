import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateFirm = {
  updateFirm: { data: null, loading: false, error: null },
};

export const updateFirm = createAsyncThunk('firm/updateFirm', async (data) => {
  return axios.patch(`${window.location.origin + '/api'}/firm`, data);
});

export const reducerUpdateFirm = {
  [updateFirm.pending]: (state) => {
    state.updateFirm.loading = true;
  },
  [updateFirm.fulfilled]: (state, action) => {
    state.updateFirm.loading = false;
    state.updateFirm.data = action.payload.data;
  },
  [updateFirm.rejected]: (state) => {
    state.updateFirm.loading = false;
  },
};
