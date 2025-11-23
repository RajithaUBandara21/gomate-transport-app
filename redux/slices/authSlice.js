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
    const userString = JSON.stringify(credentials);
    await AsyncStorage.setItem('user', userString);
    dispatch(loginSuccess(credentials));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const registerUser = (userData) => async (dispatch) => {
  try {
    // In a real app, you would send data to an API endpoint
    const userString = JSON.stringify(userData);
    await AsyncStorage.setItem('user', userString);
    dispatch(loginSuccess(userData)); // Automatically log in after registration
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
    if (userData !== null) {
      const parsedData = JSON.parse(userData);
      dispatch(loginSuccess(parsedData));
    }
  } catch (error) {
    console.error('Check auth error:', error);
  }
};

export default authSlice.reducer;