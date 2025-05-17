
import { UserRole } from '../mockData';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  faculty?: string;
  campus?: string;
  course?: string;
  department?: string;
  status?: string;
}
