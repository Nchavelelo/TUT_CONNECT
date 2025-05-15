
import { Room } from '../types';

export const rooms: Room[] = [
  {
    id: 'room1',
    name: 'CS Lab 101',
    capacity: 30,
    building: 'Computer Science Building',
    floor: 1,
    type: 'lab',
    features: ['Computers', 'Projector', 'Whiteboard'],
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    campus: 'North Campus',
    faculty: 'Computer Science'
  },
  {
    id: 'room2',
    name: 'Lecture Hall A',
    capacity: 100,
    building: 'Main Building',
    floor: 2,
    type: 'classroom',
    features: ['Projector', 'Sound System', 'Whiteboard'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    campus: 'South Campus',
    faculty: 'General'
  },
  {
    id: 'room3',
    name: 'Study Room 201',
    capacity: 8,
    building: 'Library',
    floor: 2,
    type: 'study',
    features: ['Whiteboard', 'Power Outlets', 'Wi-Fi'],
    image: 'https://images.unsplash.com/photo-1433086966358-54859d0ed716?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    campus: 'North Campus',
    faculty: 'Library'
  },
  {
    id: 'room4',
    name: 'Conference Room B',
    capacity: 12,
    building: 'Administration Building',
    floor: 3,
    type: 'meeting',
    features: ['Video Conferencing', 'Projector', 'Whiteboard'],
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
    campus: 'South Campus',
    faculty: 'Administration'
  }
];
