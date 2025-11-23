// redux/slices/transportSlice.js
import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MOCK_TRANSPORT_DATA, API_URL } from '../../utils/constants';

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
      state.error = null;
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
    // Use constant API_URL
    const response = await fetch(`${API_URL}/routes`);
    
    if (!response.ok) {
        throw new Error("Failed to fetch routes");
    }
    
    const data = await response.json();

    dispatch(setRoutes(data));
    await AsyncStorage.setItem('routes', JSON.stringify(data));

  } catch (error) { 
    console.error('API fetch failed, using mock data:', error);
    // Fallback to mock data if API fails or endpoint is empty
    dispatch(setRoutes(MOCK_TRANSPORT_DATA));
  }
};

export const loadFavorites = () => async (dispatch) => {
  try {
    const favoritesString = await AsyncStorage.getItem('favorites');
    if (favoritesString !== null) {
      const parsedFavorites = JSON.parse(favoritesString);
      dispatch(setFavorites(parsedFavorites));
    }
  } catch (error) {
    console.error('Load favorites error:', error);
  }
};

export const toggleFavorite = (route) => async (dispatch, getState) => {
  try {
    const { favorites } = getState().transport;
    const isFavorite = favorites.some((fav) => fav.id === route.id);

    let updatedFavorites;

    if (isFavorite) {
      dispatch(removeFavorite(route.id));
      updatedFavorites = favorites.filter((fav) => fav.id !== route.id);
    } else {
      dispatch(addFavorite(route));
      updatedFavorites = [...favorites, route];
    }

    await AsyncStorage.setItem(
      'favorites',
      JSON.stringify(updatedFavorites)
    );

  } catch (error) {
    console.error('Toggle favorite error:', error);
  }
};

export default transportSlice.reducer;