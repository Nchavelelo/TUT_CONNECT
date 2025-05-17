
export interface AppointmentRequest {
  id: string;
  studentId: string;
  lecturerId: string;
  subject: string;
  description: string;
  date: string;
  time: string;
  duration: string;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  notes?: string;
  preferredDate: string;
  preferredTime: string;
  createdAt: string;
}
