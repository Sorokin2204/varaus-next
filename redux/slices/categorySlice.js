import { createSlice } from '@reduxjs/toolkit';
import { initStateCreateCategory, reducerCreateCategory } from '../actions/category/createCategory';
import { initStateDeleteCategory, reducerDeleteCategory } from '../actions/category/deleteCategory';
import { initStateDeleteCategories, reducerDeleteCategories } from '../actions/category/deleteCategories';
import { initStateGetCategories, reducerGetCategories } from '../actions/category/getCategories';
import { initStateUpdateCategory, reducerUpdateCategory } from '../actions/category/updateCategory';
import { initStateCreateGroupCategory, reducerCreateGroupCategory } from '../actions/category/createGroupCategory';
import { initStateGetGroupCategory, reducerGetGroupCategory } from '../actions/category/getGroupCategory';

export const initialState = {
  ...initStateGetCategories,
  ...initStateCreateCategory,
  ...initStateUpdateCategory,
  ...initStateDeleteCategory,
  ...initStateDeleteCategories,
  ...initStateCreateGroupCategory,
  ...initStateGetGroupCategory,
  editCategory: false,
  editCategoryFull: null,
};

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    resetCreateGroupCategory: (state, action) => {
      state.createGroupCategory.data = null;
    },
    setEditCategory: (state, action) => {
      state.editCategory = action.payload;
    },
    setEditCategoryFull: (state, action) => {
      state.editCategoryFull = action.payload;
    },
    resetCreateCategory: (state, action) => {
      state.createCategory.data = null;
    },
    resetUpdateCategory: (state, action) => {
      state.updateCategory.data = null;
    },
    resetGetGroupCategory: (state, action) => {
      state.getGroupCategory.data = null;
    },
  },
  extraReducers: {
    ...reducerGetCategories,
    ...reducerCreateCategory,
    ...reducerUpdateCategory,
    ...reducerDeleteCategory,
    ...reducerDeleteCategories,
    ...reducerCreateGroupCategory,
    ...reducerGetGroupCategory,
  },
});
export const { setEditCategory, setEditCategoryFull, resetCreateCategory, resetUpdateCategory, resetCreateGroupCategory, resetGetGroupCategory } = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
