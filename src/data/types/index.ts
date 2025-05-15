export type UserRole = 'student' | 'lecturer' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  faculty?: string;
  campus?: string;
  course?: string;
  department?: string;
  status?: UserStatus;
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
  faculty?: string;
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
  day?: string;
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
  assignedTo?: string;
  assignedDate?: string;
  notes?: string;
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