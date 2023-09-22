import { Service } from '../service/types';

export type AuthResponse = {
  access: string;
  refresh: string;
  phone: string;
  service?: Service | null;
  description?: string | null;
};

export type User = Omit<AuthResponse, 'access' | 'refresh'>;
