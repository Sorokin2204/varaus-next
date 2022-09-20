import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateGetGroup = {
  getGroup: { data: null, loading: false, error: null },
};

export const getGroup = createAsyncThunk('user/getGroup', async (groupId) => {
  return axios.get(`${window.location.origin + '/api'}/group`, { params: { groupId: groupId } });
});

export const reducerGetGroup = {
  [getGroup.pending]: (state) => {
    state.getGroup.loading = true;
  },
  [getGroup.fulfilled]: (state, action) => {
    state.getGroup.loading = false;
    state.getGroup.data = action.payload.data;
  },
  [getGroup.rejected]: (state) => {
    state.getGroup.loading = false;
  },
};
