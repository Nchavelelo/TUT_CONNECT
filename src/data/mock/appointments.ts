
import { AppointmentRequest } from '../types';

export const appointmentRequests: AppointmentRequest[] = [
  {
    id: 'appt1',
    studentId: 'user1',
    lecturerId: 'lecturer1',
    subject: 'Assignment Discussion',
    description: 'I need help understanding the requirements for the final project.',
    preferredDate: '2025-05-10',
    preferredTime: '14:00',
    status: 'pending',
    createdAt: '2025-04-28'
  },
  {
    id: 'appt2',
    studentId: 'user1',
    lecturerId: 'lecturer2',
    subject: 'Career Advice',
    description: 'I would like to discuss career opportunities in the field.',
    preferredDate: '2025-05-15',
    preferredTime: '10:00',
    status: 'approved',
    createdAt: '2025-04-27'
  }
];
