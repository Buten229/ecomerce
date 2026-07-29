import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Heart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const currentPrice = product.precio_oferta || product.precio;
  const hasDiscount = !!product.precio_oferta;
  const discountPercent = hasDiscount
    ? Math.round(((product.precio - product.precio_oferta!) / product.precio) * 100)
    : 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
    setAdded(true);
    addToast(`"${product.nombre}" agregado al carrito`, 'success');
    setTimeout(() => setAdded(false), 1800);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    addToast(isFavorite ? 'Quitado de favoritos' : 'Guardado en favoritos', 'info');
  };

  return (
    <Link to={`/product/${product.id}`} className="block group h-full">
      <div className="h-full bg-[#141417] border border-slate-800 hover:border-violet-500/50 rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-violet-500/10 relative">
        {/* Top Header */}
        <div className="flex items-center justify-between z-10 mb-2">
          {hasDiscount ? (
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-950 border border-cyan-500/40 text-cyan-400 text-[10px] font-black uppercase">
              -{discountPercent}% OFERTA
            </span>
          ) : (
            <span className="px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 text-[10px] font-bold uppercase">
              {product.categoria}
            </span>
          )}

          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-xl border transition-all ${
              isFavorite
                ? 'bg-rose-950/60 border-rose-500/50 text-rose-400'
                : 'bg-[#0a0a0d] border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
          </button>
        </div>

        {/* Product Image */}
        <div className="relative aspect-square w-full rounded-xl bg-[#0a0a0d] border border-slate-800/80 mb-3 flex items-center justify-center p-4 overflow-hidden">
          <img
            src={product.imagen}
            alt={product.nombre}
            loading="lazy"
            className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Info */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1 mb-1 text-amber-400 text-xs">
              <Star className="w-3.5 h-3.5 fill-amber-400" />
              <span className="font-bold text-white text-[11px]">{product.rating}</span>
              <span className="text-slate-500 text-[10px]">({product.reviews_count})</span>
            </div>
            <h3 className="font-bold text-sm text-white group-hover:text-violet-300 transition-colors line-clamp-2 leading-tight">
              {product.nombre}
            </h3>
          </div>

          {/* Pricing & Add Button */}
          <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
            <div>
              <span className="font-black text-base text-white block">
                RD$ {currentPrice.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-[10px] text-slate-500 line-through block -mt-1">
                  RD$ {product.precio.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`p-2.5 rounded-xl font-bold transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-md shadow-violet-600/30'
              }`}
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';
