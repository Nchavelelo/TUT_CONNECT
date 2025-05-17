
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'student' | 'lecturer';
  faculty?: string;
  campus?: string;
  course?: string;
  department?: string;
  status?: 'active' | 'inactive';
  profileImage?: string;
}

export interface Room {
  id: string;
  name: string;
  capacity: number;
  building: string;
  floor: string;
  roomNumber: string;
  type: string;
  status: 'available' | 'occupied' | 'maintenance';
  amenities: string[];
  faculty?: string;
  bookedSeats?: number;
}

export interface Booking {
  id: string;
  roomId: string;
  userId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  user: User;
  room: Room;
  day?: string;
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  updatedAt: string;
  userId: string;
  user: User;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'info' | 'warning' | 'success' | 'error';
  userId?: string;
}

export interface Appointment {
  id: string;
  title: string;
  description: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'approved' | 'rejected' | 'cancelled';
  studentId: string;
  lecturerId: string;
  student: User;
  lecturer: User;
}
