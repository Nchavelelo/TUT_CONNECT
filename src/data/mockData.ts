export type UserRole = 'student' | 'lecturer' | 'admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  building: string;
  floor: number;
  type: 'classroom' | 'lab' | 'meeting' | 'study';
  features: string[];
  image?: string;
  campus: string;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'confirmed' | 'cancelled';
}

export interface Class {
  id: string;
  name: string;
  code: string;
  instructor: string;
  roomId: string;
  day: string;
  startTime: string;
  endTime: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  reporterId: string;
  dateReported: string;
  status: 'pending' | 'in-progress' | 'resolved';
  priority: 'low' | 'medium' | 'high';
  imageUrl?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  category: 'general' | 'booking' | 'maintenance' | 'academic';
}

export interface AppointmentRequest {
  id: string;
  studentId: string;
  lecturerId: string;
  subject: string;
  description: string;
  preferredDate: string;
  preferredTime: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export const users: User[] = [
  {
    id: 'user1',
    name: 'John Student',
    email: 'john.student@university.edu',
    role: 'student',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg'
  },
  {
    id: 'user2',
    name: 'Sarah Lecturer',
    email: 'sarah.lecturer@university.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/women/2.jpg'
  },
  {
    id: 'user3',
    name: 'Admin User',
    email: 'admin@university.edu',
    role: 'admin',
    avatar: 'https://randomuser.me/api/portraits/men/3.jpg'
  }
];

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
    campus: 'North Campus'
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
    campus: 'South Campus'
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
    campus: 'North Campus'
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
    campus: 'South Campus'
  }
];

export const bookings: Booking[] = [
  {
    id: 'booking1',
    roomId: 'room1',
    userId: 'user1',
    date: '2025-04-28',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Study Session',
    status: 'confirmed'
  },
  {
    id: 'booking2',
    roomId: 'room2',
    userId: 'user2',
    date: '2025-04-29',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Lecture',
    status: 'confirmed'
  },
  {
    id: 'booking3',
    roomId: 'room3',
    userId: 'user1',
    date: '2025-04-30',
    startTime: '09:00',
    endTime: '10:30',
    purpose: 'Group Project',
    status: 'pending'
  }
];

export const classes: Class[] = [
  {
    id: 'class1',
    name: 'Introduction to Computer Science',
    code: 'CS101',
    instructor: 'Dr. Smith',
    roomId: 'room1',
    day: 'Monday',
    startTime: '09:00',
    endTime: '10:30'
  },
  {
    id: 'class2',
    name: 'Database Systems',
    code: 'CS301',
    instructor: 'Prof. Johnson',
    roomId: 'room2',
    day: 'Tuesday',
    startTime: '13:00',
    endTime: '15:00'
  },
  {
    id: 'class3',
    name: 'Web Development',
    code: 'CS401',
    instructor: 'Dr. Williams',
    roomId: 'room1',
    day: 'Wednesday',
    startTime: '11:00',
    endTime: '13:00'
  },
  {
    id: 'class4',
    name: 'Data Structures',
    code: 'CS201',
    instructor: 'Prof. Davis',
    roomId: 'room2',
    day: 'Thursday',
    startTime: '15:00',
    endTime: '17:00'
  }
];

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

export const lecturers: User[] = [
  {
    id: 'lecturer1',
    name: 'Dr. Sarah Williams',
    email: 'sarah.williams@tut.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/women/4.jpg'
  },
  {
    id: 'lecturer2',
    name: 'Prof. Michael Johnson',
    email: 'michael.johnson@tut.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/men/5.jpg'
  },
  {
    id: 'lecturer3',
    name: 'Dr. Emily Brown',
    email: 'emily.brown@tut.edu',
    role: 'lecturer',
    avatar: 'https://randomuser.me/api/portraits/women/6.jpg'
  }
];

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