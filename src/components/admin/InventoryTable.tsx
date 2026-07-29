import React from 'react';
import { Trash2, Edit3 } from 'lucide-react';
import { Product } from '@/types/product';

interface InventoryTableProps {
  products: Product[];
  onEditProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

export const InventoryTable: React.FC<InventoryTableProps> = ({
  products,
  onEditProduct,
  onDeleteProduct,
}) => {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-4">
      <h2 className="text-lg font-bold text-white">Inventario Actual</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-[#0a0a0d] uppercase text-[10px] text-slate-500">
            <tr>
              <th className="p-3">Producto</th>
              <th className="p-3">Categoría</th>
              <th className="p-3">Precio</th>
              <th className="p-3">Stock</th>
              <th className="p-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.map((p) => (
              <tr key={p.id} className="hover:bg-slate-900/50">
                <td className="p-3 font-semibold text-white flex items-center gap-2">
                  <img src={p.imagen} alt="" className="w-8 h-8 object-contain rounded-lg bg-[#0a0a0d]" />
                  <span className="truncate max-w-[150px] sm:max-w-[250px]">{p.nombre}</span>
                </td>
                <td className="p-3">{p.categoria}</td>
                <td className="p-3 font-bold text-cyan-400">RD$ {p.precio.toLocaleString()}</td>
                <td className="p-3">{p.stock} u.</td>
                <td className="p-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEditProduct(p)}
                      className="p-1.5 text-slate-400 hover:text-violet-400 transition-colors bg-[#0a0a0d] border border-slate-800 rounded-lg"
                      title="Editar Producto"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(p.id)}
                      className="p-1.5 text-slate-400 hover:text-red-400 transition-colors bg-[#0a0a0d] border border-slate-800 rounded-lg"
                      title="Eliminar Producto"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
