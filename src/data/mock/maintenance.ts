
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
    priority: 'high',
    assignedTo: '',
    assignedDate: ''
  },
  {
    id: 'maint2',
    title: 'AC not cooling',
    description: 'The air conditioning in CS Lab 101 is not cooling properly.',
    location: 'CS Lab 101, Computer Science Building',
    reporterId: 'user2',
    dateReported: '2025-04-26',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'tech3',
    assignedDate: '2025-04-27'
  },
  {
    id: 'maint3',
    title: 'Broken chair',
    description: 'There is a broken chair in Study Room 201.',
    location: 'Study Room 201, Library',
    reporterId: 'user1',
    dateReported: '2025-04-27',
    status: 'resolved',
    priority: 'low',
    assignedTo: 'tech2',
    assignedDate: '2025-04-28'
  },
  {
    id: 'maint4',
    title: 'Wi-Fi connectivity issues',
    description: 'Students cannot connect to campus Wi-Fi in the student center.',
    location: 'Student Center, Main Campus',
    reporterId: 'user3',
    dateReported: '2025-04-24',
    status: 'pending',
    priority: 'high'
  },
  {
    id: 'maint5',
    title: 'Flickering lights',
    description: 'The lights in Room 302 are flickering continuously.',
    location: 'Room 302, Sciences Building',
    reporterId: 'user4',
    dateReported: '2025-04-23',
    status: 'in-progress',
    priority: 'medium',
    assignedTo: 'tech1',
    assignedDate: '2025-04-25'
  }
];
