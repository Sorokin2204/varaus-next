import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateRoom, reducerCreateRoom } from '../actions/room/createRoom';
import { initStateDeleteRoom, reducerDeleteRoom } from '../actions/room/deleteRoom';
import { initStateDeleteRooms, reducerDeleteRooms } from '../actions/room/deleteRooms';
import { initStateGetRoom, reducerGetRoom } from '../actions/room/getRoom';

import { initStateGetRooms, reducerGetRooms } from '../actions/room/getRooms';
import { initStateUpdateRoom, reducerUpdateRoom } from '../actions/room/updateRoom';

export const initialState = {
  ...initStateGetRooms,
  ...initStateGetRoom,
  ...initStateCreateRoom,
  ...initStateUpdateRoom,
  ...initStateDeleteRoom,
  ...initStateDeleteRooms,
};

export const roomSlice = createSlice({
  name: 'room',
  initialState,
  reducers: {
    resetCreateRoom: (state, action) => {
      state.createRoom.data = null;
    },
    resetGetRoom: (state, action) => {
      state.getRoom.data = null;
    },
    resetUpdateRoom: (state, action) => {
      state.updateRoom.data = null;
    },
    setEditRoom: (state, action) => {
      state.editRoom = action.payload;
    },
  },
  extraReducers: {
    ...reducerGetRooms,
    ...reducerGetRoom,
    ...reducerCreateRoom,
    ...reducerUpdateRoom,
    ...reducerDeleteRoom,
    ...reducerDeleteRooms,
  },
});
export const { setEditRoom, resetCreateRoom, resetGetRoom, resetUpdateRoom } = roomSlice.actions;
export const roomReducer = roomSlice.reducer;
