export interface UserProfile {
  id: string;
  nombre: string;
  telefono: string;
  rol: 'admin' | 'customer';
  created_at?: string;
}

export interface Product {
  id: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precio_oferta?: number;
  imagen: string;
  imagenes?: string[];
  categoria: string;
  stock: number;
  rating: number;
  reviews_count: number;
  destacado: boolean;
  specs?: Record<string, string>;
  created_at?: string;
}

export interface CartItem {
  product: Product;
  cantidad: number;
}

export interface Order {
  id: string;
  user_id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  itbis: number;
  estado: 'pendiente' | 'procesando' | 'enviado' | 'entregado' | 'cancelado';
  direccion_envio: string;
  telefono_contacto: string;
  metodo_pago: string;
  created_at: string;
}

export interface Category {
  id: string;
  nombre: string;
  icono: string;
  descripcion: string;
}

export type SortOption = 'relevancia' | 'precio-asc' | 'precio-desc' | 'rating' | 'nuevo';
