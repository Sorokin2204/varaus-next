import { createSlice } from '@reduxjs/toolkit';

import { initStateGetLocales, reducerGetLocales } from '../actions/locale/getLocales';

export const initialState = {
  ...initStateGetLocales,

  activeLocale: null,
};

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setActiveLocale: (state, action) => {
      state.activeLocale = action.payload;
    },
  },
  extraReducers: {
    ...reducerGetLocales,
  },
});
export const { setEditLocale, setActiveLocale } = localeSlice.actions;
export const localeReducer = localeSlice.reducer;
