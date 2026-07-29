import { CartItem } from './product';

export interface OrderItem {
  nombre: string;
  cantidad: number;
  precio: number;
}

export interface OrderData {
  id: string;
  cliente_nombre: string;
  cliente_telefono: string;
  direccion: string;
  metodo_pago: string;
  items: OrderItem[];
  subtotal: number;
  itbis: number;
  total: number;
  created_at: string;
}
