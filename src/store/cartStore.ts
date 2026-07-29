import { create } from 'zustand';
import { Product, CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, cantidad?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, cantidad: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getSubtotal: () => number;
  getITBIS: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: JSON.parse(localStorage.getItem('ecomerce_cart') || '[]'),

  addItem: (product: Product, cantidad = 1) => {
    const { items } = get();
    const existingIndex = items.findIndex((i) => i.product.id === product.id);

    let updatedItems: CartItem[];
    if (existingIndex > -1) {
      updatedItems = [...items];
      updatedItems[existingIndex].cantidad += cantidad;
    } else {
      updatedItems = [...items, { product, cantidad }];
    }

    localStorage.setItem('ecomerce_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  removeItem: (productId: string) => {
    const updatedItems = get().items.filter((i) => i.product.id !== productId);
    localStorage.setItem('ecomerce_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  updateQuantity: (productId: string, cantidad: number) => {
    if (cantidad <= 0) {
      get().removeItem(productId);
      return;
    }
    const updatedItems = get().items.map((i) =>
      i.product.id === productId ? { ...i, cantidad } : i
    );
    localStorage.setItem('ecomerce_cart', JSON.stringify(updatedItems));
    set({ items: updatedItems });
  },

  clearCart: () => {
    localStorage.removeItem('ecomerce_cart');
    set({ items: [] });
  },

  getSubtotal: () => {
    return get().items.reduce(
      (sum, item) => sum + (item.product.precio_oferta || item.product.precio) * item.cantidad,
      0
    );
  },

  getITBIS: () => {
    return get().getSubtotal() * 0.18; // ITBIS 18% en República Dominicana
  },

  getTotal: () => {
    return get().getSubtotal() + get().getITBIS();
  },

  getItemCount: () => {
    return get().items.reduce((sum, item) => sum + item.cantidad, 0);
  },
}));
