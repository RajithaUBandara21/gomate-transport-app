// redux/slices/transportSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_TRANSPORT_DATA } from '../../utils/constants';

const initialState = {
  routes: [],
  favorites: [],
  loading: false,
  error: null,
};

const transportSlice = createSlice({
  name: 'transport',
  initialState,
  reducers: {
    setRoutes: (state, action) => {
      state.routes = action.payload;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter(
        (fav) => fav.id !== action.payload
      );
    },
  },
});

export const {
  setRoutes,
  setLoading,
  setError,
  setFavorites,
  addFavorite,
  removeFavorite,
} = transportSlice.actions;

export const fetchRoutes = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    dispatch(setRoutes(MOCK_TRANSPORT_DATA));
  } catch (error) {
    dispatch(setError(error.message));
  }
};

export const loadFavorites = () => async (dispatch) => {
  try {
    const favorites = await AsyncStorage.getItem('favorites');
    if (favorites) {
      dispatch(setFavorites(JSON.parse(favorites)));
    }
  } catch (error) {
    console.error('Load favorites error:', error);
  }
};

export const toggleFavorite = (route) => async (dispatch, getState) => {
  try {
    const { favorites } = getState().transport;
    const isFavorite = favorites.some((fav) => fav.id === route.id);

    if (isFavorite) {
      dispatch(removeFavorite(route.id));
      const updatedFavorites = favorites.filter((fav) => fav.id !== route.id);
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      dispatch(addFavorite(route));
      const updatedFavorites = [...favorites, route];
      await AsyncStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Toggle favorite error:', error);
  }
};

export default transportSlice.reducer;