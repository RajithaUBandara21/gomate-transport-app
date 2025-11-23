// screens/FavoritesScreen.js
import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import TransportCard from '../components/TransportCard';
import { toggleFavorite } from '../redux/slices/transportSlice';
import { useTheme } from '../utils/ThemeContext';

const FavoritesScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const { favorites } = useSelector((state) => state.transport);

  const handleToggleFavorite = (route) => {
    dispatch(toggleFavorite(route));
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Feather name="heart" size={64} color={colors.subtext} />
      <Text style={[styles.emptyTitle, { color: colors.text }]}>No Favorites Yet</Text>
      <Text style={[styles.emptyText, { color: colors.subtext }]}>
        Start adding routes to your favorites to see them here
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>My Favorites</Text>
        <Text style={[styles.count, { color: colors.subtext }]}>
          {favorites.length} {favorites.length === 1 ? 'route' : 'routes'}
        </Text>
      </View>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransportCard
            route={item}
            onPress={() => navigation.navigate('Details', { route: item })}
            isFavorite={true}
            onToggleFavorite={() => handleToggleFavorite(item)}
          />
        )}
        ListEmptyComponent={renderEmpty}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={favorites.length === 0 ? styles.emptyList : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  count: {
    fontSize: 14,
  },
  emptyList: {
    flexGrow: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FavoritesScreen;