import { OrderData } from '@/types/order';
import { supabase, isSupabaseConfigured } from '@/lib/supabaseClient';

export const orderService = {
  async saveOrder(order: OrderData): Promise<void> {
    // 1. Guardar en localStorage
    const stored = JSON.parse(localStorage.getItem('ecomerce_all_orders') || '[]');
    localStorage.setItem('ecomerce_all_orders', JSON.stringify([order, ...stored]));

    // 2. Guardar en Supabase DB
    if (isSupabaseConfigured) {
      try {
        await supabase.from('orders').insert([
          {
            order_code: order.id,
            customer_name: order.cliente_nombre,
            customer_phone: order.cliente_telefono,
            address: order.direccion,
            payment_method: order.metodo_pago,
            total: order.total,
            items: order.items,
          },
        ]);
      } catch (e) {
        console.warn('Error guardando orden en Supabase:', e);
      }
    }
  },

  async getOrders(): Promise<OrderData[]> {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase
          .from('orders')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          return data.map((d: any) => ({
            id: d.order_code || d.id,
            cliente_nombre: d.customer_name || d.cliente_nombre,
            cliente_telefono: d.customer_phone || d.cliente_telefono,
            direccion: d.address || d.direccion,
            metodo_pago: d.payment_method || d.metodo_pago,
            items: d.items || [],
            subtotal: d.subtotal || 0,
            itbis: d.itbis || 0,
            total: d.total || 0,
            created_at: d.created_at,
          }));
        }
      } catch (e) {
        console.warn('Fallback a órdenes locales:', e);
      }
    }

    return JSON.parse(localStorage.getItem('ecomerce_all_orders') || '[]');
  },
};
