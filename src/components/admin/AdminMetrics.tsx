import React from 'react';
import { Package, Users, DollarSign } from 'lucide-react';

interface AdminMetricsProps {
  productsCount: number;
  ordersCount: number;
  totalSales: number;
}

export const AdminMetrics: React.FC<AdminMetricsProps> = ({
  productsCount,
  ordersCount,
  totalSales,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-slate-400 text-xs font-semibold block">Productos Activos</span>
          <span className="text-xl sm:text-2xl font-black text-white">{productsCount}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-violet-950/60 text-violet-400 flex items-center justify-center">
          <Package className="w-5 h-5" />
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-slate-400 text-xs font-semibold block">Órdenes Recibidas</span>
          <span className="text-xl sm:text-2xl font-black text-cyan-400">{ordersCount}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-cyan-950/60 text-cyan-400 flex items-center justify-center">
          <Users className="w-5 h-5" />
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-slate-800 flex items-center justify-between">
        <div>
          <span className="text-slate-400 text-xs font-semibold block">Ventas Acumuladas</span>
          <span className="text-xl sm:text-2xl font-black text-emerald-400">RD$ {totalSales.toLocaleString()}</span>
        </div>
        <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
          <DollarSign className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};
