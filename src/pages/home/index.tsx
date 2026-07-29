import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Truck, CreditCard, Headphones, Star } from 'lucide-react';
import { productService } from '@/services/product.service';
import { ProductCard } from '@/components/product/ProductCard';
import { Product } from '@/types';

export const HomePage: React.FC = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productService.getFeaturedProducts().then((res) => {
      setFeaturedProducts(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-16 md:py-24">
        {/* Glow Backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/20 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-cyan-500/15 rounded-full blur-[100px] -z-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-950/60 border border-violet-700/40 text-violet-300 text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Novedades 2026 en Tecnología Premium</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-none mb-6">
            La Experiencia <br />
            <span className="bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
              Tech Definitiva
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-300 mb-8 leading-relaxed">
            Explora computadoras, smartphones y gadgets de última generación con garantía oficial y envíos exprés a toda República Dominicana.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/catalog"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-base hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-600/30 flex items-center justify-center gap-2 group transition-all"
            >
              Ver Catálogo Completo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/catalog?category=Laptops"
              className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#141417] border border-slate-800 text-slate-200 font-semibold text-base hover:bg-slate-800 transition-all text-center"
            >
              Explorar MacBooks
            </Link>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <div className="p-5 rounded-2xl bg-[#141417] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-violet-950/60 border border-violet-700/30 flex items-center justify-center mb-3 text-violet-400">
              <Truck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Envíos Exprés 24h</h3>
            <p className="text-xs text-slate-400">Entrega rápida a todo el país</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141417] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-700/30 flex items-center justify-center mb-3 text-cyan-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Garantía Real</h3>
            <p className="text-xs text-slate-400">1 año directo con fabricante</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141417] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-950/60 border border-emerald-700/30 flex items-center justify-center mb-3 text-emerald-400">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Pagos Seguros</h3>
            <p className="text-xs text-slate-400">Tarjetas, Transf. y Pago Contra Entrega</p>
          </div>

          <div className="p-5 rounded-2xl bg-[#141417] border border-slate-800/80 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-amber-950/60 border border-amber-700/30 flex items-center justify-center mb-3 text-amber-400">
              <Headphones className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-white mb-1">Soporte 24/7</h3>
            <p className="text-xs text-slate-400">Asistencia directa por WhatsApp</p>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Productos Destacados
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Lo más pedido y mejor valorado de esta semana
            </p>
          </div>
          <Link
            to="/catalog"
            className="text-xs sm:text-sm font-bold text-violet-400 hover:text-violet-300 flex items-center gap-1"
          >
            Ver Todos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 rounded-2xl bg-[#141417] animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
