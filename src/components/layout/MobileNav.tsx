import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, ShoppingBag, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export const MobileNav: React.FC = () => {
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const { isAuthenticated } = useAuthStore();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#141417]/95 backdrop-blur-lg border-t border-slate-800 px-4 py-2 flex items-center justify-around">
      <Link
        to="/"
        className={`flex flex-col items-center gap-1 ${
          location.pathname === '/' ? 'text-violet-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Home className="w-5 h-5" />
        <span className="text-[10px]">Inicio</span>
      </Link>

      <Link
        to="/catalog"
        className={`flex flex-col items-center gap-1 ${
          location.pathname.startsWith('/catalog') ? 'text-violet-400 font-bold' : 'text-slate-400'
        }`}
      >
        <Grid className="w-5 h-5" />
        <span className="text-[10px]">Catálogo</span>
      </Link>

      <Link
        to="/cart"
        className={`flex flex-col items-center gap-1 relative ${
          location.pathname === '/cart' ? 'text-violet-400 font-bold' : 'text-slate-400'
        }`}
      >
        <ShoppingBag className="w-5 h-5" />
        {itemCount > 0 && (
          <span className="absolute -top-1 right-2 bg-violet-600 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
            {itemCount}
          </span>
        )}
        <span className="text-[10px]">Carrito</span>
      </Link>

      <Link
        to={isAuthenticated ? '/profile' : '/auth'}
        className={`flex flex-col items-center gap-1 ${
          location.pathname === '/profile' || location.pathname === '/auth'
            ? 'text-violet-400 font-bold'
            : 'text-slate-400'
        }`}
      >
        <User className="w-5 h-5" />
        <span className="text-[10px]">{isAuthenticated ? 'Perfil' : 'Acceder'}</span>
      </Link>
    </div>
  );
};
