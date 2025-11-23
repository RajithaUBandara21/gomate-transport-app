// redux/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../utils/constants';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.loading = false;
      state.error = null;
    },
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginSuccess, logout, authStart, authFailure } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
  dispatch(authStart());
  try {
    // Use API_URL constant. Note: MockAPI filtering uses query params
    const response = await fetch(
      `${API_URL}/users?email=${credentials.email}&password=${credentials.password}`
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const users = await response.json();

    if (users.length > 0) {
      const user = users[0];
      await AsyncStorage.setItem('user', JSON.stringify(user));
      dispatch(loginSuccess(user));
      return { success: true };
    } else {
      dispatch(authFailure('Invalid email or password'));
      return { success: false, error: 'Invalid email or password' };
    }
  } catch (error) {
    dispatch(authFailure(error.message));
    return { success: false, error: error.message };
  }
};

export const registerUser = (userData) => async (dispatch) => {
  dispatch(authStart());
  try {
    // 1. Check if user already exists
    const checkRes = await fetch(`${API_URL}/users?email=${userData.email}`);
    const existingUsers = await checkRes.json();

    if (existingUsers.length > 0) {
      const msg = 'Email already registered';
      dispatch(authFailure(msg));
      return { success: false, error: msg };
    }

    // 2. Create new user
    constPkresponse = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error('Registration failed');
    }

    const newUser = await response.json();

    // Automatically log in after registration
    await AsyncStorage.setItem('user', JSON.stringify(newUser));
    dispatch(loginSuccess(newUser));
    return { success: true };
  } catch (error) {
    dispatch(authFailure(error.message));
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