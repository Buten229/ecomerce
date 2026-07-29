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
