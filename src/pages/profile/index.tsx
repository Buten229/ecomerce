import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, LogOut, ShieldCheck, Package, Phone, Mail, Sparkles } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { ADMIN_EMAIL } from '@/services/auth.service';

export const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">No has iniciado sesión</h2>
        <p className="text-sm text-slate-400">Accede con tu cuenta para ver tu perfil y pedidos.</p>
        <button
          onClick={() => navigate('/auth')}
          className="px-6 py-3 rounded-xl bg-violet-600 text-white font-bold text-sm"
        >
          Iniciar Sesión / Registrarse
        </button>
      </div>
    );
  }

  const isAdmin = user.rol === 'admin';

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141417] border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-violet-500/20">
            {user.nombre.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{user.nombre}</h1>
              {isAdmin && (
                <span className="px-2.5 py-0.5 rounded-full bg-violet-950 border border-violet-600 text-violet-300 text-[10px] font-extrabold uppercase">
                  ADMINISTRADOR
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {user.telefono ? `Tel: ${user.telefono}` : 'Sin teléfono guardado'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {isAdmin && (
            <Link
              to="/admin"
              className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-xs hover:from-violet-500 hover:to-purple-500 flex items-center justify-center gap-2 transition-all shadow-md shadow-violet-600/30"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-300" /> Panel Admin
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 font-bold text-xs hover:bg-red-900/60 flex items-center justify-center gap-2 transition-all"
          >
            <LogOut className="w-4 h-4" /> Salir
          </button>
        </div>
      </div>

      {/* Account Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <User className="w-5 h-5 text-violet-400" /> Datos Personales
          </h2>
          <div className="space-y-3 text-xs">
            <div>
              <span className="text-slate-500 block">Nombre Completo</span>
              <span className="text-white font-semibold">{user.nombre}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Teléfono de Contacto</span>
              <span className="text-white font-semibold">{user.telefono || 'No especificado'}</span>
            </div>
            <div>
              <span className="text-slate-500 block">Rol de Cuenta</span>
              <span className="text-cyan-400 font-semibold uppercase">{user.rol}</span>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-[#141417] border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" /> Historial de Pedidos
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Tus pedidos recientes se mostrarán aquí una vez que realices una compra en la plataforma.
          </p>
          <Link
            to="/catalog"
            className="inline-block text-xs font-bold text-violet-400 hover:text-violet-300"
          >
            Ir a comprar ahora →
          </Link>
        </div>
      </div>
    </div>
  );
};
