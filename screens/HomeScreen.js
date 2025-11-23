// screens/HomeScreen.js
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import TransportCard from '../components/TransportCard';
import { fetchRoutes, loadFavorites, toggleFavorite } from '../redux/slices/transportSlice';
import { logoutUser } from '../redux/slices/authSlice';
import { useTheme } from '../utils/ThemeContext';

const HomeScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors, toggleTheme, isDarkMode } = useTheme();
  const { user } = useSelector((state) => state.auth);
  const { routes, favorites, loading } = useSelector((state) => state.transport);

  useEffect(() => {
    dispatch(fetchRoutes());
    dispatch(loadFavorites());
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
    // navigation.replace('Login'); <--- REMOVED to prevent errors
  };

  const isFavorite = (routeId) => {
    return favorites.some((fav) => fav.id === routeId);
  };

  const handleToggleFavorite = (route) => {
    dispatch(toggleFavorite(route));
  };

  const renderHeader = () => (
    <View style={[styles.headerContainer, { backgroundColor: colors.background }]}>
      <View style={styles.headerTop}>
        <View style={{ flex: 1 }}>
          <Text
            style={[styles.greeting, { color: colors.subtext }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling
          >
            Welcome back,
          </Text>
          <Text
            style={[styles.username, { color: colors.text }]}
            numberOfLines={1}
            adjustsFontSizeToFit
            minimumFontScale={0.7}
            allowFontScaling
          >
            {user?.username || 'Traveler'}
          </Text>
        </View>
        <View style={styles.headerActions}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.iconButton, { backgroundColor: colors.card }]}
          >
            <Feather name={isDarkMode ? 'sun' : 'moon'} size={20} color={colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLogout}
            style={[styles.iconButton, { backgroundColor: colors.card }]}
          >
            <Feather name="log-out" size={20} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Available Routes</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        ListHeaderComponent={renderHeader}
        data={routes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransportCard
            route={item}
            onPress={() => navigation.navigate('Details', { route: item })}
            isFavorite={isFavorite(item.id)}
            onToggleFavorite={() => handleToggleFavorite(item)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    padding: 16,
    paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 14,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
    flexShrink: 1,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default HomeScreen;