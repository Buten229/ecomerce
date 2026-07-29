import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, clearCart, getSubtotal, getITBIS, getTotal } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#141417] border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-white">Tu carrito está vacío</h2>
        <p className="text-sm text-slate-400">Explora nuestro catálogo y agrega los mejores productos tech.</p>
        <Link
          to="/catalog"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-500 transition-all"
        >
          Explorar Catálogo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-black text-white tracking-tight mb-8">Carrito de Compras</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(({ product, cantidad }) => (
            <div
              key={product.id}
              className="p-4 sm:p-6 rounded-2xl bg-[#141417] border border-slate-800 flex flex-col sm:flex-row items-center gap-4"
            >
              <img
                src={product.imagen}
                alt={product.nombre}
                className="w-20 h-20 object-contain rounded-xl bg-[#0a0a0d] p-2"
              />
              <div className="flex-1 text-center sm:text-left">
                <span className="text-[10px] font-bold text-violet-400 uppercase tracking-wider">
                  {product.categoria}
                </span>
                <h3 className="font-bold text-white text-base leading-tight mt-0.5">
                  {product.nombre}
                </h3>
                <span className="text-sm font-black text-cyan-400 block mt-1">
                  RD$ {(product.precio_oferta || product.precio).toLocaleString()}
                </span>
              </div>

              {/* Quantity controls */}
              <div className="flex items-center gap-3 bg-[#0a0a0d] border border-slate-800 rounded-xl px-3 py-1.5">
                <button
                  onClick={() => updateQuantity(product.id, cantidad - 1)}
                  className="text-slate-400 hover:text-white"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-white w-6 text-center">{cantidad}</span>
                <button
                  onClick={() => updateQuantity(product.id, cantidad + 1)}
                  className="text-slate-400 hover:text-white"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              <button
                onClick={() => removeItem(product.id)}
                className="p-2 text-slate-500 hover:text-red-400 transition-colors"
                title="Eliminar producto"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2">
            <button
              onClick={clearCart}
              className="text-xs font-semibold text-slate-500 hover:text-red-400 transition-colors"
            >
              Vaciar carrito
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-6 h-fit">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
            Resumen del Pedido
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-slate-400">
              <span>Subtotal</span>
              <span className="font-semibold text-white">RD$ {getSubtotal().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>ITBIS (18%)</span>
              <span className="font-semibold text-white">RD$ {getITBIS().toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Envío Nacional</span>
              <span className="font-semibold text-emerald-400">GRATIS</span>
            </div>
            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-black text-white">
              <span>Total Final</span>
              <span className="text-cyan-400">RD$ {getTotal().toLocaleString()}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 transition-all"
          >
            Proceder al Pago <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
