import React, { useState, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Product } from '@/types/product';

interface EditProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProduct: Product) => void;
}

export const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onSave,
}) => {
  const [nombre, setNombre] = useState('');
  const [categoria, setCategoria] = useState('Laptops');
  const [precio, setPrecio] = useState('');
  const [precioOferta, setPrecioOferta] = useState('');
  const [stock, setStock] = useState('10');
  const [descripcion, setDescripcion] = useState('');
  const [imagen, setImagen] = useState('');

  useEffect(() => {
    if (product) {
      setNombre(product.nombre);
      setCategoria(product.categoria);
      setPrecio(product.precio.toString());
      setPrecioOferta(product.precio_oferta ? product.precio_oferta.toString() : '');
      setStock(product.stock.toString());
      setDescripcion(product.descripcion);
      setImagen(product.imagen);
    }
  }, [product]);

  if (!isOpen || !product) return null;

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

    const updated: Product = {
      ...product,
      nombre,
      categoria,
      precio: parseFloat(precio),
      precio_oferta: precioOferta ? parseFloat(precioOferta) : undefined,
      stock: parseInt(stock, 10),
      descripcion,
      imagen: imagen || product.imagen,
    };

    onSave(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-[#141417] border border-slate-800 rounded-3xl max-w-lg w-full p-6 space-y-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <h2 className="text-lg font-bold text-white">Editar Producto</h2>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="font-semibold text-slate-400 block mb-1">Nombre del Producto *</label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Categoría</label>
              <select
                value={categoria}
                onChange={(e) => setCategoria(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
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
              <label className="font-semibold text-slate-400 block mb-1">Stock Disponible</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-semibold text-slate-400 block mb-1">Precio (RD$) *</label>
              <input
                type="number"
                required
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
              />
            </div>

            <div>
              <label className="font-semibold text-slate-400 block mb-1">Precio Oferta (RD$)</label>
              <input
                type="number"
                value={precioOferta}
                onChange={(e) => setPrecioOferta(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-3 py-2.5 text-white focus:outline-none focus:border-violet-500"
              />
            </div>
          </div>

          {/* Upload Image Section */}
          <div className="space-y-2">
            <label className="font-semibold text-slate-400 block">Imagen del Producto</label>
            <div className="flex items-center gap-3">
              {imagen && (
                <img src={imagen} alt="Vista previa" className="w-14 h-14 object-contain rounded-xl bg-[#0a0a0d] border border-slate-800 p-1" />
              )}
              <label className="flex-1 cursor-pointer py-2.5 px-4 rounded-xl bg-[#0a0a0d] border border-dashed border-slate-700 hover:border-violet-500 text-slate-300 font-semibold flex items-center justify-center gap-2">
                <Upload className="w-4 h-4 text-violet-400" />
                <span>Subir Foto del Dispositivo</span>
                <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
              </label>
            </div>
            <input
              type="url"
              value={imagen.startsWith('data:') ? '' : imagen}
              onChange={(e) => setImagen(e.target.value)}
              placeholder="O pega URL de imagen (https://...)"
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-violet-500 text-[11px]"
            />
          </div>

          <div>
            <label className="font-semibold text-slate-400 block mb-1">Descripción *</label>
            <textarea
              required
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-violet-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl bg-[#0a0a0d] border border-slate-800 text-slate-300 font-bold"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
