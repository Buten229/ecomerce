export interface UserProfile {
  id: string;
  nombre: string;
  telefono: string;
  rol: 'admin' | 'customer';
  created_at?: string;
}
