import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateRole, reducerCreateRole } from '../actions/role/createRole';
import { initStateDeleteRole, reducerDeleteRole } from '../actions/role/deleteRole';
import { initStateDeleteRoles, reducerDeleteRoles } from '../actions/role/deleteRoles';
import { initStateGetRoles, reducerGetRoles } from '../actions/role/getRoles';
import { initStateUpdateRole, reducerUpdateRole } from '../actions/role/updateRole';

export const initialState = {
  ...initStateGetRoles,
  ...initStateCreateRole,
  ...initStateUpdateRole,
  ...initStateDeleteRole,
  ...initStateDeleteRoles,
  editRole: false,
};

export const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setEditRole: (state, action) => {
      state.editRole = action.payload;
    },
  },
  extraReducers: {
    ...reducerGetRoles,
    ...reducerCreateRole,
    ...reducerUpdateRole,
    ...reducerDeleteRole,
    ...reducerDeleteRoles,
  },
});
export const { setEditRole } = roleSlice.actions;
export const roleReducer = roleSlice.reducer;
