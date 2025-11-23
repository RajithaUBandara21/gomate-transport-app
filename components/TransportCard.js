// components/TransportCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../utils/ThemeContext';

const TransportCard = ({ route, onPress, isFavorite, onToggleFavorite }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: colors.card }]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Image source={{ uri: route.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={[styles.route, { color: colors.text }]}>{route.route}</Text>
         <TouchableOpacity onPress={onToggleFavorite}>
  {isFavorite ? (
    <Feather name="heart" size={22} color="#E74C3C" />
  ) : (
    <Feather name="heart" size={22} color={colors.subtext} />
  )}
</TouchableOpacity>
        </View>
        <View style={styles.typeContainer}>
          <Feather name="navigation" size={14} color={colors.primary} />
          <Text style={[styles.type, { color: colors.primary }]}>{route.type}</Text>
        </View>
        <View style={styles.locationContainer}>
          <Feather name="map-pin" size={14} color={colors.subtext} />
          <Text style={[styles.location, { color: colors.subtext }]}>
            {route.from} → {route.to}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Feather name="clock" size={14} color={colors.subtext} />
            <Text style={[styles.infoText, { color: colors.subtext }]}>
              {route.duration}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Feather name="dollar-sign" size={14} color={colors.subtext} />
            <Text style={[styles.infoText, { color: colors.subtext }]}>
              {route.price}
            </Text>
          </View>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.statusText, { color: colors.primary }]}>
            {route.status}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  route: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  type: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 6,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  location: {
    fontSize: 14,
    marginLeft: 6,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  infoText: {
    fontSize: 13,
    marginLeft: 4,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default TransportCard;