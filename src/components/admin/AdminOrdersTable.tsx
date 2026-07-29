import React from 'react';
import { ShoppingBag, Phone } from 'lucide-react';
import { OrderData } from '@/types/order';

interface AdminOrdersTableProps {
  orders: OrderData[];
}

export const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({ orders }) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-4">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        <ShoppingBag className="w-5 h-5 text-cyan-400" /> Órdenes Realizadas por Clientes
      </h2>

      {orders.length === 0 ? (
        <p className="text-xs text-slate-400 py-4 text-center">
          Aún no se han registrado órdenes. Cuando un cliente compre, la orden aparecerá aquí automáticamente.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#0a0a0d] uppercase text-[10px] text-slate-500">
              <tr>
                <th className="p-3">Código</th>
                <th className="p-3">Cliente</th>
                <th className="p-3">Teléfono</th>
                <th className="p-3">Dirección</th>
                <th className="p-3">Total</th>
                <th className="p-3">Pago</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((o, idx) => (
                <tr key={o.id || idx} className="hover:bg-slate-900/50">
                  <td className="p-3 font-mono text-violet-400 font-bold">#{o.id}</td>
                  <td className="p-3 font-semibold text-white">{o.cliente_nombre}</td>
                  <td className="p-3 font-semibold text-emerald-400 flex items-center gap-1">
                    <Phone className="w-3 h-3" /> {o.cliente_telefono}
                  </td>
                  <td className="p-3 truncate max-w-[200px]">{o.direccion}</td>
                  <td className="p-3 font-black text-cyan-400">RD$ {(o.total || 0).toLocaleString()}</td>
                  <td className="p-3 uppercase text-[10px] font-bold text-slate-400">{o.metodo_pago}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
