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
    day: 'monday',
    userRole: 'student'
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
    day: 'tuesday',
    userRole: 'lecturer'
  },
  {
    id: 'booking3',
    roomId: 'room3',
    userId: 'user1',
    date: '2025-04-30',
    startTime: '09:00',
    endTime: '10:30',
    purpose: 'Group Project',
    status: 'pendingApproval',
    day: 'wednesday',
    userRole: 'student'
  },
  {
    id: 'booking4',
    roomId: 'room1',
    userId: 'lecturer1',
    date: '2025-04-28',
    startTime: '13:00',
    endTime: '15:00',
    purpose: 'Department Meeting',
    status: 'pendingApproval',
    day: 'monday',
    userRole: 'lecturer'
  },
  {
    id: 'booking5',
    roomId: 'room1',
    userId: 'user3',
    date: '2025-04-28',
    startTime: '13:00',
    endTime: '15:00',
    purpose: 'Study Group',
    status: 'pendingApproval',
    day: 'monday',
    userRole: 'student'
  }
];