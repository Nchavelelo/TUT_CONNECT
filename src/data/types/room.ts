
export interface Room {
  id: string;
  name: string;
  building: string;
  floor: string;
  capacity: number;
  type: string;
  amenities: string[];
  availability?: { day: string; slots: string[] }[];
  campus?: string;
  status?: 'available' | 'booked' | 'maintenance';
  image?: string;
  features?: string[];
  faculty?: string;
  equipment?: string[];
}
