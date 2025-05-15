
import { User } from '../types';

export const users: User[] = [
  {
    id: 'user1',
    name: 'John Student',
    email: 'john.student@university.edu',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    faculty: 'Computer Science',
    campus: 'North Campus',
    course: 'Bachelor of Computer Science',
    status: 'active'
  },
  {
    id: 'user2',
    name: 'Sarah Lecturer',
    email: 'sarah.lecturer@university.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    faculty: 'Computer Science',
    campus: 'North Campus',
    department: 'Software Engineering',
    status: 'active'
  },
  {
    id: 'user3',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

export const lecturers: User[] = [
  {
    id: 'lecturer1',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@tut.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    faculty: 'Computer Science',
    campus: 'North Campus',
    department: 'Software Engineering',
    status: 'active'
  },
  {
    id: 'lecturer2',
    name: 'Prof. Michael Johnson',
    email: 'michael.johnson@tut.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    faculty: 'Engineering',
    campus: 'South Campus',
    department: 'Mechanical Engineering',
    status: 'active'
  },
  {
    id: 'lecturer3',
    name: 'Dr. Emily Brown',
    email: 'emily.brown@tut.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    faculty: 'Business',
    campus: 'West Campus',
    department: 'Marketing',
    status: 'active'
  }
];
