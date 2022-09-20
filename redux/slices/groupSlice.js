import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateGroup, reducerCreateGroup } from '../actions/group/createGroup';
import { initStateDeleteGroup, reducerDeleteGroup } from '../actions/group/deleteGroup';
import { initStateDeleteGroups, reducerDeleteGroups } from '../actions/group/deleteGroups';
import { initStateGetGroup, reducerGetGroup } from '../actions/group/getGroup';
import { initStateGetGroups, reducerGetGroups } from '../actions/group/getGroups';
import { initStateUpdateGroup, reducerUpdateGroup } from '../actions/group/updateGroup';

export const initialState = {
  ...initStateGetGroups,
  ...initStateCreateGroup,
  ...initStateUpdateGroup,
  ...initStateDeleteGroup,
  ...initStateDeleteGroups,
  ...initStateGetGroup,
  editGroup: false,
};

export const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    setEditGroup: (state, action) => {
      state.editGroup = action.payload;
    },
    resetGetGroup: (state, action) => {
      state.getGroup.data = null;
    },
  },
  extraReducers: {
    ...reducerGetGroups,
    ...reducerCreateGroup,
    ...reducerUpdateGroup,
    ...reducerDeleteGroup,
    ...reducerDeleteGroups,
    ...reducerGetGroup,
  },
});
export const { setEditGroup, resetGetGroup } = groupSlice.actions;
export const groupReducer = groupSlice.reducer;
