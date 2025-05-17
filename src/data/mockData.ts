
// Re-export all mock data from this file
import { notifications } from "./mock/notifications";
import { users, lecturers } from "./mock/users";
import { rooms } from "./mock/rooms";
import { bookings } from "./mock/bookings";
import { maintenanceRequests } from "./mock/maintenance";
import { classes } from "./mock/classes";
import { appointments } from "./mock/appointments";

// Export types from types/index.ts
import { 
  Notification, 
  MaintenanceRequest 
} from './types';

// Add missing types
import type { User } from './types/user';
import type { Room } from './types/room';
import type { Booking } from './types/booking';
import type { Class } from './types/class';
import type { AppointmentRequest } from './types/appointment';

// Define UserRole type
export type UserRole = 'student' | 'lecturer' | 'admin';

// Export everything
export {
  notifications,
  users,
  lecturers,
  rooms,
  bookings,
  maintenanceRequests,
  classes,
  appointments
};

// Export types
export type {
  User,
  Notification,
  MaintenanceRequest,
  Room,
  Booking,
  Class,
  AppointmentRequest
};
