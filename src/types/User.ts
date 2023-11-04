export interface User {
  name: string;
  lastname: string;
  role: Role;
  email: string;
  password?: string;
  isActive: boolean;
}

export type Role = 'ADMIN' | 'CLIENT';
