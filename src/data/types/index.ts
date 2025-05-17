
// Export existing types
export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
  category: 'general' | 'booking' | 'maintenance' | 'academic' | 'urgent';
}

export interface MaintenanceRequest {
  id: string;
  title: string;
  description: string;
  location: string;
  reporterId: string;
  dateReported: string;
  priority: "high" | "low" | "medium";
  status: "pending" | "in-progress" | "resolved";
  assignedTo?: string;
  assignedDate?: string;
  notes?: string;
  imageUrl?: string;
}

// Re-export all other types
export * from './user';
export * from './room';
export * from './booking';
export * from './class';
export * from './appointment';
