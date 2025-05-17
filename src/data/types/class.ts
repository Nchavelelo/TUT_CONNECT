
export interface Class {
  id: string;
  name: string;
  lecturer: string;
  roomId: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  courseCode: string;
  // Add missing properties that are used in components
  code?: string;
  instructor?: string;
  day?: string;
}
