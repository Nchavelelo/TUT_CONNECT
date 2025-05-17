
import { AppointmentRequest } from "../types/appointment";

export const appointments: AppointmentRequest[] = [
  {
    id: "appt1",
    studentId: "user1",
    lecturerId: "user3",
    subject: "Assignment Clarification",
    description: "I need help understanding the requirements for the final project",
    date: "",
    time: "",
    duration: "30",
    reason: "Academic",
    preferredDate: "2025-06-01",
    preferredTime: "14:00",
    status: "pending",
    createdAt: "2025-05-12T10:00:00Z"
  },
  {
    id: "appt2",
    studentId: "user2",
    lecturerId: "user3",
    subject: "Career Advice",
    description: "Discussion about internship opportunities",
    date: "2025-05-20",
    time: "11:30",
    duration: "45",
    reason: "Career",
    preferredDate: "2025-05-20",
    preferredTime: "11:30",
    status: "approved",
    createdAt: "2025-05-10T09:15:00Z"
  }
];
