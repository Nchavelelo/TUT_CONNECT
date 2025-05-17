
export const entities = [
  {
    title: "Users",
    fields: [
      "id (PK)",
      "name",
      "email",
      "role",
      "avatar"
    ],
    x: 50, 
    y: 50
  },
  {
    title: "Rooms",
    fields: [
      "id (PK)",
      "name",
      "capacity",
      "building",
      "floor",
      "type",
      "features",
      "image",
      "campus"
    ],
    x: 350, 
    y: 50
  },
  {
    title: "Classes",
    fields: [
      "id (PK)",
      "name",
      "code",
      "instructor",
      "roomId (FK)",
      "day",
      "startTime",
      "endTime"
    ],
    x: 650, 
    y: 50
  },
  {
    title: "Bookings",
    fields: [
      "id (PK)",
      "roomId (FK)",
      "userId (FK)",
      "date",
      "startTime",
      "endTime",
      "purpose",
      "status"
    ],
    x: 300, 
    y: 230
  },
  {
    title: "Maintenance Requests",
    fields: [
      "id (PK)",
      "title",
      "description",
      "location",
      "reporterId (FK)",
      "dateReported",
      "status",
      "priority",
      "imageUrl"
    ],
    x: 580, 
    y: 230
  },
  {
    title: "Notifications",
    fields: [
      "id (PK)",
      "userId (FK)",
      "title",
      "message",
      "date",
      "read",
      "category"
    ],
    x: 50, 
    y: 420
  },
  {
    title: "Appointment Requests",
    fields: [
      "id (PK)",
      "studentId (FK)",
      "lecturerId (FK)",
      "subject",
      "description",
      "preferredDate",
      "preferredTime",
      "status",
      "createdAt"
    ],
    x: 350, 
    y: 420
  }
];

export const relationships = [
  // User to Bookings
  {
    start: { x: 120, y: 150 },
    end: { x: 300, y: 250 },
    startCardinality: "1" as const,
    endCardinality: "N" as const,
    startLabel: "made by",
    endLabel: ""
  },
  // Room to Bookings
  {
    start: { x: 400, y: 150 },
    end: { x: 380, y: 230 },
    startCardinality: "1" as const,
    endCardinality: "N" as const,
    startLabel: "has",
    endLabel: "for"
  },
  // Room to Classes
  {
    start: { x: 550, y: 80 },
    end: { x: 650, y: 80 },
    startCardinality: "1" as const,
    endCardinality: "N" as const,
    startLabel: "hosts",
    endLabel: "held in"
  },
  // User to MaintenanceRequests
  {
    start: { x: 150, y: 120 },
    end: { x: 580, y: 250 },
    startCardinality: "1" as const,
    endCardinality: "N" as const,
    startLabel: "reports",
    endLabel: "reported by",
    curved: true
  },
  // User to Notifications
  {
    start: { x: 80, y: 150 },
    end: { x: 80, y: 420 },
    startCardinality: "1" as const,
    endCardinality: "N" as const,
    startLabel: "receives",
    endLabel: "sent to"
  },
  // Student (User) to AppointmentRequests
  {
    start: { x: 150, y: 130 },
    end: { x: 370, y: 420 },
    startCardinality: "1" as const,
    endCardinality: "N" as const,
    startLabel: "requests",
    endLabel: "requested by",
    curved: true
  },
  // Lecturer (User) to AppointmentRequests
  {
    start: { x: 170, y: 140 },
    end: { x: 400, y: 420 },
    startCardinality: "1" as const,
    endCardinality: "N" as const,
    startLabel: "receives",
    endLabel: "for",
    curved: true
  }
];
