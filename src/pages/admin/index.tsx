import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Plus, Package, Users, DollarSign, ArrowLeft, Trash2 } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { MOCK_PRODUCTS } from '@/services/product.service';
import { Product } from '@/types';

export const AdminPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Form states for new product
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Laptops');
  const [precio, setPrecio] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');
  const [stock, setStock] = useState('10');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

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

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre || !precio || !descripcion) {
      alert('Completa los campos requeridos');
      return;
    }

    const newProd: Product = {
      id: `prod-${Date.now()}`,
      nombre,
      categoria,
      precio: parseFloat(precio),
      precio_oferta: precioOferta ? parseFloat(precioOferta) : undefined,
      stock: parseInt(stock, 10),
      descripcion,
      imagen: imagen || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80',
      rating: 5.0,
      reviews_count: 1,
      destacado: true,
    };

    setProducts([newProd, ...products]);
    setNombre('');
    setPrecio('');
    setPrecioOferta('');
    setDescripcion('');
    setImagen('');
    alert('¡Producto agregado al panel!');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <button
        onClick={() => navigate('/profile')}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver a Mi Perfil
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black text-white">Panel de Administración</h1>
            <ShieldCheck className="w-6 h-6 text-violet-400" />
          </div>
          <p className="text-xs text-slate-400">Gestiona catálogo de productos, órdenes y tienda</p>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-[#141417] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold block">Productos Activos</span>
            <span className="text-2xl font-black text-white">{products.length}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-violet-950/60 text-violet-400 flex items-center justify-center">
            <Package className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141417] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold block">Órdenes Totales</span>
            <span className="text-2xl font-black text-cyan-400">12</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-950/60 text-cyan-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#141417] border border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-slate-400 text-xs font-semibold block">Ventas del Mes</span>
            <span className="text-2xl font-black text-emerald-400">RD$ 485,000</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Add Product Form */}
      <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2">
          <Plus className="w-5 h-5 text-violet-400" /> Agregar Nuevo Producto
        </h2>

        <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Nombre *</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej: iPhone 16 Pro Max"
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Categoría</label>
            <select
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            >
              <option value="Laptops">Laptops</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Audio">Audio</option>
              <option value="Monitores">Monitores</option>
              <option value="Smartwatches">Smartwatches</option>
              <option value="Gaming">Gaming</option>
              <option value="Accesorios">Accesorios</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Precio (RD$) *</label>
            <input
              type="number"
              required
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              placeholder="Ej: 85000"
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Precio Oferta (Opcional)</label>
            <input
              type="number"
              value={precioOferta}
              onChange={(e) => setPrecioOferta(e.target.value)}
              placeholder="Ej: 79900"
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Stock</label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setStock(e.target.value)}
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">URL de Imagen (Unsplash, etc.)</label>
            <input
              type="url"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              placeholder="https://..."
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3">
            <label className="text-xs font-semibold text-slate-400 block mb-1">Descripción *</label>
            <textarea
              required
              rows={2}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Descripción del producto..."
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="sm:col-span-2 lg:col-span-3 flex justify-end">
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-xs hover:bg-violet-500 transition-all"
            >
              Guardar Producto
            </button>
          </div>
        </form>
      </div>

      {/* Manage Products Table */}
      <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-4">
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
                    <span className="truncate max-w-[200px]">{p.nombre}</span>
                  </td>
                  <td className="p-3">{p.categoria}</td>
                  <td className="p-3 font-bold text-cyan-400">RD$ {p.precio.toLocaleString()}</td>
                  <td className="p-3">{p.stock} u.</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => handleDeleteProduct(p.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
