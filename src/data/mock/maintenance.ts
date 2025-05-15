
import { MaintenanceRequest } from '../types';

export const maintenanceRequests: MaintenanceRequest[] = [
  {
    id: 'maint1',
    title: 'Projector not working',
    description: 'The projector in Lecture Hall A is not connecting to laptops.',
    location: 'Lecture Hall A, Main Building',
    reporterId: 'user1',
    dateReported: '2025-04-25',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'maint2',
    title: 'AC not cooling',
    description: 'The air conditioning in CS Lab 101 is not cooling properly.',
    location: 'CS Lab 101, Computer Science Building',
    reporterId: 'user2',
    dateReported: '2025-04-26',
    status: 'in-progress',
    priority: 'medium'
  },
  {
    id: 'maint3',
    title: 'Broken chair',
    description: 'There is a broken chair in Study Room 201.',
    location: 'Study Room 201, Library',
    reporterId: 'user1',
    dateReported: '2025-04-27',
    status: 'resolved',
    priority: 'low'
  }
];
