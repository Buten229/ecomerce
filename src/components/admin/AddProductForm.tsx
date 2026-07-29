import React, { useState } from 'react';
import { Plus, Upload, Image as ImageIcon } from 'lucide-react';
import { Product } from '@/types/product';

interface AddProductFormProps {
  onAddProduct: (product: Product) => void;
}

export const AddProductForm: React.FC<AddProductFormProps> = ({ onAddProduct }) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Laptops');
  const [precio, setPrecio] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');
  const [stock, setStock] = useState('10');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagen(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
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

    onAddProduct(newProd);
    setNombre('');
    setPrecio('');
    setPrecioOferta('');
    setDescripcion('');
    setImagen('');
    alert('¡Producto agregado al catálogo!');
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-6">
      <h2 className="text-lg font-bold text-white flex items-center gap-2">
        <Plus className="w-5 h-5 text-violet-400" /> Agregar Nuevo Producto
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {/* Upload Image from Device */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-400 block mb-1">Imagen del Producto</label>
          <div className="flex items-center gap-2">
            <label className="flex-1 cursor-pointer py-2 px-3 rounded-xl bg-[#0a0a0d] border border-dashed border-slate-700 hover:border-violet-500 text-slate-300 font-semibold text-xs flex items-center justify-center gap-1.5 truncate">
              <Upload className="w-3.5 h-3.5 text-violet-400 shrink-0" />
              <span className="truncate">{imagen ? 'Imagen lista' : 'Subir desde dispositivo'}</span>
              <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
            </label>
          </div>
          <input
            type="url"
            value={imagen.startsWith('data:') ? '' : imagen}
            onChange={(e) => setImagen(e.target.value)}
            placeholder="O pega URL (https://...)"
            className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-3 py-1.5 text-[11px] text-white focus:outline-none focus:border-violet-500"
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
  );
};
