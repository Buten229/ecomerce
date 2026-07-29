import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotal, clearCart } = useCartStore();

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [ciudad, setCiudad] = useState('Santo Domingo');
  const [metodoPago, setMetodoPago] = useState('tarjeta');
  const [completado, setCompletado] = useState(false);

  if (items.length === 0 && !completado) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">No hay productos en el checkout</h2>
        <button
          onClick={() => navigate('/catalog')}
          className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm"
        >
          Ir al Catálogo
        </button>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !telefono || !direccion) {
      alert('Por favor completa todos los campos obligatorios');
      return;
    }
    setCompletado(true);
    clearCart();
  };

  if (completado) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
          <CheckCircle className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black text-white">¡Orden Confirmada!</h1>
        <p className="text-sm text-slate-300">
          Gracias por tu compra, <strong className="text-white">{nombre}</strong>. Hemos recibido tu pedido y te contactaremos por WhatsApp al <strong className="text-white">{telefono}</strong> para coordinar la entrega.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-8 py-3.5 rounded-xl bg-violet-600 text-white font-bold text-sm hover:bg-violet-500 transition-all"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-black text-white tracking-tight mb-8">Finalizar Compra</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Details */}
          <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Truck className="w-5 h-5 text-violet-400" /> Información de Envío
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Nombre Completo *</label>
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-400 block mb-1">Teléfono WhatsApp *</label>
                <input
                  type="tel"
                  required
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="Ej: 809-555-0199"
                  className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Dirección de Entrega *</label>
              <input
                type="text"
                required
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
                placeholder="Calle, Sector, N° de Edificio o Casa"
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Ciudad / Provincia</label>
              <select
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-violet-500"
              >
                <option value="Santo Domingo">Santo Domingo (DN / Este / Norte / Ouest)</option>
                <option value="Santiago">Santiago de los Caballeros</option>
                <option value="La Romana">La Romana</option>
                <option value="Punta Cana">Punta Cana / Bávaro</option>
                <option value="Puerto Plata">Puerto Plata</option>
                <option value="San Cristóbal">San Cristóbal</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-cyan-400" /> Método de Pago
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'tarjeta', title: 'Tarjeta Crédito/Débito', sub: 'Visa, Mastercard' },
                { id: 'transferencia', title: 'Transferencia', sub: 'Banreservas, BPD, BHD' },
                { id: 'contraentrega', title: 'Contra Entrega', sub: 'Efectivo en mano' },
              ].map((m) => (
                <button
                  type="button"
                  key={m.id}
                  onClick={() => setMetodoPago(m.id)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    metodoPago === m.id
                      ? 'bg-violet-950/60 border-violet-500 text-white'
                      : 'bg-[#0a0a0d] border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="text-xs font-bold block text-white">{m.title}</span>
                  <span className="text-[10px] text-slate-400">{m.sub}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total Summary Sidebar */}
        <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-6 h-fit">
          <h2 className="text-lg font-bold text-white border-b border-slate-800 pb-4">
            Resumen Final
          </h2>

          <div className="space-y-3">
            {items.map(({ product, cantidad }) => (
              <div key={product.id} className="flex justify-between text-xs text-slate-300">
                <span className="truncate max-w-[180px]">{product.nombre} (x{cantidad})</span>
                <span className="font-semibold text-white">
                  RD$ {((product.precio_oferta || product.precio) * cantidad).toLocaleString()}
                </span>
              </div>
            ))}
            <div className="border-t border-slate-800 pt-3 flex justify-between text-base font-black text-white">
              <span>Total a Pagar</span>
              <span className="text-cyan-400">RD$ {getTotal().toLocaleString()}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-600/30 transition-all"
          >
            Confirmar y Realizar Pedido
          </button>
        </div>
      </form>
    </div>
  );
};
