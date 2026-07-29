import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { MOCK_PRODUCTS } from '@/services/product.service';
import { orderService } from '@/services/order.service';
import { Product } from '@/types/product';
import { OrderData } from '@/types/order';

import { AdminMetrics } from '@/components/admin/AdminMetrics';
import { AdminOrdersTable } from '@/components/admin/AdminOrdersTable';
import { AddProductForm } from '@/components/admin/AddProductForm';
import { InventoryTable } from '@/components/admin/InventoryTable';
import { EditProductModal } from '@/components/admin/EditProductModal';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [orders, setOrders] = useState<OrderData[]>([]);

  // Edit Modal State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    orderService.getOrders().then(setOrders);
  }, []);

  if (!isAuthenticated || user?.rol !== 'admin') {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-red-400">Acceso Denegado</h2>
        <p className="text-sm text-slate-400">
          Solo la cuenta administradora (lorenzobuten02@gmail.com) tiene permiso para acceder a este panel.
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm"
        >
          Volver al Inicio
        </button>
      </div>
    );
  }

  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  const handleAddProduct = (newProduct: Product) => {
    setProducts([newProduct, ...products]);
  };

  const handleEditProduct = (prod: Product) => {
    setSelectedProduct(prod);
    setIsEditModalOpen(true);
  };

  const handleSaveEditProduct = (updated: Product) => {
    setProducts(products.map((p) => (p.id === updated.id ? updated : p)));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      <button
        onClick={() => navigate('/profile')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Mi Perfil
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-black text-white">Panel de Administración</h1>
            <ShieldCheck className="w-6 h-6 text-violet-400" />
          </div>
          <p className="text-xs text-slate-400">Gestiona catálogo de productos, órdenes y ventas en tiempo real</p>
        </div>
      </div>

      <AdminMetrics
        productsCount={products.length}
        ordersCount={orders.length}
        totalSales={totalSales}
      />

      <AdminOrdersTable orders={orders} />

      <AddProductForm onAddProduct={handleAddProduct} />

      <InventoryTable
        products={products}
        onEditProduct={handleEditProduct}
        onDeleteProduct={handleDeleteProduct}
      />

      <EditProductModal
        product={selectedProduct}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEditProduct}
      />
    </div>
  );
};
