import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  User,
  Search,
  Home,
  Grid,
  Heart,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { useAuthStore } from '@/store/authStore';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const itemCount = useCartStore((s) => s.getItemCount());
  const { user, isAuthenticated } = useAuthStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const navLinks = [
    { label: 'Inicio', path: '/' },
    { label: 'Catálogo', path: '/catalog' },
    { label: 'Laptops', path: '/catalog?category=Laptops' },
    { label: 'Smartphones', path: '/catalog?category=Smartphones' },
    { label: 'Audio', path: '/catalog?category=Audio' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0d] text-slate-100 font-sans">
      {/* Top Banner Promo */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-800 to-cyan-900 text-white text-xs font-semibold py-2 px-4 text-center flex items-center justify-center gap-2">
        <Zap className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
        <span>Envío express en 24h a todo el país | ITBIS 18% incluido</span>
        <span className="hidden md:inline-block bg-white/20 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider">
          OFERTA DE HOY
        </span>
      </div>

      {/* Header / Navbar Principal */}
      <header className="sticky top-0 z-40 bg-[#0a0a0d]/90 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-transform duration-200">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-white flex items-center gap-1">
                Ecomerce
              </span>
              <span className="text-[10px] font-semibold tracking-wider text-cyan-400 block -mt-1 uppercase">
                Tech Store
              </span>
            </div>
          </Link>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex flex-1 max-w-md relative"
          >
            <input
              type="text"
              placeholder="Buscar laptops, iphones, audífonos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#141417] border border-slate-800 rounded-full py-2 pl-4 pr-10 text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors hover:text-cyan-400 ${
                  location.pathname === link.path ? 'text-violet-400 font-bold' : 'text-slate-300'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* User & Cart Actions */}
          <div className="flex items-center gap-3">
            {/* Cart Button */}
            <Link
              to="/cart"
              className="relative p-2.5 rounded-xl bg-[#141417] border border-slate-800 text-slate-200 hover:border-violet-500/50 hover:text-white transition-all group"
              aria-label="Carrito de compras"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {itemCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-violet-600 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-md shadow-violet-600/40 animate-pulse">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Profile / Auth Button */}
            <Link
              to={isAuthenticated ? '/profile' : '/auth'}
              className="flex items-center gap-2 p-2 sm:px-3.5 sm:py-2 rounded-xl bg-[#141417] border border-slate-800 hover:border-violet-500/50 text-slate-200 hover:text-white transition-all"
            >
              <User className="w-5 h-5 text-violet-400" />
              <span className="hidden sm:inline text-xs font-semibold">
                {isAuthenticated ? user?.nombre || 'Mi Cuenta' : 'Acceder'}
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-[#141417] border border-slate-800 text-slate-300"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Search & Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#141417] border-b border-slate-800 px-4 py-4 space-y-3 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0a0a0d] border border-slate-700 rounded-xl py-2.5 pl-4 pr-10 text-sm text-slate-100 placeholder-slate-400"
              />
              <button type="submit" className="absolute right-3 top-3 text-slate-400">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <div className="flex flex-col gap-2 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-violet-400"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-8">{children}</main>

      {/* Footer Desktop */}
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
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Pago 100% Seguro y Encriptado
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
            <p className="text-xs text-slate-400 mb-2">WhatsApp: +1 (809) 555-0199</p>
            <p className="text-xs text-slate-400">Email: lorenzobuten02@gmail.com</p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} Ecomerce Tech Store. Todos los derechos reservados.
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (App Experience) */}
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
    </div>
  );
};
