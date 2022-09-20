import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateUser, reducerCreateUser } from '../actions/user/createUser';
import { initStateDeleteUser, reducerDeleteUser } from '../actions/user/deleteUser';
import { initStateDeleteUsers, reducerDeleteUsers } from '../actions/user/deleteUsers';
import { initStateGetUser, reducerGetUser } from '../actions/user/getUser';
import { initStateGetUsers, reducerGetUsers, reducerLocalGetUsers } from '../actions/user/getUsers';
import { initStateUpdateUser, reducerUpdateUser } from '../actions/user/updateUser';

export const initialState = {
  ...initStateGetUsers,
  ...initStateCreateUser,
  ...initStateUpdateUser,
  ...initStateDeleteUser,
  ...initStateDeleteUsers,
  ...initStateGetUser,
  editUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetUser: (state, action) => {
      state.createUser.data = null;
      state.updateUser.data = null;
    },
    setEditUser: (state, action) => {
      state.editUser = action.payload;
    },
  },
  extraReducers: {
    ...reducerGetUsers,
    ...reducerCreateUser,
    ...reducerUpdateUser,
    ...reducerDeleteUser,
    ...reducerDeleteUsers,
    ...reducerGetUser,
  },
});
export const { setEditUser, setPage, resetUser } = userSlice.actions;
export const userReducer = userSlice.reducer;
