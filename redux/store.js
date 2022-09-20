import { configureStore } from '@reduxjs/toolkit';
import { appReducer } from './slices/appSlice';
import { categoryReducer } from './slices/categorySlice';
import { firmReducer } from './slices/firmSlice';
import { groupReducer } from './slices/groupSlice';
import { localeReducer } from './slices/localeSlice';
import { roleReducer } from './slices/roleSlice';
import { roomReducer } from './slices/roomSlice';
import { sectionReducer } from './slices/sectionSlice';
import { userReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: { user: userReducer, app: appReducer, role: roleReducer, firm: firmReducer, category: categoryReducer, group: groupReducer, section: sectionReducer, locale: localeReducer, room: roomReducer },
});
