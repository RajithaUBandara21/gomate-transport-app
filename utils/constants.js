
export const API_URL = 'https://692321e909df4a49232469c2.mockapi.io';

export const TRANSPORT_TYPES = {
  BUS: 'Bus',
  TRAIN: 'Train',
  METRO: 'Metro',
  FERRY: 'Ferry',
};

export const MOCK_TRANSPORT_DATA = [
  {
    id: 1,
    route: 'Route 101',
    type: 'Bus',
    from: 'Central Station',
    to: 'Airport Terminal',
    duration: '45 mins',
    price: '$5.50',
    frequency: 'Every 15 mins',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
    description: 'Express bus service connecting city center to airport with comfortable seating.',
    operator: 'City Transit',
    schedule: ['6:00 AM', '6:15 AM', '6:30 AM', '6:45 AM'],
  },
  {
    id: 2,
    route: 'Blue Line',
    type: 'Metro',
    from: 'Downtown',
    to: 'Suburbs East',
    duration: '32 mins',
    price: '$3.00',
    frequency: 'Every 8 mins',
    status: 'Active',
    image: 'https://images.unsplash.com/photo-1581262177000-8c89f0f95b63?w=400',
    description: 'Modern metro line with air-conditioned coaches and WiFi connectivity.',
    operator: 'Metro Services',
    schedule: ['5:30 AM', '5:38 AM', '5:46 AM', '5:54 AM'],
  },

];