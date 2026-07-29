import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpDown } from 'lucide-react';
import { productService } from '@/services/product.service';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

const CATEGORIES = ['Todos', 'Laptops', 'Smartphones', 'Audio', 'Monitores', 'Smartwatches', 'Gaming', 'Accesorios'];

export const CatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'Todos';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [searchTerm, setSearchTerm] = useState(searchQuery);
  const [sortBy, setSortBy] = useState<'relevancia' | 'precio-asc' | 'precio-desc' | 'rating'>('relevancia');

  useEffect(() => {
    setSelectedCategory(categoryParam);
  }, [categoryParam]);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    productService.getAllProducts().then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
    if (cat === 'Todos') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  let filteredProducts = products.filter((p) => {
    const matchesCategory =
      selectedCategory === 'Todos' || p.categoria.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch =
      !searchTerm ||
      p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.descripcion.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sorting logic
  filteredProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.precio_oferta || a.precio;
    const priceB = b.precio_oferta || b.precio;

    if (sortBy === 'precio-asc') return priceA - priceB;
    if (sortBy === 'precio-desc') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0; // relevancia por defecto
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Catálogo de Productos
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            {filteredProducts.length} productos disponibles
          </p>
        </div>

        {/* Sort Filter Selector */}
        <div className="flex items-center gap-2 bg-[#141417] border border-slate-800 rounded-xl px-3 py-2 text-xs">
          <ArrowUpDown className="w-4 h-4 text-violet-400 shrink-0" />
          <span className="text-slate-400 font-semibold">Ordenar:</span>
          <select
            value={sortBy}
            onChange={(e: any) => setSortBy(e.target.value)}
            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
          >
            <option value="relevancia" className="bg-[#141417]">Más Relevantes</option>
            <option value="precio-asc" className="bg-[#141417]">Menor Precio (RD$)</option>
            <option value="precio-desc" className="bg-[#141417]">Mayor Precio (RD$)</option>
            <option value="rating" className="bg-[#141417]">Mejor Evaluados</option>
          </select>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategorySelect(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
              selectedCategory === cat
                ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/30'
                : 'bg-[#141417] border border-slate-800 text-slate-300 hover:border-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="h-80 rounded-2xl bg-[#141417] animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16 bg-[#141417] border border-slate-800 rounded-2xl p-8">
          <p className="text-slate-400 text-base mb-4">No encontramos productos que coincidan con tu búsqueda.</p>
          <button
            onClick={() => {
              setSelectedCategory('Todos');
              setSearchTerm('');
              setSearchParams({});
            }}
            className="px-6 py-2.5 rounded-xl bg-violet-600 text-white text-xs font-bold"
          >
            Limpiar Filtros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
