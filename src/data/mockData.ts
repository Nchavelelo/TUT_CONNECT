
// Re-export all interfaces from the types folder
export * from './types';

// Re-export all mock data from individual files
export { users, lecturers } from './mock/users';
export { rooms } from './mock/rooms';
export { bookings } from './mock/bookings';
export { classes } from './mock/classes';
export { maintenanceRequests } from './mock/maintenance';
export { notifications } from './mock/notifications';
export { appointmentRequests } from './mock/appointments';

// No need to run the initialization code again as the data is already properly formatted
// in their respective files
