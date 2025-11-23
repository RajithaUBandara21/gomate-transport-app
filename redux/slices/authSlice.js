// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  try {
    await AsyncStorage.setItem('user', JSON.stringify(credentials));
    dispatch(loginSuccess(credentials));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    await AsyncStorage.removeItem('user');
    dispatch(logout());
  } catch (error) {
    console.error('Logout error:', error);
  }
};

export const checkAuth = () => async (dispatch) => {
  try {
    const userData = await AsyncStorage.getItem('user');
    if (userData) {
      dispatch(loginSuccess(JSON.parse(userData)));
    }
  } catch (error) {
    console.error('Check auth error:', error);
  }
};

export default authSlice.reducer;