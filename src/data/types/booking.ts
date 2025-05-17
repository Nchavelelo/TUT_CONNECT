export interface Booking {
  id: string;
  userId: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  purpose: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'pendingApproval';
  notes?: string;
  day?: string;
  userRole?: 'student' | 'lecturer'; // To differentiate between student and lecturer bookings
}
