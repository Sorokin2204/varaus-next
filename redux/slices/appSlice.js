import { createSlice } from '@reduxjs/toolkit';

export const initialState = { modalUser: false, modalFirm: false, modalRole: false, modalCategory: false, modalCreateCategory: false, modalGroup: false, modalSection: false, modalCategorySubfield: false, modalCategoryData: null, activeFirm: null };

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setActiveFirm: (state, { payload }) => {
      state.activeFirm = payload;
    },
    setShowModalUser: (state, { payload }) => {
      state.modalUser = payload;
    },
    setShowModalGroup: (state, { payload }) => {
      state.modalGroup = payload;
    },
    setShowModalCategory: (state, { payload }) => {
      state.modalCategory = payload;
    },
    setShowCreateModalCategory: (state, { payload }) => {
      state.modalCreateCategory = payload;
    },
    setShowModalFirm: (state, { payload }) => {
      state.modalFirm = payload;
    },
    setShowModalRole: (state, { payload }) => {
      state.modalRole = payload;
    },
    setShowModalSection: (state, { payload }) => {
      state.modalSection = payload;
    },
    setShowModalCategorySubfield: (state, { payload }) => {
      state.modalCategorySubfield = payload;
    },
    setModalCategoryData: (state, { payload }) => {
      state.modalCategoryData = payload;
    },
  },
});
export const { setShowModalUser, setShowModalFirm, setShowModalRole, setShowModalCategory, setShowCreateModalCategory, setShowModalGroup, setShowModalSection, setShowModalCategorySubfield, setModalCategoryData, setActiveFirm } = appSlice.actions;
export const appReducer = appSlice.reducer;
