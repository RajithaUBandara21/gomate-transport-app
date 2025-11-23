// redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import transportReducer from './slices/transportSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transport: transportReducer,
  },
});