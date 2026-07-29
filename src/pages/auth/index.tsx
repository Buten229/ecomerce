import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Sparkles, LogIn, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

export const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, register, loginWithGoogle } = useAuthStore();

  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      if (isRegistering) {
        if (!nombre.trim()) throw new Error('Ingresa tu nombre completo.');
        await register(nombre.trim(), email.trim(), password, telefono.trim());
      } else {
        await login(email.trim(), password);
      }
      navigate('/profile');
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error al autenticar. Verifica tus datos.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleClick = async () => {
    setErrorMsg('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      setErrorMsg(err?.message || 'Error con Google OAuth. Intenta de nuevo.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <div className="p-6 sm:p-8 rounded-3xl bg-[#141417] border border-slate-800 space-y-6">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center mx-auto shadow-lg shadow-violet-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl font-black text-white">
            {isRegistering ? 'Crear Cuenta Nueva' : 'Iniciar Sesión'}
          </h1>
          <p className="text-xs text-slate-400">
            {isRegistering
              ? 'Regístrate para guardar tus pedidos y compras'
              : 'Accede a tu cuenta de Ecomerce Tech Store'}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Google OAuth Button */}
        <button
          type="button"
          onClick={handleGoogleClick}
          className="w-full py-3.5 px-4 rounded-xl bg-[#0a0a0d] border border-slate-700 hover:border-slate-500 text-slate-200 text-xs font-bold flex items-center justify-center gap-3 transition-all"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
          Acceder con Google
        </button>

        <div className="relative flex items-center justify-center">
          <div className="border-t border-slate-800 w-full" />
          <span className="bg-[#141417] px-3 text-[10px] uppercase font-bold text-slate-500 relative">
            O usa tu correo
          </span>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegistering && (
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Nombre Completo</label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Tu Nombre"
                  className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-violet-500"
                />
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Correo Electrónico</label>
            <div className="relative">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-violet-500"
              />
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1">Contraseña</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-violet-500"
              />
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
            </div>
          </div>

          {isRegistering && (
            <div>
              <label className="text-xs font-semibold text-slate-400 block mb-1">Teléfono (Opcional)</label>
              <div className="relative">
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  placeholder="809-555-0199"
                  className="w-full bg-[#0a0a0d] border border-slate-800 rounded-xl px-4 py-3 pl-10 text-sm text-white focus:outline-none focus:border-violet-500"
                />
                <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 text-white font-bold text-sm hover:from-violet-500 hover:to-purple-500 shadow-lg shadow-violet-600/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              'Procesando...'
            ) : isRegistering ? (
              'Registrarme'
            ) : (
              <>
                <LogIn className="w-4 h-4" /> Iniciar Sesión
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-2">
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setErrorMsg('');
            }}
            className="text-xs font-semibold text-violet-400 hover:text-violet-300"
          >
            {isRegistering
              ? '¿Ya tienes cuenta? Inicia sesión aquí'
              : '¿No tienes cuenta? Regístrate gratis'}
          </button>
        </div>
      </div>
    </div>
  );
};
