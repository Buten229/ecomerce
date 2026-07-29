import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#141417] border-t border-slate-800/80 pt-12 pb-24 md:pb-12 mt-12 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-lg">Ecomerce</span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            La plataforma de tecnología más avanzada en República Dominicana. Productos 100% garantizados con envíos rápidos.
          </p>
          <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Pago 100% Seguro
          </div>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Navegación</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/" className="hover:text-violet-400">Inicio</Link></li>
            <li><Link to="/catalog" className="hover:text-violet-400">Catálogo Completo</Link></li>
            <li><Link to="/cart" className="hover:text-violet-400">Carrito de Compras</Link></li>
            <li><Link to="/auth" className="hover:text-violet-400">Mi Cuenta</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Categorías</h4>
          <ul className="space-y-2 text-xs">
            <li><Link to="/catalog?category=Laptops" className="hover:text-violet-400">Laptops & MacBooks</Link></li>
            <li><Link to="/catalog?category=Smartphones" className="hover:text-violet-400">Smartphones & iPhones</Link></li>
            <li><Link to="/catalog?category=Audio" className="hover:text-violet-400">Audífonos & Audio</Link></li>
            <li><Link to="/catalog?category=Gaming" className="hover:text-violet-400">Gaming & Consolas</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-wider">Soporte</h4>
          <p className="text-xs text-slate-400 mb-2">Santo Domingo, República Dominicana</p>
          <p className="text-xs text-slate-400 mb-2">WhatsApp: +1 (849) 314-0441</p>
          <p className="text-xs text-slate-400">Email: lorenzobuten02@gmail.com</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Ecomerce Tech Store. Todos los derechos reservados.
      </div>
    </footer>
  );
};
