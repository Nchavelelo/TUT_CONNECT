
import { Booking } from '../types';

export const bookings: Booking[] = [
  {
    id: 'booking1',
    roomId: 'room1',
    userId: 'user1',
    date: '2025-04-28',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Study Session',
    status: 'confirmed',
    day: 'monday'
  },
  {
    id: 'booking2',
    roomId: 'room2',
    userId: 'user2',
    date: '2025-04-29',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Lecture',
    status: 'confirmed',
    day: 'tuesday'
  },
  {
    id: 'booking3',
    roomId: 'room3',
    userId: 'user1',
    date: '2025-04-30',
    startTime: '09:00',
    endTime: '10:30',
    purpose: 'Group Project',
    status: 'pending',
    day: 'wednesday'
  }
];
