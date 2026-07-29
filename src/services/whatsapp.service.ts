import { OrderData } from '@/types/order';

export const ADMIN_WHATSAPP = '18493140441';

export const whatsappService = {
  generateOrderMessage(order: OrderData): string {
    const itemsText = order.items
      .map((i) => `• ${i.nombre} (x${i.cantidad}) - RD$ ${(i.precio * i.cantidad).toLocaleString()}`)
      .join('\n');

    return (
      `🛍️ *NUEVO PEDIDO EN ECOMERCE TECH STORE*\n\n` +
      `📋 *Orden:* #${order.id}\n` +
      `👤 *Cliente:* ${order.cliente_nombre}\n` +
      `📱 *Teléfono:* ${order.cliente_telefono}\n` +
      `📍 *Dirección:* ${order.direccion}\n` +
      `💳 *Método de Pago:* ${order.metodo_pago.toUpperCase()}\n\n` +
      `📦 *PRODUCTOS:*\n${itemsText}\n\n` +
      `💵 *Subtotal:* RD$ ${order.subtotal.toLocaleString()}\n` +
      `📊 *ITBIS (18%):* RD$ ${order.itbis.toLocaleString()}\n` +
      `💰 *TOTAL A PAGAR:* RD$ ${order.total.toLocaleString()}\n\n` +
      `Por favor confirmar disponibilidad y envío.`
    );
  },

  getWhatsAppUrl(order: OrderData): string {
    const msg = this.generateOrderMessage(order);
    const encoded = encodeURIComponent(msg);
    return `https://wa.me/${ADMIN_WHATSAPP}?text=${encoded}`;
  },
};
