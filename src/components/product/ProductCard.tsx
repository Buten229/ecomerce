import React, { useState, memo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Check, Heart, Eye } from 'lucide-react';
import { Product } from '@/types';
import { BentoCard } from '@/components/ui/BentoCard';
import { Badge } from '@/components/ui/Badge';
import { RatingStars } from '@/components/ui/RatingStars';
import { formatCurrency } from '@/utils/currency';
import { calculateDiscountPercentage } from '@/utils/format';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = memo(({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const discount = calculateDiscountPercentage(product.precio, product.precio_oferta);
  const currentPrice = product.precio_oferta || product.precio;

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  return (
    <Link to={`/product/${product.id}`} className="block group h-full">
      <BentoCard
        glow="purple"
        className="h-full flex flex-col justify-between p-3.5 sm:p-5 relative border border-[#24242e] hover:border-purple-500/60 transition-all duration-300 rounded-3xl"
      >
        {/* Top Badges */}
        <div className="flex items-center justify-between z-10 mb-2 sm:mb-3">
          {discount ? (
            <Badge variant="rose" size="sm" className="font-extrabold shadow-sm bg-rose-500/20 text-rose-300 border-rose-500/40">
              -{discount}% OFERTA
            </Badge>
          ) : (
            <Badge variant="purple" size="sm" className="font-bold">
              {product.marca}
            </Badge>
          )}

          <button
            onClick={toggleFavorite}
            className={`p-2 rounded-xl backdrop-blur-md transition-all ${
              isFavorite
                ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                : 'bg-black/50 text-gray-400 hover:text-white border border-white/10'
            }`}
            aria-label="Agregar a favoritos"
          >
            <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isFavorite ? 'fill-rose-400 text-rose-400' : ''}`} />
          </button>
        </div>

        {/* Product Image Container - Enhanced contrast & scale */}
        <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#181820] to-[#0e0e12] border border-[#242430] mb-3 flex items-center justify-center p-3">
          <img
            src={product.imagenes[0]}
            alt={product.nombre}
            loading="lazy"
            decoding="async"
            className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-300 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#141417] via-transparent to-transparent opacity-0 group-hover:opacity-70 transition-opacity flex items-end justify-center pb-2.5">
            <span className="inline-flex items-center space-x-1 text-[11px] font-semibold text-white bg-purple-600/90 px-3 py-1 rounded-full backdrop-blur-md shadow-lg">
              <Eye className="w-3 h-3" />
              <span>Ver Detalle</span>
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-1.5 mb-1">
              <RatingStars rating={product.rating_promedio || 5} size={12} />
              <span className="text-[10px] text-gray-400 font-medium">
                ({product.num_resenas || 12})
              </span>
            </div>
            <h3 className="font-semibold text-xs sm:text-sm text-white group-hover:text-purple-300 transition-colors line-clamp-2 leading-snug">
              {product.nombre}
            </h3>
          </div>

          {/* Stock Dashboard Progress Widget */}
          <div className="space-y-1 pt-1">
            <div className="flex items-center justify-between text-[10px] text-gray-400">
              <span>Stock disponible</span>
              <span className="font-semibold text-purple-400">{product.stock} un.</span>
            </div>
            <div className="w-full bg-gray-800/80 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-purple-500 via-indigo-500 to-blue-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min((product.stock / 20) * 100, 100)}%` }}
              />
            </div>
          </div>

          {/* Price & Add Button Row */}
          <div className="pt-2 flex items-center justify-between gap-1.5 border-t border-[#22222a]">
            <div className="min-w-0">
              <span className="font-outfit font-black text-sm sm:text-base text-white block truncate">
                {formatCurrency(currentPrice)}
              </span>
              {product.precio_oferta && (
                <span className="block text-[10px] text-gray-500 line-through -mt-1 truncate">
                  {formatCurrency(product.precio)}
                </span>
              )}
            </div>

            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className={`p-2.5 sm:p-3 rounded-xl font-medium transition-all duration-200 min-h-[40px] min-w-[40px] flex items-center justify-center shrink-0 ${
                added
                  ? 'bg-emerald-600 text-white shadow-glow-purple scale-105'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-bento active:scale-95'
              }`}
              aria-label="Agregar al Carrito"
            >
              {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </BentoCard>
    </Link>
  );
});

ProductCard.displayName = 'ProductCard';
