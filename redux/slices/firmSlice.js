import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateFirm, reducerCreateFirm } from '../actions/firm/createFirm';
import { initStateDeleteFirm, reducerDeleteFirm } from '../actions/firm/deleteFirm';
import { initStateDeleteFirms, reducerDeleteFirms } from '../actions/firm/deleteFirms';

import { initStateGetFirms, reducerGetFirms } from '../actions/firm/getFirms';
import { initStateUpdateFirm, reducerUpdateFirm } from '../actions/firm/updateFirm';

export const initialState = {
  ...initStateGetFirms,
  ...initStateCreateFirm,
  ...initStateUpdateFirm,
  ...initStateDeleteFirm,
  ...initStateDeleteFirms,
};

export const firmSlice = createSlice({
  name: 'firm',
  initialState,
  reducers: {
    resetFirm: (state, action) => {
      state.createFirm.data = null;
    },
    setEditFirm: (state, action) => {
      state.editFirm = action.payload;
    },
  },
  extraReducers: {
    ...reducerGetFirms,
    ...reducerCreateFirm,
    ...reducerUpdateFirm,
    ...reducerDeleteFirm,
    ...reducerDeleteFirms,
  },
});
export const { setEditFirm, resetFirm } = firmSlice.actions;
export const firmReducer = firmSlice.reducer;
