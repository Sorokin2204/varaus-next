import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateSection, reducerCreateSection } from '../actions/section/createSection';
import { initStateDeleteSection, reducerDeleteSection } from '../actions/section/deleteSection';
import { initStateDeleteSections, reducerDeleteSections } from '../actions/section/deleteSections';
import { initStateGetSection, reducerGetSection } from '../actions/section/getSection';
import { initStateGetSections, reducerGetSections } from '../actions/section/getSections';
import { initStateUpdateSection, reducerUpdateSection } from '../actions/section/updateSection';

export const initialState = {
  ...initStateGetSections,
  ...initStateCreateSection,
  ...initStateUpdateSection,
  ...initStateDeleteSection,
  ...initStateDeleteSections,
  ...initStateGetSection,
  editSection: false,
};

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setEditSection: (state, action) => {
      state.editSection = action.payload;
    },
  },
  extraReducers: {
    ...reducerGetSections,
    ...reducerCreateSection,
    ...reducerUpdateSection,
    ...reducerDeleteSection,
    ...reducerDeleteSections,
    ...reducerGetSection,
  },
});
export const { setEditSection } = sectionSlice.actions;
export const sectionReducer = sectionSlice.reducer;
