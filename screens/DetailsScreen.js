// screens/DetailsScreen.js
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { toggleFavorite } from '../redux/slices/transportSlice';
import { useTheme } from '../utils/ThemeContext';

const DetailsScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const dispatch = useDispatch();
  const transportRoute = route.params.route;
  const { favorites } = useSelector((state) => state.transport);

  const isFavorite = favorites.some((fav) => fav.id === transportRoute.id);

  const handleToggleFavorite = () => {
    dispatch(toggleFavorite(transportRoute));
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: transportRoute.image }} style={styles.image} />

        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={[styles.route, { color: colors.text }]}>
                {transportRoute.route}
              </Text>
              <View style={styles.typeContainer}>
                <Feather name="navigation" size={16} color={colors.primary} />
                <Text style={[styles.type, { color: colors.primary }]}>
                  {transportRoute.type}
                </Text>
              </View>
            </View>
         <TouchableOpacity
              onPress={handleToggleFavorite}
              style={[styles.favoriteButton, { backgroundColor: colors.card }]}
            >
              <Feather
                name="heart"
                size={24}
                color={isFavorite ? '#E74C3C' : colors.subtext}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <View style={styles.locationRow}>
              <View style={styles.locationItem}>
                <Feather name="circle" size={12} color={colors.primary} />
                <Text style={[styles.locationLabel, { color: colors.subtext }]}>From</Text>
                <Text style={[styles.locationText, { color: colors.text }]}>
                  {transportRoute.from}
                </Text>
              </View>
              <Feather name="arrow-right" size={20} color={colors.subtext} />
              <View style={styles.locationItem}>
                <Feather name="map-pin" size={12} color="#E74C3C" />
                <Text style={[styles.locationLabel, { color: colors.subtext }]}>To</Text>
                <Text style={[styles.locationText, { color: colors.text }]}>
                  {transportRoute.to}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Route Information
            </Text>
            <View style={styles.infoGrid}>
              <View style={styles.infoCard}>
                <Feather name="clock" size={24} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.subtext }]}>Duration</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {transportRoute.duration}
                </Text>
              </View>
              <View style={styles.infoCard}>
                <Feather name="dollar-sign" size={24} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.subtext }]}>Price</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {transportRoute.price}
                </Text>
              </View>
              <View style={styles.infoCard}>
                <Feather name="repeat" size={24} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.subtext }]}>Frequency</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {transportRoute.frequency}
                </Text>
              </View>
              <View style={styles.infoCard}>
                <Feather name="activity" size={24} color={colors.primary} />
                <Text style={[styles.infoLabel, { color: colors.subtext }]}>Status</Text>
                <Text style={[styles.infoValue, { color: colors.text }]}>
                  {transportRoute.status}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>Description</Text>
            <Text style={[styles.description, { color: colors.subtext }]}>
              {transportRoute.description}
            </Text>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <View style={styles.operatorRow}>
              <Feather name="briefcase" size={20} color={colors.primary} />
              <View style={styles.operatorInfo}>
                <Text style={[styles.operatorLabel, { color: colors.subtext }]}>
                  Operated by
                </Text>
                <Text style={[styles.operatorName, { color: colors.text }]}>
                  {transportRoute.operator}
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.section, { backgroundColor: colors.card }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              Schedule (Sample Times)
            </Text>
            <View style={styles.scheduleContainer}>
              {transportRoute.schedule.map((time, index) => (
                <View
                  key={index}
                  style={[styles.scheduleItem, { backgroundColor: colors.background }]}
                >
                  <Feather name="clock" size={16} color={colors.primary} />
                  <Text style={[styles.scheduleTime, { color: colors.text }]}>{time}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  headerLeft: {
    flex: 1,
  },
  route: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  typeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  type: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  locationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationItem: {
    flex: 1,
    alignItems: 'center',
  },
  locationLabel: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    marginTop: 8,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
  },
  operatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  operatorInfo: {
    marginLeft: 12,
  },
  operatorLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  operatorName: {
    fontSize: 16,
    fontWeight: '600',
  },
  scheduleContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    gap: 6,
  },
  scheduleTime: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default DetailsScreen;