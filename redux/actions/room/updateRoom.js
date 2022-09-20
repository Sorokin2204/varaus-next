import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initStateUpdateRoom = {
  updateRoom: { data: null, loading: false, error: null },
};

export const updateRoom = createAsyncThunk('room/updateRoom', async (data) => {
  return axios.patch(`${window.location.origin + '/api'}/room`, data);
});

export const reducerUpdateRoom = {
  [updateRoom.pending]: (state) => {
    state.updateRoom.loading = true;
  },
  [updateRoom.fulfilled]: (state, action) => {
    state.updateRoom.loading = false;
    state.updateRoom.data = action.payload.data;
  },
  [updateRoom.rejected]: (state) => {
    state.updateRoom.loading = false;
  },
};
