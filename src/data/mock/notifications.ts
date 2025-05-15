
import { Notification } from '../types';

export const notifications: Notification[] = [
  {
    id: 'notif1',
    title: 'Booking Confirmed',
    message: 'Your booking for CS Lab 101 on April 28th has been confirmed.',
    date: '2025-04-27',
    read: false,
    category: 'booking'
  },
  {
    id: 'notif2',
    title: 'Maintenance Update',
    message: 'Your maintenance request for the projector has been received and is being processed.',
    date: '2025-04-26',
    read: true,
    category: 'maintenance'
  },
  {
    id: 'notif3',
    title: 'Class Cancelled',
    message: 'The Web Development class scheduled for April 29th has been cancelled.',
    date: '2025-04-25',
    read: false,
    category: 'academic'
  },
  {
    id: 'notif4',
    title: 'System Maintenance',
    message: 'The campus portal will be undergoing maintenance on April 30th from 2-4 AM.',
    date: '2025-04-24',
    read: true,
    category: 'general'
  }
];
