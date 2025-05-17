
import { Room } from "../types/room";

export const rooms: Room[] = [
  {
    id: "room1",
    name: "Lecture Hall A",
    building: "Science Building",
    floor: "1",
    capacity: 120,
    type: "lecture",
    amenities: ["projector", "whiteboard", "computer"],
    availability: [
      { day: "Monday", slots: ["09:00-11:00", "13:00-15:00"] },
      { day: "Wednesday", slots: ["09:00-11:00"] },
      { day: "Friday", slots: ["13:00-15:00"] }
    ]
  },
  {
    id: "room2",
    name: "Computer Lab B",
    building: "Engineering Building",
    floor: "2",
    capacity: 40,
    type: "lab",
    amenities: ["computers", "whiteboard", "specialized software"],
    availability: [
      { day: "Tuesday", slots: ["10:00-12:00", "14:00-16:00"] },
      { day: "Thursday", slots: ["10:00-12:00"] }
    ]
  },
  {
    id: "room3",
    name: "Conference Room C",
    building: "Administration Building",
    floor: "3",
    capacity: 20,
    type: "meeting",
    amenities: ["projector", "videoconferencing", "whiteboard"],
    availability: [
      { day: "Monday", slots: ["14:00-16:00"] },
      { day: "Wednesday", slots: ["14:00-16:00"] },
      { day: "Friday", slots: ["10:00-12:00"] }
    ]
  },
  {
    id: "room4",
    name: "Study Space D",
    building: "Library",
    floor: "4",
    capacity: 15,
    type: "study",
    amenities: ["quiet space", "power outlets", "whiteboard"],
    availability: [
      { day: "Monday", slots: ["09:00-20:00"] },
      { day: "Tuesday", slots: ["09:00-20:00"] },
      { day: "Wednesday", slots: ["09:00-20:00"] },
      { day: "Thursday", slots: ["09:00-20:00"] },
      { day: "Friday", slots: ["09:00-20:00"] }
    ]
  }
];
