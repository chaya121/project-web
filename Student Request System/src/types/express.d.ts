import type { UserRole } from '../models/User'; // ถ้ามี type UserRole ใน models

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole | string; // หรือ fix เป็น 'student'|'staff'|'admin'
      };
    }
  }
}

export {};