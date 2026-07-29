import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, ArrowLeft, Check, ShoppingBag, Share2, MessageCircle } from 'lucide-react';
import { productService } from '@/services/product.service';
import { useCartStore } from '@/store/cartStore';
import { useToastStore } from '@/store/toastStore';
import { Product } from '@/types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (id) {
      productService.getProductById(id).then((res) => {
        setProduct(res);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="h-96 rounded-2xl bg-[#141417] animate-pulse" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Producto no encontrado</h2>
        <button
          onClick={() => navigate('/catalog')}
          className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm"
        >
          Volver al Catálogo
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    addToast(`"${product.nombre}" agregado al carrito`, 'success');
    setTimeout(() => setAdded(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `🔥 ¡Mira este producto en Ecomerce Tech Store!\n\n*${product.nombre}*\n💰 Precio: RD$ ${(product.precio_oferta || product.precio).toLocaleString()}\n\nVer aquí: ${window.location.href}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    addToast('¡Enlace del producto copiado al portapapeles!', 'info');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Volver atrás
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Image Box */}
        <div className="rounded-3xl bg-[#141417] border border-slate-800 p-8 flex items-center justify-center relative overflow-hidden group">
          <img
            src={product.imagen}
            alt={product.nombre}
            className="w-full max-h-[450px] object-contain rounded-2xl group-hover:scale-105 transition-transform duration-300"
          />
          {product.precio_oferta && (
            <span className="absolute top-6 left-6 px-3 py-1 rounded-full bg-cyan-500 text-slate-950 font-black text-xs uppercase tracking-wider">
              En Oferta
            </span>
          )}
        </div>

        {/* Product Details Info */}
        <div className="space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-violet-400">
              {product.categoria}
            </span>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight mt-1 mb-3">
              {product.nombre}
            </h1>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
                <span className="font-bold text-white">{product.rating}</span>
              </div>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">{product.reviews_count} valoraciones</span>
              <span className="text-slate-500">•</span>
              <span className="text-emerald-400 font-semibold">Stock disponible ({product.stock})</span>
            </div>
          </div>

          {/* Pricing */}
          <div className="p-4 rounded-2xl bg-[#141417] border border-slate-800 flex items-baseline gap-4">
            <span className="text-3xl font-black text-white">
              RD$ {(product.precio_oferta || product.precio).toLocaleString()}
            </span>
            {product.precio_oferta && (
              <span className="text-base text-slate-500 line-through">
                RD$ {product.precio.toLocaleString()}
              </span>
            )}
            <span className="text-[10px] text-slate-400 uppercase font-semibold ml-auto">
              ITBIS Incluido
            </span>
          </div>

          <p className="text-slate-300 text-sm leading-relaxed">{product.descripcion}</p>

          {/* Share Product Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={handleShareWhatsApp}
              className="py-2 px-4 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 hover:bg-emerald-900/60 transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Compartir por WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="py-2 px-4 rounded-xl bg-[#141417] border border-slate-800 text-slate-300 text-xs font-bold flex items-center gap-2 hover:text-white transition-all"
            >
              <Share2 className="w-4 h-4" /> Copiar Enlace
            </button>
          </div>

          {/* Technical Specs */}
          {product.specs && (
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Especificaciones clave
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(product.specs).map(([key, val]) => (
                  <div key={key} className="p-3 rounded-xl bg-[#141417] border border-slate-800 text-xs">
                    <span className="text-slate-400 block text-[10px] font-semibold">{key}</span>
                    <span className="text-white font-semibold">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 px-6 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                added
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gradient-to-r from-violet-600 to-purple-600 text-white hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-600/30'
              }`}
            >
              {added ? (
                <>
                  <Check className="w-5 h-5" /> ¡Agregado al Carrito!
                </>
              ) : (
                <>
                  <ShoppingBag className="w-5 h-5" /> Agregar al Carrito
                </>
              )}
            </button>
            <button
              onClick={() => {
                addItem(product);
                navigate('/checkout');
              }}
              className="px-6 py-4 rounded-xl bg-[#141417] border border-slate-800 text-white font-bold text-sm hover:bg-slate-800 transition-all text-center"
            >
              Comprar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
